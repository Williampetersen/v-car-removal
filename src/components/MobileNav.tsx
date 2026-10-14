"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleHelp,
  House,
  Info,
  MapPin,
  Phone,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "./LogoMark";
import { Menu, X, ChevronRight, ArrowRight } from "./Icons";
import { CallButton } from "./CallButton";
import { NAV_LINKS } from "@/lib/site";

const easing = [0.22, 1, 0.36, 1] as const;

const NAV_META: Record<string, { subtitle: string; icon: LucideIcon }> = {
  "/": { subtitle: "Get up to $9,999 cash for your car", icon: House },
  "/services": { subtitle: "Cash for cars, scrap, trucks and more", icon: Truck },
  "/locations": { subtitle: "Brisbane and South East Queensland", icon: MapPin },
  "/about": { subtitle: "Who we are and how we work", icon: Info },
  "/faq": { subtitle: "Quick answers to common questions", icon: CircleHelp },
  "/contact": { subtitle: "Get a free quote in about 60 seconds", icon: Phone },
};

const navContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const navItem = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easing } },
};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const pathname = usePathname();

  // Links call setOpen(false) on click, so route changes already close the menu.

  // Lock page scroll and allow Escape to close while the menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const drawer = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] isolate flex lg:hidden">
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="relative ml-auto flex h-dvh w-full max-w-sm flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: easing }}
          >
            <div className="flex shrink-0 items-center justify-between bg-gradient-to-br from-ink to-[#1d4f91] px-5 py-4">
              <span className="rounded-full bg-white px-4 py-2 ring-2 ring-brand">
                <LogoMark className="h-5" />
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="btn-anim flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 hover:bg-brand hover:text-ink"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <motion.nav
                variants={navContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-1 p-2.5"
                aria-label="Main"
              >
                {NAV_LINKS.map((link) => {
                  const meta = NAV_META[link.href];
                  const Icon = meta.icon;
                  const active = isActive(link.href);
                  return (
                    <motion.div key={link.href} variants={navItem}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center gap-3.5 rounded-2xl px-3 py-2 transition-colors ${
                          active
                            ? "bg-sky-50 ring-1 ring-brand/60"
                            : "active:bg-sky-50 hover:bg-sky-50/70"
                        }`}
                      >
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            active
                              ? "bg-ink text-brand shadow-md shadow-ink/20"
                              : "bg-sky-50 text-ink ring-1 ring-ink/10 group-hover:bg-ink group-hover:text-brand"
                          }`}
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="font-display block text-lg font-bold leading-tight text-ink">
                            {link.label}
                          </span>
                          <span className="mt-0.5 block text-sm leading-snug text-ink/60">
                            {meta.subtitle}
                          </span>
                        </span>
                        <ChevronRight
                          className={`h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 ${
                            active ? "text-brand-dark" : "text-ink/35"
                          }`}
                          aria-hidden
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>
            </div>

            <div className="shrink-0 border-t border-ink/10 bg-sky-50/60 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <motion.div
                className="flex flex-col gap-2.5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4, ease: easing }}
              >
                <CallButton variant="onLight" size="sm" className="w-full" />
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-anim flex h-11 items-center justify-center gap-2 rounded-full bg-brand text-base font-bold text-ink shadow-lg shadow-brand/30"
                >
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </motion.div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="btn-anim flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-brand hover:text-brand"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      {/* Rendered on <body> so the sticky header cannot trap it under the bottom call bar. */}
      {mounted ? createPortal(drawer, document.body) : null}
    </div>
  );
}
