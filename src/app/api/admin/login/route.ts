import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  adminConfigured,
  checkCredentials,
  createSessionToken,
  loginRateLimited,
  sameOrigin,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

const fail = (error: string, status: number) =>
  NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  if (!sameOrigin(request)) return fail("Bad request.", 403);
  if (!adminConfigured()) return fail("Admin login is not configured on the server.", 503);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (loginRateLimited(ip)) return fail("Too many attempts. Try again in 15 minutes.", 429);

  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request body.", 400);
  }
  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!checkCredentials(email, password)) return fail("Incorrect email or password.", 401);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
