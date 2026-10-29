import { NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/admin-auth";
import {
  EMAIL_RE,
  MAX_RECIPIENTS,
  getRecipients,
  saveRecipients,
  storageStatus,
} from "@/lib/recipients";

export const runtime = "nodejs";

const fail = (error: string, status: number) =>
  NextResponse.json({ ok: false, error }, { status });

async function guard(request: Request, mutating: boolean) {
  if (mutating && !sameOrigin(request)) return fail("Bad request.", 403);
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  return null;
}

async function readEmail(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown };
    return typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return "";
  }
}

export async function GET(request: Request) {
  const denied = await guard(request, false);
  if (denied) return denied;
  return NextResponse.json({
    ok: true,
    recipients: await getRecipients(),
    max: MAX_RECIPIENTS,
    storage: storageStatus(),
  });
}

export async function POST(request: Request) {
  const denied = await guard(request, true);
  if (denied) return denied;
  if (!storageStatus().persistent) {
    return fail("Storage is not connected, so changes cannot be saved yet.", 503);
  }

  const email = await readEmail(request);
  if (!EMAIL_RE.test(email) || email.length > 160) return fail("Enter a valid email address.", 400);

  const current = await getRecipients();
  if (current.includes(email)) return fail("That email is already on the list.", 409);
  if (current.length >= MAX_RECIPIENTS) {
    return fail(`You can have up to ${MAX_RECIPIENTS} agent emails. Remove one first.`, 409);
  }

  try {
    return NextResponse.json({ ok: true, recipients: await saveRecipients([...current, email]) });
  } catch (error) {
    console.error("Saving recipients failed:", error);
    return fail("Could not save. Please try again.", 500);
  }
}

export async function DELETE(request: Request) {
  const denied = await guard(request, true);
  if (denied) return denied;
  if (!storageStatus().persistent) {
    return fail("Storage is not connected, so changes cannot be saved yet.", 503);
  }

  const email = await readEmail(request);
  const current = await getRecipients();
  try {
    return NextResponse.json({
      ok: true,
      recipients: await saveRecipients(current.filter((e) => e !== email)),
    });
  } catch (error) {
    console.error("Saving recipients failed:", error);
    return fail("Could not save. Please try again.", 500);
  }
}
