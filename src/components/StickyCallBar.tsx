import Link from "next/link";
import { PhoneCall, BadgeDollarSign } from "./Icons";
import { site } from "@/lib/site";

/** Mobile-only sticky bar: click-to-call and quote on every page. */
export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-ink/10 bg-ink p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.4)] lg:hidden">
      <a
        href={site.phoneHref}
        className="font-display flex items-center justify-center gap-2 rounded-lg border-2 border-white/25 py-3 text-lg uppercase tracking-wide text-white"
      >
        <PhoneCall className="h-5 w-5 text-brand" aria-hidden />
        Call Now
      </a>
      <Link
        prefetch={false}
        href="/get-a-quote"
        className="font-display flex items-center justify-center gap-2 rounded-lg bg-brand py-3 text-lg uppercase tracking-wide text-ink"
      >
        <BadgeDollarSign className="h-5 w-5" aria-hidden />
        Free Quote
      </Link>
    </div>
  );
}
