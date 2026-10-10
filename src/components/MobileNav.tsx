"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronRight } from "./Icons";
import { CallButton, EmailButton } from "./CallButton";
import { NAV_LINKS } from "@/lib/site";

const easing = [0.22, 1, 0.36, 1] as const;

const SUBTITLES: Record<string, string> = {
  "/": "Get up to $9,999 cash for your car",
  "/services": "Cash for cars, scrap, trucks and more",
  "/locations": "Brisbane and South East Queensland",
  "/about": "Who we are and how we work",
  "/faq": "Quick answers to common questions",
  "/contact": "Get a free quote in about 60 seconds",
};

const navContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const navItem = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easing } },
};

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-brand hover:text-brand"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] isolate flex">
            <motion.div
              className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: easing }}
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <LogoMark className="h-6" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-transform active:scale-90"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <motion.nav
                variants={navContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col"
              >
                {NAV_LINKS.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={navItem}
                    className="border-b border-ink/10"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors active:bg-cream"
                    >
                      <span>
                        <span className="font-display block text-lg font-bold text-ink">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block text-sm text-ink/60">
                          {SUBTITLES[link.href]}
                        </span>
                      </span>
                      <ChevronRight
                        className="h-5 w-5 shrink-0 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-ink"
                        aria-hidden
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <div className="mt-auto flex flex-col gap-3 p-5">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + NAV_LINKS.length * 0.07, duration: 0.4, ease: easing }}
                >
                  <CallButton variant="onLight" className="w-full" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.27 + NAV_LINKS.length * 0.07, duration: 0.4, ease: easing }}
                >
                  <EmailButton variant="outline" className="w-full" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
