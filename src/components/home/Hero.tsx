import Image from "next/image";
import { Container } from "../Container";
import { ContactForm } from "../ContactForm";
import { CallButton } from "../Buttons";
import { CheckCircle2 } from "../Icons";
import { site } from "@/lib/site";

const chips = [
  "Free towing",
  "Quote before pickup",
  "Cash or bank transfer",
  "Any condition",
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src="/images/hero/hero.webp"
        alt="Aerial view of a car yard with cars lined up for recycling"
        fill
        priority
        fetchPriority="high"
        quality={50}
        className="object-cover opacity-40"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-brand/25 blur-[110px]"
        aria-hidden
      />

      <Container className="relative grid grid-cols-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-24">
        <div>
          <p className="font-display inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-brand">
            <span aria-hidden className="h-0.5 w-8 bg-brand" />
            Brisbane car removal &amp; cash for cars
          </p>
          <h1 className="heading-xl mt-4 text-[3.4rem] sm:text-7xl lg:text-8xl">
            Cash for cars
            <span className="block text-brand">we tow it free</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-200 sm:text-xl">
            We buy cars, utes, vans, SUVs and motorbikes in any condition across
            Brisbane and South East Queensland. Up to {site.cashOfferMax},
            quoted before we send a truck.
          </p>

          <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 sm:max-w-lg">
            {chips.map((chip) => (
              <li key={chip} className="flex items-center gap-2.5 text-[15px] font-medium text-white">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" aria-hidden />
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote-hero"
              className="font-display inline-flex items-center justify-center rounded-lg bg-brand px-7 py-4 text-xl uppercase tracking-wide text-ink shadow-[0_6px_0_0_#a63a05] transition-all hover:-translate-y-0.5 hover:bg-[#ff7d35] lg:hidden"
            >
              Get my cash offer
            </a>
            <CallButton className="py-4 text-xl" />
          </div>
        </div>

        <div
          id="quote-hero"
          className="scroll-mt-24 rounded-2xl border border-white/15 bg-ink/80 p-6 shadow-2xl backdrop-blur-md sm:p-8"
        >
          <p className="font-display text-sm uppercase tracking-[0.18em] text-brand">
            Free, no-obligation
          </p>
          <h2 className="heading-xl mt-1 text-4xl">Get your cash offer</h2>
          <p className="mb-5 mt-2 text-sm text-zinc-300">
            Two quick steps. We reply with a price before we send a truck.
          </p>
          <ContactForm variant="dark" />
        </div>
      </Container>
      <div className="stripe" aria-hidden />
    </section>
  );
}
