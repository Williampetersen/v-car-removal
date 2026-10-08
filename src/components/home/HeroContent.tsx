import { PrimaryButton } from "../Buttons";
import { site } from "@/lib/site";

export function HeroContent() {
  return (
    <div className="flex flex-1 flex-col items-center justify-between text-center">
      <div className="flex flex-col items-center">
        <span className="inline-flex items-center rounded-full bg-white/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-soft shadow-sm">
          Cash For Cars Brisbane &amp; South East QLD
        </span>

        <h1 className="font-display text-balance mt-3 max-w-xl text-2xl font-extrabold leading-tight text-ink [text-shadow:0_2px_14px_rgba(255,255,255,0.9)] sm:text-3xl lg:text-4xl">
          Cash For Cars &amp; Free Car Removal,{" "}
          <span className="whitespace-nowrap rounded-lg bg-brand px-1.5 text-ink">
            Up To {site.cashOfferMax}
          </span>
        </h1>
      </div>

      <div>
        <PrimaryButton href="/get-a-quote">Get Your Free Quote</PrimaryButton>
      </div>
    </div>
  );
}
