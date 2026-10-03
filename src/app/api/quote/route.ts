import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const REQUIRED_FIELDS = [
  "name",
  "phone",
  "email",
  "suburb",
  "postalCode",
  "carModel",
  "carYear",
] as const;

const MAX_FIELD_LENGTH = 200;
const MAX_NOTE_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type QuotePayload = Record<(typeof REQUIRED_FIELDS)[number], string> & {
  note?: string;
  honeypot?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Partial<QuotePayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot field is invisible to real visitors — only bots fill it in.
  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  for (const field of REQUIRED_FIELDS) {
    const value = body[field];
    if (typeof value !== "string" || !value.trim()) {
      return NextResponse.json(
        { ok: false, error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
    if (value.length > MAX_FIELD_LENGTH) {
      return NextResponse.json(
        { ok: false, error: `Field too long: ${field}` },
        { status: 400 }
      );
    }
  }

  if (body.note !== undefined && (typeof body.note !== "string" || body.note.length > MAX_NOTE_LENGTH)) {
    return NextResponse.json(
      { ok: false, error: "Extra details are too long." },
      { status: 400 }
    );
  }

  const { name, phone, email, suburb, postalCode, carModel, carYear, note } =
    body as QuotePayload;

  if (!EMAIL_PATTERN.test(email.trim())) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not configured — quote request was not emailed."
    );
    return NextResponse.json(
      { ok: false, error: "Email delivery is not configured yet." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "V Car Removal <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email.trim(),
      subject: `New quote request — ${name} — ${carModel} (${carYear})`.replace(/[\r\n]+/g, " "),
      html: `
        <h2>New quote request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Suburb:</strong> ${escapeHtml(suburb)}</p>
        <p><strong>Postal code:</strong> ${escapeHtml(postalCode)}</p>
        <p><strong>Car:</strong> ${escapeHtml(carModel)} (${escapeHtml(carYear)})</p>
        <p><strong>Extra details:</strong><br/>${escapeHtml(note || "—").replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote request failed:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}
