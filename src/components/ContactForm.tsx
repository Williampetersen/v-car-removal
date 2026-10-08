"use client";

import { FormEvent, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";

const currentYear = new Date().getFullYear();
const carYears = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

/**
 * Two-step quote form (car details, then contact details). Both steps stay in the DOM so the
 * browser validates and autofills normally. Posts to /api/quote and continues to /thanks.
 */
export function ContactForm({
  variant = "light",
}: {
  variant?: "light" | "dark" | "glass";
}) {
  const uid = useId();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const stepOneRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const dark = variant !== "light";

  const field = dark
    ? "w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-zinc-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
    : "w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-base text-ink placeholder:text-zinc-400 focus:border-ink focus:outline-none focus:ring-2 focus:ring-brand/50";
  const label = dark
    ? "font-display text-sm uppercase tracking-wider text-zinc-300"
    : "font-display text-sm uppercase tracking-wider text-ink-soft";

  function goNext() {
    const inputs = stepOneRef.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
      "input, select"
    );
    if (inputs) {
      for (const el of inputs) {
        if (!el.reportValidity()) return;
      }
    }
    setStep(2);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) {
      goNext();
      return;
    }
    const form = new FormData(event.currentTarget);
    setStatus("sending");

    const payload = {
      name: String(form.get("your-name") ?? ""),
      phone: String(form.get("your-phone") ?? ""),
      email: String(form.get("your-email") ?? ""),
      suburb: String(form.get("suburb") ?? ""),
      postalCode: String(form.get("postal-code") ?? ""),
      carModel: String(form.get("car-model") ?? ""),
      carYear: String(form.get("car-year") ?? ""),
      note: String(form.get("your-note") ?? ""),
      // Honeypot: real visitors never see or fill this field; the server drops the request.
      honeypot: String(form.get("company") ?? ""),
      page: window.location.pathname,
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      formRef.current?.reset();
      // Thank-you page fires the GA4 / Google Ads / Meta conversion events.
      router.push("/thanks");
    } catch {
      setStatus("error");
    }
  }

  const id = (name: string) => `${uid}-${name}`;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate={false} className="space-y-5">
      <ol
        className="flex items-center gap-3"
        aria-label={`Step ${step} of 2`}
      >
        {["Your car", "Your details"].map((name, i) => {
          const active = step === i + 1;
          const done = step > i + 1;
          return (
            <li key={name} className="flex flex-1 items-center gap-2">
              <span
                className={`font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm ${
                  active || done
                    ? "bg-brand text-ink"
                    : dark
                      ? "bg-white/15 text-zinc-300"
                      : "bg-ink/10 text-ink-soft"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`font-display text-sm uppercase tracking-wider ${
                  dark ? "text-zinc-200" : "text-ink-soft"
                }`}
              >
                {name}
              </span>
              {i === 0 && (
                <span
                  aria-hidden
                  className={`h-0.5 flex-1 ${done ? "bg-brand" : dark ? "bg-white/15" : "bg-ink/10"}`}
                />
              )}
            </li>
          );
        })}
      </ol>

      <div ref={stepOneRef} hidden={step !== 1} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={id("car-model")} className={label}>
            Car make &amp; model
          </label>
          <input
            id={id("car-model")}
            name="car-model"
            type="text"
            required
            maxLength={120}
            autoComplete="off"
            className={`${field} mt-1.5`}
            placeholder="e.g. Toyota Corolla"
          />
        </div>
        <div>
          <label htmlFor={id("car-year")} className={label}>
            Year
          </label>
          <select
            id={id("car-year")}
            name="car-year"
            required
            defaultValue=""
            className={`${field} mt-1.5 ${dark ? "[&>option]:text-ink" : ""}`}
          >
            <option value="" disabled>
              Select year
            </option>
            {carYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={id("suburb")} className={label}>
            Pickup suburb
          </label>
          <input
            id={id("suburb")}
            name="suburb"
            type="text"
            required
            maxLength={80}
            autoComplete="address-level2"
            className={`${field} mt-1.5`}
            placeholder="e.g. Sherwood"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("postal-code")} className={label}>
            Postcode
          </label>
          <input
            id={id("postal-code")}
            name="postal-code"
            type="text"
            required
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            autoComplete="postal-code"
            className={`${field} mt-1.5`}
            placeholder="4075"
          />
        </div>
        <button
          type="button"
          onClick={goNext}
          className="font-display sm:col-span-2 rounded-lg bg-brand px-6 py-3.5 text-lg uppercase tracking-wide text-ink shadow-[0_5px_0_0_#a63a05] transition-all hover:-translate-y-0.5 hover:bg-[#ff7d35]"
        >
          Next: your details
        </button>
      </div>

      <div hidden={step !== 2} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("your-name")} className={label}>
            Your name
          </label>
          <input
            id={id("your-name")}
            name="your-name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            className={`${field} mt-1.5`}
          />
        </div>
        <div>
          <label htmlFor={id("your-phone")} className={label}>
            Phone
          </label>
          <input
            id={id("your-phone")}
            name="your-phone"
            type="tel"
            required
            maxLength={30}
            autoComplete="tel"
            className={`${field} mt-1.5`}
            placeholder="04xx xxx xxx"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("your-email")} className={label}>
            Email
          </label>
          <input
            id={id("your-email")}
            name="your-email"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
            className={`${field} mt-1.5`}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("your-note")} className={label}>
            Anything we should know? (optional)
          </label>
          <textarea
            id={id("your-note")}
            name="your-note"
            rows={3}
            maxLength={2000}
            className={`${field} mt-1.5`}
            placeholder="Condition, keys, access to the car"
          />
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor={id("company")}>Leave this field empty</label>
          <input
            id={id("company")}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex gap-3 sm:col-span-2">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`font-display rounded-lg border-2 px-5 py-3.5 text-lg uppercase tracking-wide ${
              dark
                ? "border-white/25 text-white hover:border-white"
                : "border-ink/20 text-ink hover:border-ink"
            }`}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={status === "sending"}
            className="font-display flex-1 rounded-lg bg-brand px-6 py-3.5 text-lg uppercase tracking-wide text-ink shadow-[0_5px_0_0_#a63a05] transition-all hover:-translate-y-0.5 hover:bg-[#ff7d35] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {status === "sending" ? "Sending…" : "Get my cash offer"}
          </button>
        </div>
        {status === "error" && (
          <p
            role="alert"
            className={`text-sm font-medium sm:col-span-2 ${dark ? "text-red-300" : "text-red-700"}`}
          >
            Something went wrong sending your request. Please call{" "}
            <a href={site.phoneHref} className="font-bold underline">
              {site.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${site.email}`} className="font-bold underline">
              {site.email}
            </a>{" "}
            instead.
          </p>
        )}
      </div>
    </form>
  );
}
