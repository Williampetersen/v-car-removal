import Link from "next/link";
import { PhoneCall, BadgeDollarSign } from "./Icons";
import { site } from "@/lib/site";

/** Mobile-only sticky bar: click-to-call and quote on every page. */
export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.25)] lg:hidden">
      <a
        href={site.phoneHref}
        className="font-display flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 text-base text-slate-900"
      >
        <PhoneCall className="h-5 w-5 text-sky-600" aria-hidden />
        Call Now
      </a>
      <Link
        prefetch={false}
        href="/get-a-quote"
        className="font-display flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-base text-ink"
      >
        <BadgeDollarSign className="h-5 w-5" aria-hidden />
        Free Quote
      </Link>
    </div>
  );
}
