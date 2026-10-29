"use client";

import { FormEvent, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";

const currentYear = new Date().getFullYear();
const carYears = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

const field =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-800 placeholder:font-medium placeholder:text-slate-500 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200";

/**
 * Single-step quote form, styled for the white card (see QuoteCard). Fields use placeholders with
 * screen-reader labels. Posts to /api/quote and continues to /thanks.
 */
export function ContactForm() {
  const uid = useId();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
  const label = (name: string, text: string) => (
    <label htmlFor={id(name)} className="sr-only">
      {text}
    </label>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-2.5">
        {label("your-name", "Your name")}
        <input
          id={id("your-name")}
          name="your-name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          placeholder="Your Name"
          className={field}
        />
        {label("your-phone", "Your phone number")}
        <input
          id={id("your-phone")}
          name="your-phone"
          type="tel"
          required
          maxLength={30}
          autoComplete="tel"
          placeholder="Your Phone Number"
          className={field}
        />
        {label("your-email", "Email address")}
        <input
          id={id("your-email")}
          name="your-email"
          type="email"
          required
          maxLength={160}
          autoComplete="email"
          placeholder="Email address"
          className={field}
        />
      </div>

      <div className="space-y-2.5 pt-2">
        {label("suburb", "Suburb")}
        <input
          id={id("suburb")}
          name="suburb"
          type="text"
          required
          maxLength={80}
          autoComplete="address-level2"
          placeholder="Suburb"
          className={field}
        />
        {label("postal-code", "Postal code")}
        <input
          id={id("postal-code")}
          name="postal-code"
          type="text"
          required
          inputMode="numeric"
          pattern="[0-9]{4}"
          maxLength={4}
          autoComplete="postal-code"
          placeholder="Postal Code"
          className={field}
        />
      </div>

      <div className="space-y-2.5 pt-2">
        {label("car-model", "Car brand and model")}
        <input
          id={id("car-model")}
          name="car-model"
          type="text"
          required
          maxLength={120}
          autoComplete="off"
          placeholder="Car Brand / Model"
          className={field}
        />
        {label("car-year", "Car year")}
        <select
          id={id("car-year")}
          name="car-year"
          required
          defaultValue=""
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-800 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
        >
          <option value="" disabled>
            Car Year
          </option>
          {carYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {label("your-note", "Extra details")}
        <textarea
          id={id("your-note")}
          name="your-note"
          rows={3}
          maxLength={2000}
          placeholder="Extra details (condition, location notes, special requests)"
          className={`${field} resize-none`}
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={id("company")}>Leave this field empty</label>
        <input id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="font-display w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3.5 text-base text-white shadow-xl shadow-orange-500/40 hover:from-orange-400 hover:to-red-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Get My Cash Offer Now"}
      </button>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
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
    </form>
  );
}
