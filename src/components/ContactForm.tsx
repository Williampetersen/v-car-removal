"use client";

import { FormEvent, ReactNode, useRef, useState } from "react";
import { site } from "@/lib/site";
import {
  User,
  PhoneCall,
  Mail,
  MapPin,
  ArrowRight,
  CarFront,
  Calendar,
  ChevronDown,
} from "./Icons";

const currentYear = new Date().getFullYear();
const carYears = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

const inputBase =
  "peer h-12 w-full rounded-lg border border-ink/15 bg-white pl-10 pr-3 pt-4 text-sm font-semibold text-ink outline-none transition-all duration-300 hover:border-ink/30 focus:border-brand focus:ring-4 focus:ring-brand/25";

const floatLabel =
  "pointer-events-none absolute left-10 top-3.5 origin-left text-sm text-ink/55 transition-all duration-300 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-brand-dark peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold";

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
}: {
  id: string;
  label: string;
  icon: ReactNode;
  type?: string;
  inputMode?: "numeric" | "tel" | "email" | "text";
  autoComplete?: string;
  className?: string;
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
        placeholder=" "
        className={inputBase}
      />
      <label htmlFor={id} className={floatLabel}>
        {label}
      </label>
      <span className={iconWrap}>{icon}</span>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [step, setStep] = useState<1 | 2>(1);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [showNote, setShowNote] = useState(false);
  const [year, setYear] = useState("");
  const [yearOpen, setYearOpen] = useState(false);
  const [yearError, setYearError] = useState(false);
  const step1 = useRef<HTMLDivElement>(null);
  const step2 = useRef<HTMLDivElement>(null);

  function stepIsValid(scope: HTMLDivElement | null) {
    if (!scope) return true;
    const fields = scope.querySelectorAll<HTMLInputElement>("input:not([type=hidden])");
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    if (scope === step1.current && !year) {
      setYearError(true);
      setYearOpen(true);
      return false;
    }
    return true;
  }

  function goNext() {
    if (!stepIsValid(step1.current)) return;
    setDir("fwd");
    setStep(2);
  }

  function goBack() {
    setDir("back");
    setStep(1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === 1) {
      goNext();
      return;
    }
    if (!stepIsValid(step1.current) || !stepIsValid(step2.current)) return;

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
          onClick={() => {
            setStatus("idle");
            setStep(1);
            setShowNote(false);
            setYear("");
            setYearOpen(false);
            setYearError(false);
          }}
          className="btn-anim mt-5 rounded-full border-2 border-ink/15 px-5 py-2 text-sm font-bold text-ink hover:border-ink"
        >
          Send another request
        </button>
      </div>
    );
  }

  const slide = dir === "fwd" ? "step-in-right" : "step-in-left";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 gap-1.5" aria-hidden>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
              <span className="block h-full w-full rounded-full bg-brand" />
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
              <span
                className={`block h-full rounded-full bg-brand transition-all duration-700 ease-out ${
                  step === 2 ? "w-full" : "w-0"
                }`}
              />
            </span>
          </div>
          <span className="text-xs font-bold text-ink/60">Step {step} of 2</span>
        </div>
        <p
          key={step}
          className={`${slide} font-display mt-3 text-base font-bold text-ink sm:text-lg`}
        >
          {step === 1 ? "Tell us about your car" : "Where should we send your offer?"}
        </p>
      </div>

      <div ref={step1} className={step === 1 ? "stagger-children space-y-3" : "hidden"}>
        <Field
          id="car-model"
          label="Car make & model"
          icon={<CarFront className="h-4 w-4" aria-hidden />}
        />
        <div>
          <input type="hidden" name="car-year" value={year} />
          <button
            type="button"
            id="car-year"
            aria-haspopup="listbox"
            aria-expanded={yearOpen}
            onClick={() => setYearOpen((open) => !open)}
            className={`group relative h-12 w-full rounded-lg border bg-white pl-10 pr-10 pt-4 text-left text-sm font-semibold outline-none transition-all duration-300 focus-visible:ring-4 focus-visible:ring-brand/25 ${
              yearError
                ? "shake border-red-400 ring-4 ring-red-100"
                : yearOpen
                  ? "border-brand ring-4 ring-brand/25"
                  : "border-ink/15 hover:border-ink/30"
            } ${year ? "text-ink" : "text-ink/50"}`}
          >
            <span
              className={`pointer-events-none absolute left-10 top-1.5 text-[10px] font-bold ${
                yearOpen ? "text-brand-dark" : yearError ? "text-red-500" : "text-ink/55"
              }`}
            >
              {yearError ? "Please choose the year" : "Year of manufacture"}
            </span>
            {year || "Select year"}
            <span
              className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                yearOpen ? "text-brand-dark" : "text-ink/40"
              }`}
            >
              <Calendar className="h-4 w-4" aria-hidden />
            </span>
            <ChevronDown
              className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50 transition-transform duration-500 ${
                yearOpen ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
          <div
            className={`grid transition-[grid-template-rows,margin] duration-500 ease-out ${
              yearOpen ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div
                role="listbox"
                aria-label="Year of manufacture"
                className="grid max-h-44 grid-cols-4 gap-1.5 overflow-y-auto rounded-lg bg-cream p-2 sm:grid-cols-5"
              >
                {carYears.map((optionYear) => {
                  const selected = String(optionYear) === year;
                  return (
                    <button
                      key={optionYear}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      tabIndex={yearOpen ? 0 : -1}
                      onClick={() => {
                        setYear(String(optionYear));
                        setYearError(false);
                        setYearOpen(false);
                      }}
                      className={`rounded-md py-2 text-sm font-bold transition-all duration-200 active:scale-95 ${
                        selected
                          ? "bg-ink text-brand shadow-md"
                          : "bg-white text-ink hover:-translate-y-0.5 hover:bg-brand hover:shadow-md"
                      }`}
                    >
                      {optionYear}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {showNote ? (
          <div className="relative">
            <textarea
              id="your-note"
              name="your-note"
              rows={2}
              placeholder=" "
              className="peer w-full resize-none rounded-lg border border-ink/15 bg-white px-3.5 pb-2 pt-6 text-sm font-semibold text-ink outline-none transition-all duration-300 hover:border-ink/30 focus:border-brand focus:ring-4 focus:ring-brand/25"
            />
            <label
              htmlFor="your-note"
              className="pointer-events-none absolute left-3.5 top-1.5 text-[10px] font-bold text-ink/55 peer-focus:text-brand-dark"
            >
              Condition, location notes (optional)
            </label>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowNote(true)}
            className="text-xs font-bold text-brand-dark transition-opacity hover:opacity-70"
          >
            + Add condition or location notes
          </button>
        )}
      </div>

      <div ref={step2} className={step === 2 ? "stagger-children space-y-3" : "hidden"}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            id="your-name"
            label="Your name"
            autoComplete="name"
            icon={<User className="h-4 w-4" aria-hidden />}
          />
          <Field
            id="your-phone"
            label="Phone number"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            icon={<PhoneCall className="h-4 w-4" aria-hidden />}
          />
        </div>
        <Field
          id="your-email"
          label="Email address"
          type="email"
          inputMode="email"
          autoComplete="email"
          icon={<Mail className="h-4 w-4" aria-hidden />}
        />
        <div className="grid grid-cols-5 gap-3">
          <Field
            id="suburb"
            label="Suburb"
            className="col-span-3"
            icon={<MapPin className="h-4 w-4" aria-hidden />}
          />
          <Field
            id="postal-code"
            label="Postcode"
            className="col-span-2"
            inputMode="numeric"
            autoComplete="postal-code"
            icon={<MapPin className="h-4 w-4" aria-hidden />}
          />
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Leave this field empty</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        {step === 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="btn-anim animate-glow group flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink hover:bg-ink hover:text-brand sm:text-base"
          >
            Next: your details
            <ArrowRight className="animate-nudge h-4 w-4" aria-hidden />
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={goBack}
              className="btn-anim rounded-full border-2 border-ink/15 px-5 py-3 text-sm font-bold text-ink hover:border-ink"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-anim animate-glow group flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink hover:bg-ink hover:text-brand disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
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
                  Get my cash offer
                  <ArrowRight className="animate-nudge h-4 w-4" aria-hidden />
                </>
              )}
            </button>
          </div>
        )}
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
