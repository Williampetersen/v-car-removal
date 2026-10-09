import Link from "next/link";
import { Container } from "./Container";
import { LogoMark } from "./LogoMark";
import { MobileNav } from "./MobileNav";
import { HeaderPhoneBadge } from "./HeaderPhoneBadge";
import { PhoneCall } from "./Icons";
import { NAV_LINKS, site } from "@/lib/site";

export function Header() {
  return (
    <header className="pointer-events-none sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <Container className="pointer-events-auto flex h-16 items-center justify-between gap-2 rounded-full bg-ink pl-2 pr-2 shadow-xl shadow-ink/30 ring-1 ring-white/10 sm:h-[4.5rem] sm:gap-4 sm:pr-3">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="group relative flex h-12 shrink-0 items-center overflow-hidden rounded-full bg-white px-5 shadow-lg shadow-black/20 ring-1 ring-brand transition-transform duration-300 hover:scale-105 sm:h-14 sm:px-7"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-brand/40 transition-transform duration-700 ease-out group-hover:translate-x-[520%]"
          />
          <LogoMark className="relative h-7 sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <HeaderPhoneBadge />
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand px-4 text-xs font-bold text-ink transition-all hover:bg-white sm:h-11 sm:px-6 sm:text-sm"
          >
            <PhoneCall className="h-3.5 w-3.5 sm:hidden" aria-hidden />
            Free Quote
          </Link>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
