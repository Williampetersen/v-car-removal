"use client";

import { motion } from "framer-motion";
import { PhoneCall } from "./Icons";
import { site } from "@/lib/site";

export function HeaderPhoneBadge() {
  return (
    <a
      href={site.phoneHref}
      className="hidden items-center gap-2 whitespace-nowrap rounded-full border-2 border-brand bg-white px-4 py-2 text-xs font-bold text-brand-dark transition-colors hover:bg-brand/10 md:inline-flex lg:text-sm"
    >
      <motion.span
        className="flex"
        animate={{ rotate: [0, -18, 16, -12, 8, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
      >
        <PhoneCall className="h-3.5 w-3.5" aria-hidden />
      </motion.span>
      {site.phoneDisplay}
    </a>
  );
}
