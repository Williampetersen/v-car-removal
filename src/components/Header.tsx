import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { PhoneCall, Clock, Mail } from "./Icons";
import { NAV_LINKS, site } from "@/lib/site";

export function Header() {
  return (
    <>
      <div className="hidden bg-ink text-[13px] text-zinc-300 md:block">
        <Container className="flex h-10 items-center justify-between">
          <p className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-brand" aria-hidden />
            Mon–Fri 6:30am–5pm · Sat 7am–2pm · Sun closed
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-brand" aria-hidden />
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 font-bold text-white"
            >
              <PhoneCall className="h-3.5 w-3.5 text-brand" aria-hidden />
              {site.phoneDisplay}
            </a>
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <Link
            prefetch={false}
            href="/"
            className="flex shrink-0 items-center"
            aria-label={`${site.name} home`}
          >
            <Image
              src="/images/logo/logo.png"
              alt={site.name}
              width={204}
              height={80}
              priority
              className="h-9 w-auto sm:h-11"
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.filter((l) => l.href !== "/get-a-quote").map((link) => (
              <Link
                prefetch={false}
                key={link.href}
                href={link.href}
                className="font-display rounded-md px-3 py-2 text-lg uppercase tracking-wide text-ink-soft transition-colors hover:bg-ink hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.phoneHref}
              className="font-display hidden items-center gap-2 text-xl text-ink lg:inline-flex"
            >
              <PhoneCall className="h-5 w-5 text-link" aria-hidden />
              {site.phoneDisplay}
            </a>
            <Link
              prefetch={false}
              href="/get-a-quote"
              className="font-display inline-flex items-center rounded-lg bg-brand px-4 py-2.5 text-base uppercase tracking-wide text-ink shadow-[0_4px_0_0_#a63a05] transition-all hover:-translate-y-0.5 hover:bg-[#ff7d35] sm:px-5 sm:text-lg"
            >
              Free Quote
            </Link>
            <MobileNav />
          </div>
        </Container>
      </header>
    </>
  );
}
