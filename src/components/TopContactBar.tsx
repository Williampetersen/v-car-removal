"use client";

import { AnimatedPhone } from "./AnimatedPhone";
import { Mail } from "./Icons";
import { site } from "@/lib/site";

// The very first thing a visitor sees on every page — phone and email,
// both tap/click-to-contact, so reaching us never needs a scroll or a search.
export function TopContactBar() {
  return (
    <div className="bg-brand text-ink">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <a
          href={site.phoneHref}
          className="flex items-center gap-2 text-sm font-bold tracking-tight text-ink transition-opacity hover:opacity-70"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-brand">
            <AnimatedPhone className="h-3.5 w-3.5" ringClassName="bg-ink/30" />
          </span>
          {site.phoneDisplay}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="flex items-center gap-2 text-xs font-bold text-ink transition-opacity hover:opacity-70 sm:text-sm"
        >
          <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="hidden sm:inline">{site.email}</span>
          <span className="sm:hidden">Email Us</span>
        </a>
      </div>
    </div>
  );
}
