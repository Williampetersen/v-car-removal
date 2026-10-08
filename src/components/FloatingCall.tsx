import { PhoneCall } from "./Icons";
import { site } from "@/lib/site";

/** Desktop floating call button (mobile uses the sticky bottom bar). */
export function FloatingCall() {
  return (
    <a
      href={site.phoneHref}
      data-ripple
      aria-label={`Call ${site.phoneDisplay}`}
      className="float-y group fixed bottom-6 right-6 z-40 hidden items-center gap-3 overflow-hidden rounded-full bg-brand py-3 pl-4 pr-5 text-ink shadow-[0_10px_30px_-6px_rgba(255,107,26,0.7)] transition-transform hover:scale-105 active:scale-95 lg:flex"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink text-brand">
        <span className="ping absolute inset-0 rounded-full text-brand/60" aria-hidden />
        <PhoneCall className="relative h-5 w-5" aria-hidden />
      </span>
      <span className="font-display text-xl uppercase leading-none tracking-wide">
        <span className="block text-[11px] tracking-[0.18em] opacity-70">Call now</span>
        {site.phoneDisplay}
      </span>
    </a>
  );
}
