"use client";

import { FormEvent, ReactNode, useState } from "react";
import { FileText } from "lucide-react";
import { site } from "@/lib/site";
import {
  User,
  PhoneCall,
  Mail,
  MapPin,
  ArrowRight,
  CarFront,
  Calendar,
  Clock,
  ChevronDown,
} from "./Icons";

const currentYear = new Date().getFullYear();
const carYears = Array.from({ length: currentYear - 1989 }, (_, i) => String(currentYear - i));

const carBrands = [
  "Audi", "BMW", "Chevrolet", "Chrysler", "Citroen", "Daewoo", "Dodge", "Ford",
  "Holden", "Honda", "Hyundai", "Isuzu", "Jaguar", "Jeep", "Kia", "Land Rover",
  "Lexus", "Mazda", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Peugeot",
  "Renault", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo", "Other",
];

const pickupTimes = [
  "Morning (8am – 12pm)",
  "Afternoon (12pm – 5pm)",
  "Evening (5pm – 7pm)",
  "Any time",
];

const inputBase =
  "peer h-12 w-full rounded-lg border border-ink/15 bg-white pl-10 pr-3 text-sm font-semibold text-ink outline-none transition-all duration-300 placeholder:font-medium placeholder:text-ink/50 hover:border-ink/30 focus:border-brand focus:ring-4 focus:ring-brand/25";

const iconWrap =
  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 transition-colors duration-300 peer-focus:text-brand-dark";

function Field({
  id,
  label,
  icon,
  type = "text",
  inputMode,
  autoComplete,
  className = "",
  min,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  type?: string;
  inputMode?: "numeric" | "tel" | "email" | "text";
  autoComplete?: string;
  className?: string;
  min?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        name={id}
        type={type}
        required
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={label}
        aria-label={label}
        min={min}
        className={inputBase}
      />
      <span className={iconWrap}>{icon}</span>
    </div>
  );
}

function SelectField({
  id,
  label,
  icon,
  options,
  className = "",
}: {
  id: string;
  label: string;
  icon: ReactNode;
  options: string[];
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        name={id}
        required
        defaultValue=""
        aria-label={label}
        className={`${inputBase} appearance-none pr-10 invalid:font-medium invalid:text-ink/50`}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="font-semibold text-ink">
            {option}
          </option>
        ))}
      </select>
      <span className={iconWrap}>{icon}</span>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50"
        aria-hidden
      />
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const currentForm = event.currentTarget;
    if (!currentForm.checkValidity()) {
      currentForm.reportValidity();
      return;
    }
    const form = new FormData(currentForm);

    // Honeypot: real visitors never see or fill this field.
    if (String(form.get("company") ?? "").trim()) {
      setStatus("sent");
      currentForm.reset();
      return;
    }

    setStatus("sending");

    const payload = {
      carBrand: String(form.get("car-brand") ?? ""),
      carYear: String(form.get("car-year") ?? ""),
      location: String(form.get("location") ?? ""),
      pickupDate: String(form.get("pickup-date") ?? ""),
      pickupTime: String(form.get("pickup-time") ?? ""),
      name: String(form.get("your-name") ?? ""),
      email: String(form.get("your-email") ?? ""),
      phone: String(form.get("your-phone") ?? ""),
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

  if (status === "sent") {
    return (
      <div className="step-in-right flex flex-col items-center py-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand ring-8 ring-brand/25">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 stroke-ink"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} className="check-draw" />
          </svg>
        </span>
        <h3 className="font-display mt-5 text-xl font-bold text-ink">
          Request received!
        </h3>
        <p className="mt-2 max-w-xs text-sm text-ink/70">
          Thanks, your request is in. We&apos;ll call or email you back with a
          cash offer shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-anim mt-5 rounded-full border-2 border-ink/15 px-5 py-2 text-sm font-bold text-ink hover:border-ink"
        >
          Send another request
        </button>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <SelectField
        id="car-brand"
        label="Car Brand"
        options={carBrands}
        icon={<CarFront className="h-4 w-4" aria-hidden />}
      />
      <SelectField
        id="car-year"
        label="Car Year"
        options={carYears}
        icon={<Calendar className="h-4 w-4" aria-hidden />}
      />
      <Field
        id="location"
        label="Car Location for Pick-Up"
        autoComplete="street-address"
        icon={<MapPin className="h-4 w-4" aria-hidden />}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field
          id="pickup-date"
          label="Pick Up Date"
          type="date"
          min={today}
          icon={<Calendar className="h-4 w-4" aria-hidden />}
        />
        <SelectField
          id="pickup-time"
          label="Pick Up Time"
          options={pickupTimes}
          icon={<Clock className="h-4 w-4" aria-hidden />}
        />
      </div>
      <Field
        id="your-name"
        label="Your Name"
        autoComplete="name"
        icon={<User className="h-4 w-4" aria-hidden />}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field
          id="your-email"
          label="Email address"
          type="email"
          inputMode="email"
          autoComplete="email"
          icon={<Mail className="h-4 w-4" aria-hidden />}
        />
        <Field
          id="your-phone"
          label="Your Phone Number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          icon={<PhoneCall className="h-4 w-4" aria-hidden />}
        />
      </div>
      <div className="relative">
        <textarea
          id="your-note"
          name="your-note"
          rows={3}
          placeholder="Note"
          aria-label="Note"
          className="peer w-full resize-none rounded-lg border border-ink/15 bg-white py-3 pl-10 pr-3.5 text-sm font-semibold text-ink outline-none transition-all duration-300 placeholder:font-medium placeholder:text-ink/50 hover:border-ink/30 focus:border-brand focus:ring-4 focus:ring-brand/25"
        />
        <span
          className="pointer-events-none absolute left-3 top-3.5 text-ink/40 transition-colors duration-300 peer-focus:text-brand-dark"
          aria-hidden
        >
          <FileText className="h-4 w-4" />
        </span>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Leave this field empty</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-anim animate-glow group flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:bg-ink hover:text-brand disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
        >
          {status === "sending" ? (
            <>
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
                aria-hidden
              />
              Sending…
            </>
          ) : (
            <>
              Send your quote
              <ArrowRight className="animate-nudge h-4 w-4" aria-hidden />
            </>
          )}
        </button>
        <p className="mt-2.5 text-center text-[11px] font-semibold text-ink/50">
          Free, no-obligation quote
        </p>

        {status === "error" && (
          <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
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
