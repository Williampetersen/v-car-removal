import { Container } from "../Container";
import { ContactForm } from "../ContactForm";
import { CallButton } from "../Buttons";
import { CheckCircle2 } from "../Icons";
import { HeroScene } from "./HeroScene";
import { OpenNow } from "../OpenNow";
import { site } from "@/lib/site";

const chips = [
  "Free towing",
  "Quote before pickup",
  "Cash or bank transfer",
  "Any condition",
];

const buys = ["cars", "utes", "vans", "SUVs & 4WDs", "trucks", "motorbikes"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-slate-900">
      <HeroScene />

      <Container className="relative grid grid-cols-1 items-center gap-10 pb-28 pt-12 sm:pb-32 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-36 lg:pt-20">
        <div>
          <div>
            <OpenNow />
          </div>
          <p className="font-display mt-5 inline-flex items-center gap-2 text-sm text-link">
            <span aria-hidden className="h-0.5 w-8 bg-sky-500" />
            Brisbane car removal &amp; cash for cars
          </p>
          <h1 className="heading-xl mt-4 text-5xl sm:text-6xl lg:text-7xl">
            Cash for cars
            <span className="text-gradient block">we tow it free</span>
          </h1>

          <p className="font-display mt-4 flex items-center gap-2 text-xl sm:text-2xl">
            <span className="text-slate-500">We buy</span>
            <span className="words-window text-link" aria-hidden>
              <span className="words-list">
                {[...buys, buys[0]].map((w, i) => (
                  <span key={i}>{w}</span>
                ))}
              </span>
            </span>
          </p>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            We buy {buys.join(", ")} in any condition across Brisbane and South
            East Queensland. Up to {site.cashOfferMax}, quoted before we send a
            truck.
          </p>

          <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 sm:max-w-lg">
            {chips.map((chip) => (
              <li
                key={chip}
                className="flex items-center gap-2.5 text-[15px] font-medium text-slate-800"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-600" aria-hidden />
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <span className="relative inline-flex lg:hidden">
              <span className="pulse-ring" aria-hidden />
              <a
                href="#quote-hero"
                data-ripple
                data-magnetic
                className="font-display shine relative inline-flex w-full items-center justify-center rounded-xl bg-brand px-7 py-4 text-lg text-ink shadow-lg shadow-sky-500/30 transition-transform hover:bg-sky-300 active:scale-95"
              >
                Get my cash offer
              </a>
            </span>
            <CallButton variant="onLight" className="py-4 text-lg" />
          </div>
        </div>

        <div
          id="quote-hero"
          data-tilt
          className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-sky-900/10 sm:p-8"
        >
          <p className="font-display text-sm text-link">Free, no-obligation</p>
          <h2 className="heading-xl mt-1 text-3xl">Get your cash offer</h2>
          <p className="mb-5 mt-2 text-sm text-slate-600">
            Two quick steps. We reply with a price before we send a truck.
          </p>
          <ContactForm variant="light" />
        </div>
      </Container>
      <div className="stripe relative z-10" aria-hidden />
    </section>
  );
}
