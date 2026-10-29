import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { site } from "./site";

export const SESSION_COOKIE = "vcr_admin";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

/** Login email defaults to the business inbox; the password only ever comes from the environment. */
const adminEmail = () => (process.env.ADMIN_EMAIL || site.email).trim().toLowerCase();
const adminPassword = () => process.env.ADMIN_PASSWORD || "";

export const adminConfigured = () => adminPassword().length > 0;

const digest = (value: string) => createHash("sha256").update(value).digest();
const safeEqual = (a: string, b: string) => timingSafeEqual(digest(a), digest(b));

export function checkCredentials(email: string, password: string) {
  if (!adminConfigured()) return false;
  // Evaluate both so the response time doesn't reveal which one was wrong.
  const emailOk = safeEqual(email.trim().toLowerCase(), adminEmail());
  const passwordOk = safeEqual(password, adminPassword());
  return emailOk && passwordOk;
}

function secret() {
  return process.env.ADMIN_SESSION_SECRET || `vcr-session:${adminPassword()}`;
}

const sign = (payload: string) =>
  createHmac("sha256", secret()).update(payload).digest("base64url");

export function createSessionToken() {
  const payload = `${Math.floor(Date.now() / 1000) + SESSION_MAX_AGE}|${adminEmail()}`;
  return `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
}

function verifyToken(token: string | undefined) {
  if (!token || !adminConfigured()) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;
  const payload = Buffer.from(encoded, "base64url").toString();
  if (!safeEqual(signature, sign(payload))) return false;
  const [expires, email] = payload.split("|");
  return email === adminEmail() && Number(expires) > Date.now() / 1000;
}

/** True when the current request carries a valid admin session cookie. */
export async function isAdmin() {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}

/** State-changing admin requests must come from this site (cookie is also SameSite=strict). */
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Best-effort brute-force limit: 8 login attempts per IP per 15 minutes.
const attempts = new Map<string, number[]>();
export function loginRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < 15 * 60 * 1000);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > 8;
}
