"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, PhoneCall } from "./Icons";
import { NAV_LINKS, site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-sky-50 to-white text-slate-900"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="heading-xl text-2xl">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="stripe" aria-hidden />
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                prefetch={false}
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="heading-xl rounded-xl px-3 py-3 text-3xl hover:bg-sky-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="space-y-3 border-t border-slate-200 p-5">
            <a
              href={site.phoneHref}
              className="font-display flex items-center justify-center gap-2 rounded-xl bg-brand py-4 text-lg text-ink shadow-lg shadow-sky-500/30"
            >
              <PhoneCall className="h-5 w-5" aria-hidden />
              Call {site.phoneDisplay}
            </a>
            <p className="text-center text-sm text-slate-500">
              {site.address.street}, {site.address.suburb} {site.address.state}{" "}
              {site.address.postcode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
