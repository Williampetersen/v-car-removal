import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";
import { quoteDestinations } from "@/lib/recipients";

export const runtime = "nodejs";

const REQUIRED_FIELDS = [
  "name",
  "phone",
  "email",
  "suburb",
  "postalCode",
  "carModel",
  "carYear",
] as const;

type QuotePayload = Record<(typeof REQUIRED_FIELDS)[number], string> & {
  note?: string;
  honeypot?: string;
  page?: string;
};

const MAX_LENGTH: Record<string, number> = {
  name: 100,
  phone: 30,
  email: 160,
  suburb: 80,
  postalCode: 10,
  carModel: 120,
  carYear: 4,
  note: 2000,
  page: 200,
};

// Basic per-instance rate limit: 5 requests per IP per 10 minutes.
// (Best effort on serverless; add a Vercel Firewall rate-limit rule for a hard global limit.)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_REQUESTS;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const bad = (error: string, status = 400) =>
  NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return bad("Too many requests. Please call us instead.", 429);
  }

  let body: Partial<QuotePayload>;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid request body.");
  }

  // Honeypot field is invisible to real visitors; only bots fill it in.
  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  for (const field of REQUIRED_FIELDS) {
    const value = body[field];
    if (typeof value !== "string" || !value.trim()) {
      return bad(`Missing required field: ${field}`);
    }
  }
  for (const [field, max] of Object.entries(MAX_LENGTH)) {
    const value = (body as Record<string, unknown>)[field];
    if (typeof value === "string" && value.length > max) {
      return bad(`Field too long: ${field}`);
    }
  }

  const { name, phone, email, suburb, postalCode, carModel, carYear, note, page } =
    body as QuotePayload;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("Invalid email address.");
  if (!/^[0-9+()\-\s]{8,20}$/.test(phone)) return bad("Invalid phone number.");

  // Sent through the business mailbox (cPanel SMTP, port 465 / SSL).
  const smtpPassword = process.env.SMTP_PASSWORD;
  if (!smtpPassword) {
    console.error("SMTP_PASSWORD is not configured: quote request was not emailed.");
    return bad("Email delivery is not configured yet.", 500);
  }
  const smtpUser = process.env.SMTP_USER || site.email;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "vcarremoval.com.au",
    port: Number(process.env.SMTP_PORT || 465),
    secure: (process.env.SMTP_PORT || "465") === "465",
    auth: { user: smtpUser, pass: smtpPassword },
  });

  // Recipients are the agent emails managed in /admin (falls back to CONTACT_TO_EMAIL / info@).
  const to = await quoteDestinations();
  // The sender is always the business mailbox the SMTP login belongs to.
  const from = process.env.CONTACT_FROM_EMAIL || `${site.name} <${smtpUser}>`;
  // One silent copy of every quote goes to the owner's Gmail (skipped if already a recipient).
  const copyTo = (process.env.QUOTE_COPY_EMAIL || "williampetersencop@gmail.com").toLowerCase();
  const bcc = to.map((e) => e.toLowerCase()).includes(copyTo) ? undefined : [copyTo];

  try {
    await transporter.sendMail({
      from,
      to,
      bcc,
      replyTo: email,
      subject: `New quote request: ${name}, ${carModel} (${carYear}), ${suburb}`,
      html: `
        <h2>New quote request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Suburb:</strong> ${escapeHtml(suburb)}</p>
        <p><strong>Postal code:</strong> ${escapeHtml(postalCode)}</p>
        <p><strong>Car:</strong> ${escapeHtml(carModel)} (${escapeHtml(carYear)})</p>
        <p><strong>Extra details:</strong><br/>${escapeHtml(note || "-").replace(/\n/g, "<br/>")}</p>
        <p style="color:#888">Sent from ${escapeHtml(page || "website")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote request failed:", err);
    return bad("Failed to send email.", 500);
  }
}
