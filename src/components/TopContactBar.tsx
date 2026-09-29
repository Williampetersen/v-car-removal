"use client";

import { motion } from "framer-motion";
import { PhoneCall, Mail } from "./Icons";
import { site } from "@/lib/site";

// The very first thing a visitor sees on every page — phone and email,
// both tap/click-to-contact, so reaching us never needs a scroll or a search.
export function TopContactBar() {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <a
          href={site.phoneHref}
          className="flex items-center gap-2 text-sm font-bold tracking-tight text-brand transition-colors hover:text-brand-dark"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
            <motion.span
              className="flex"
              animate={{ rotate: [0, -18, 16, -12, 8, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
            >
              <PhoneCall className="h-3.5 w-3.5" aria-hidden />
            </motion.span>
          </span>
          {site.phoneDisplay}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="flex items-center gap-2 text-xs font-semibold text-zinc-300 transition-colors hover:text-brand sm:text-sm"
        >
          <Mail className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
          <span className="hidden sm:inline">{site.email}</span>
          <span className="sm:hidden">Email Us</span>
        </a>
      </div>
    </div>
  );
}
