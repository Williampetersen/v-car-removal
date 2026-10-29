import { PhoneCall } from "./Icons";
import { site } from "@/lib/site";

/** Desktop floating call button (mobile uses the sticky bottom bar). */
export function FloatingCall() {
  return (
    <a
      href={site.phoneHref}
      aria-label={`Call ${site.phoneDisplay}`}
      className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 overflow-hidden rounded-full bg-brand py-3 pl-4 pr-5 text-ink shadow-[0_10px_30px_-6px_rgba(14,165,233,0.55)] lg:flex"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-sky-600">
        <PhoneCall className="relative h-5 w-5" aria-hidden />
      </span>
      <span className="font-display text-lg leading-none">
        <span className="block text-[11px] opacity-70">Call now</span>
        {site.phoneDisplay}
      </span>
    </a>
  );
}
