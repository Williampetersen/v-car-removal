import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { Mail, PhoneCall, MapPin, Clock } from "./Icons";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { allLocations, locationPath } from "@/lib/locations";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-slate-300">
      <div className="stripe" aria-hidden />
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-center">
          <div>
            <p className="font-display text-sm text-brand">
              Ready when you are
            </p>
            <a
              href={site.phoneHref}
              className="heading-xl mt-2 block text-4xl text-white hover:text-brand sm:text-5xl"
            >
              {site.phoneDisplay}
            </a>
          </div>
          <Link
            prefetch={false}
            href="/get-a-quote"
            className="font-display inline-flex items-center rounded-xl bg-brand px-8 py-4 text-lg text-ink shadow-lg shadow-sky-500/30 hover:bg-sky-300"
          >
            Get a free quote
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logo/logo.png"
              alt={site.name}
              width={204}
              height={80}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {site.description}
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    prefetch={false}
                    href={`/services/${s.slug}`}
                    className="text-slate-400 transition-colors hover:text-brand"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-white">
              Service areas
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {allLocations.map((l) => (
                <li key={l.slug}>
                  <Link
                    prefetch={false}
                    href={locationPath(l.slug)}
                    className="text-slate-400 transition-colors hover:text-brand"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2 text-slate-300 hover:text-brand"
                >
                  <PhoneCall className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-brand"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <address className="not-italic">
                  {site.name}
                  <br />
                  {site.address.street}, {site.address.suburb}{" "}
                  {site.address.state} {site.address.postcode}
                </address>
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link prefetch={false} href="/about" className="hover:text-white">
              About
            </Link>
            <Link prefetch={false} href="/faq" className="hover:text-white">
              FAQ
            </Link>
            <Link prefetch={false} href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link prefetch={false} href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link prefetch={false} href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
