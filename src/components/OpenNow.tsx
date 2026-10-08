"use client";

import { useEffect, useState } from "react";

// Mon-Fri 6:30-17:00, Sat 7:00-14:00 (Brisbane time). Keep in sync with site.hours.
function status(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Brisbane",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = get("weekday");
  const mins = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(day);
  const open =
    (weekday && mins >= 6 * 60 + 30 && mins < 17 * 60) ||
    (day === "Sat" && mins >= 7 * 60 && mins < 14 * 60);
  return open;
}

/** Live "open now" badge. Renders a neutral label first, then the real status after mount. */
export function OpenNow() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const first = window.setTimeout(() => setOpen(status()), 0);
    const id = window.setInterval(() => setOpen(status()), 60_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const dot =
    open === null ? "text-slate-400" : open ? "text-emerald-400" : "text-amber-400";
  const label =
    open === null
      ? "Free quotes, fast replies"
      : open
        ? "We're open now: call for a quote"
        : "Closed now: send a quote, we reply when we open";

  return (
    <p className="inline-flex min-h-8 items-center gap-2.5 rounded-full border border-white/15 bg-ink/70 px-3.5 py-1.5 text-sm font-medium text-white">
      <span className={`relative flex h-2.5 w-2.5 ${dot}`} aria-hidden>
        <span className={`ping absolute inset-0 rounded-full ${open === null ? "hidden" : ""}`} />
        <span className="relative h-2.5 w-2.5 rounded-full bg-current" />
      </span>
      {label}
    </p>
  );
}
