"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin({
  configured,
  defaultEmail,
}: {
  configured: boolean;
  defaultEmail: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const json = (await response.json()) as { ok: boolean; error?: string };
      if (!json.ok) {
        setError(json.error || "Sign in failed.");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const input =
    "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200";

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="heading-xl text-2xl text-slate-900">Admin sign in</h1>
      <p className="mt-1 text-sm text-slate-600">Manage where quote requests are delivered.</p>

      {!configured && (
        <p role="alert" className="mt-5 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Admin login is not set up on this server yet. Set <code>ADMIN_PASSWORD</code> in the
          environment variables.
        </p>
      )}

      <label className="font-display mt-6 block text-sm text-slate-700">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          defaultValue={defaultEmail}
          className={input}
        />
      </label>
      <label className="font-display mt-4 block text-sm text-slate-700">
        Password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={input}
        />
      </label>

      {error && (
        <p role="alert" className="mt-4 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy || !configured}
        className="font-display mt-6 w-full rounded-xl bg-slate-900 px-6 py-3.5 text-base text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
