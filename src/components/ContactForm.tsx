"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";
import { User, PhoneCall, Mail, MapPin, ArrowRight } from "./Icons";

const currentYear = new Date().getFullYear();
const carYears = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

export function ContactForm({
  variant = "light",
}: {
  variant?: "light" | "glass";
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const isGlass = variant === "glass";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentForm = event.currentTarget;
    const form = new FormData(currentForm);

    // Honeypot: real visitors never see or fill this field.
    if (String(form.get("company") ?? "").trim()) {
      setStatus("sent");
      currentForm.reset();
      return;
    }

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
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("sent");
      currentForm.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClasses = isGlass
    ? "w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 backdrop-blur-sm transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
    : "w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm text-ink placeholder:text-zinc-400 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

  const iconColor = isGlass ? "text-white/60" : "text-zinc-400";

  const labelClasses = isGlass
    ? "sr-only"
    : "text-sm font-semibold text-ink-soft";

  const gridClasses = isGlass
    ? "grid grid-cols-1 gap-3"
    : "grid grid-cols-1 gap-5 sm:grid-cols-2";

  function withIcon(Icon: typeof User, node: React.ReactNode) {
    return (
      <div className="relative">
        <Icon
          className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${iconColor}`}
          aria-hidden
        />
        {node}
      </div>
    );
  }

  const fields: Array<{
    id: string;
    label: string;
    span?: boolean;
    node: React.ReactNode;
  }> = [
    {
      id: "your-name",
      label: "Your name",
      node: withIcon(
        User,
        <input
          id="your-name"
          name="your-name"
          type="text"
          required
          className={`${fieldClasses} pl-10`}
          placeholder="Your Name"
        />
      ),
    },
    {
      id: "your-phone",
      label: "Your phone number",
      node: withIcon(
        PhoneCall,
        <input
          id="your-phone"
          name="your-phone"
          type="tel"
          required
          className={`${fieldClasses} pl-10`}
          placeholder="Your Phone Number"
        />
      ),
    },
    {
      id: "your-email",
      label: "Email address",
      span: true,
      node: withIcon(
        Mail,
        <input
          id="your-email"
          name="your-email"
          type="email"
          required
          className={`${fieldClasses} pl-10`}
          placeholder="Email Address"
        />
      ),
    },
    {
      id: "suburb",
      label: "Suburb",
      node: withIcon(
        MapPin,
        <input
          id="suburb"
          name="suburb"
          type="text"
          required
          className={`${fieldClasses} pl-10`}
          placeholder="Suburb"
        />
      ),
    },
    {
      id: "postal-code",
      label: "Postal code",
      node: (
        <input
          id="postal-code"
          name="postal-code"
          type="text"
          required
          inputMode="numeric"
          className={fieldClasses}
          placeholder="Postal Code"
        />
      ),
    },
  ];

  const vehicleFields: Array<{ id: string; label: string; node: React.ReactNode }> = [
    {
      id: "car-model",
      label: "Car brand / model",
      node: (
        <input
          id="car-model"
          name="car-model"
          type="text"
          required
          className={fieldClasses}
          placeholder="Car Brand / Model"
        />
      ),
    },
    {
      id: "car-year",
      label: "Car year",
      node: (
        <select
          id="car-year"
          name="car-year"
          required
          defaultValue=""
          className={`${fieldClasses} ${isGlass ? "[&>option]:text-ink" : ""}`}
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
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className={gridClasses}>
      {fields.map((field) => (
        <div key={field.id} className={!isGlass && field.span ? "sm:col-span-2" : undefined}>
          <label htmlFor={field.id} className={labelClasses}>
            {field.label}
          </label>
          <div className={isGlass ? undefined : "mt-2"}>{field.node}</div>
        </div>
      ))}

      <div
        className={
          isGlass
            ? "sm:col-span-2 grid grid-cols-1 gap-3 rounded-xl border border-white/15 bg-white/5 p-3"
            : "sm:col-span-2 grid grid-cols-1 gap-5 rounded-lg bg-cream p-4 sm:grid-cols-2 sm:p-5"
        }
      >
        {!isGlass && (
          <p className="sm:col-span-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            Vehicle details
          </p>
        )}
        {vehicleFields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className={labelClasses}>
              {field.label}
            </label>
            <div className={isGlass ? undefined : "mt-2"}>{field.node}</div>
          </div>
        ))}
      </div>

      <div className={isGlass ? undefined : "sm:col-span-2"}>
        <label htmlFor="your-note" className={labelClasses}>
          Extra details
        </label>
        <div className={isGlass ? undefined : "mt-2"}>
          <textarea
            id="your-note"
            name="your-note"
            rows={isGlass ? 2 : 3}
            className={fieldClasses}
            placeholder="Extra details (condition, location notes, special requests)"
          />
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Leave this field empty</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={isGlass ? undefined : "sm:col-span-2"}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "sending" ? "Sending…" : "Get Cash Offer Now"}
          {status !== "sending" && (
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          )}
        </button>
        {status === "sent" && (
          <p
            className={`mt-3 text-sm font-medium ${isGlass ? "text-white" : "text-cash-dark"}`}
          >
            Thanks — your request is in. We&apos;ll call or email you back
            with a cash offer shortly.
          </p>
        )}
        {status === "error" && (
          <p
            className={`mt-3 text-sm font-medium ${isGlass ? "text-white" : "text-red-600"}`}
          >
            Something went wrong sending your request. Please call{" "}
            <a href={site.phoneHref} className="underline">
              {site.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>{" "}
            instead.
          </p>
        )}
      </div>
    </form>
  );
}
