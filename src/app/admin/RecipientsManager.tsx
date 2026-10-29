"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Storage = { persistent: boolean; kind: "redis" | "blob" | "file" | "none" };

export function RecipientsManager({
  initial,
  max,
  storage,
  sender,
}: {
  initial: string[];
  max: number;
  storage: Storage;
  sender: string;
}) {
  const router = useRouter();
  const [emails, setEmails] = useState(initial);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const full = emails.length >= max;

  async function call(method: "POST" | "DELETE", email: string) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/recipients", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = (await response.json()) as {
        ok: boolean;
        error?: string;
        recipients?: string[];
      };
      if (!json.ok || !json.recipients) {
        setError(json.error || "Something went wrong.");
        return false;
      }
      setEmails(json.recipients);
      return true;
    } catch {
      setError("Network error. Please try again.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const value = String(new FormData(form).get("email") ?? "").trim();
    if (await call("POST", value)) form.reset();
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="heading-xl text-2xl text-slate-900">Quote delivery</h1>
        <button
          type="button"
          onClick={signOut}
          className="font-display rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400"
        >
          Sign out
        </button>
      </div>

      {!storage.persistent && (
        <p role="alert" className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
          No database is connected, so changes can&apos;t be saved on this server. Connect a
          Blob store (Vercel, Storage tab) to this project and redeploy; until then quotes go to the
          default inbox.
        </p>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-display text-lg text-slate-900">Agent emails</h2>
        <p className="mt-1 text-sm text-slate-600">
          Every new quote is emailed to all addresses below. Sent from{" "}
          <strong className="font-semibold text-slate-800">{sender}</strong>. Up to {max} agents.
        </p>

        <ul className="mt-5 divide-y divide-slate-100 rounded-xl border border-slate-200">
          {emails.length === 0 && (
            <li className="px-4 py-3 text-sm text-slate-500">
              No agents added yet. Quotes go to the default business inbox.
            </li>
          )}
          {emails.map((email) => (
            <li key={email} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="break-all text-sm text-slate-900">{email}</span>
              <button
                type="button"
                disabled={busy}
                onClick={() => call("DELETE", email)}
                aria-label={`Remove ${email}`}
                className="font-display shrink-0 rounded-lg px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-slate-500">
          {emails.length} of {max} used
        </p>

        <form onSubmit={add} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="agent-email">
            Agent email address
          </label>
          <input
            id="agent-email"
            name="email"
            type="email"
            required
            maxLength={160}
            disabled={full || busy || !storage.persistent}
            placeholder={full ? `Limit of ${max} reached` : "agent@example.com"}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 disabled:bg-slate-100"
          />
          <button
            type="submit"
            disabled={full || busy || !storage.persistent}
            className="font-display shrink-0 rounded-xl bg-slate-900 px-6 py-3 text-base text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add agent
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
      </section>
    </div>
  );
}
