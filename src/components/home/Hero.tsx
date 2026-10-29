import { Container } from "../Container";
import { QuoteCard } from "../QuoteCard";
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
    <section className="relative isolate overflow-hidden text-white">
      <HeroScene />

      <Container className="relative grid grid-cols-1 items-center gap-8 pb-14 pt-10 sm:pb-20 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-24 lg:pt-20">
        {/* On phones this block fills the first screen so the video is seen clearly before the form. */}
        <div className="flex min-h-[68svh] flex-col justify-center lg:min-h-0">
          <div>
            <OpenNow />
          </div>
          <p className="font-display mt-5 inline-flex items-center gap-2 text-sm text-sky-200">
            <span aria-hidden className="h-0.5 w-8 bg-sky-300" />
            Brisbane car removal &amp; cash for cars
          </p>
          <h1 className="heading-xl mt-4 text-5xl drop-shadow-lg sm:text-6xl lg:text-7xl">
            Cash for cars
            <span className="block text-sky-300">we tow it free</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 drop-shadow sm:text-xl">
            We buy {buys.join(", ")} in any condition across Brisbane and South
            East Queensland. Up to {site.cashOfferMax}, quoted before we send a
            truck.
          </p>

          <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 sm:max-w-lg">
            {chips.map((chip) => (
              <li
                key={chip}
                className="flex items-center gap-2.5 text-[15px] font-medium text-white drop-shadow"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-300" aria-hidden />
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote-hero"
              className="font-display inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-7 py-4 text-lg text-white shadow-lg shadow-orange-500/40 lg:hidden"
            >
              Get my cash offer
            </a>
            <CallButton variant="onDark" className="py-4 text-lg" />
          </div>
        </div>

        <div id="quote-hero" className="scroll-mt-24">
          <QuoteCard />
        </div>
      </Container>
      <div className="stripe relative z-10" aria-hidden />
    </section>
  );
}
