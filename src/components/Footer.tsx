import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { Mail, PhoneCall, MapPin, Clock } from "./Icons";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { allLocations } from "@/lib/locations";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-zinc-300">
      <Container className="grid grid-cols-1 gap-x-10 gap-y-8 py-12 sm:gap-y-14 sm:py-20 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo/logo.png"
            alt={site.name}
            width={796}
            height={313}
            className="h-9 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
            {site.description}
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
            <Clock className="h-4 w-4 shrink-0 text-brand" aria-hidden />
            <div>
              {site.hours.map((h) => (
                <div key={h.days}>
                  {h.days}: {h.time}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.15em] text-brand">
            Services
          </h3>
          <ul className="mt-5 space-y-3.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.15em] text-brand">
            Service Areas
          </h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {allLocations.map((l) => (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}`}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-brand/50 hover:text-white"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.15em] text-brand">
            Get In Touch
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={site.phoneHref}
                className="flex items-center gap-2.5 text-zinc-400 transition-colors hover:text-white"
              >
                <PhoneCall className="h-4 w-4 shrink-0" aria-hidden />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-zinc-400 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 leading-relaxed text-zinc-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {site.areasSummary}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-zinc-500 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/faq" className="hover:text-zinc-300">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-zinc-300">
              Contact
            </Link>
            <Link href="/privacy-policy" className="hover:text-zinc-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
