"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, PhoneCall, Mail } from "./Icons";
import { NAV_LINKS, site } from "@/lib/site";

const easing = [0.22, 1, 0.36, 1] as const;

const navContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const navItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easing } },
};

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] isolate flex">
            <motion.div
              className="absolute inset-0 bg-ink/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="relative ml-auto flex h-full w-full max-w-xs flex-col p-6 shadow-2xl"
              style={{ backgroundColor: "#ffffff" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: easing }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-ink">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <motion.nav
                variants={navContainer}
                initial="hidden"
                animate="show"
                className="mt-8 flex flex-col gap-1"
              >
                {NAV_LINKS.map((link) => (
                  <motion.div key={link.href} variants={navItem} whileTap={{ scale: 0.97 }}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 text-lg font-semibold text-ink-soft transition-colors hover:bg-zinc-100"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
              <motion.a
                href={site.phoneHref}
                variants={navItem}
                initial="hidden"
                animate="show"
                whileTap={{ scale: 0.96 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.06 }}
                className="mt-8 flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-bold text-ink shadow-lg shadow-brand/30"
              >
                <motion.span
                  animate={{ rotate: [0, -18, 16, -12, 8, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
                >
                  <PhoneCall className="h-5 w-5" aria-hidden />
                </motion.span>
                Call {site.phoneDisplay}
              </motion.a>
              <motion.a
                href={`mailto:${site.email}`}
                variants={navItem}
                initial="hidden"
                animate="show"
                whileTap={{ scale: 0.96 }}
                transition={{ delay: 0.16 + NAV_LINKS.length * 0.06 }}
                className="mt-3 flex items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-base font-bold text-ink-soft transition-colors hover:border-ink hover:text-ink"
              >
                <Mail className="h-5 w-5" aria-hidden />
                {site.email}
              </motion.a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
