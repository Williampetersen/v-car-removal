import Image from "next/image";
import { Container } from "../Container";
import { ContactForm } from "../ContactForm";
import { CheckCircle2, Zap } from "../Icons";
import { FadeIn } from "../motion/FadeIn";
import { Stagger, StaggerItem } from "../motion/Stagger";

const trustPoints = [
  "Free towing, every time",
  "All makes & conditions",
  "Cash paid on pickup",
  "QLD-wide service",
];

export function QuoteSection() {
  return (
    <section className="bg-zinc-50 py-12 sm:py-16">
      <Container>
        <div className="relative isolate grid grid-cols-1 gap-10 overflow-hidden rounded-3xl bg-ink px-4 py-10 shadow-2xl sm:px-10 sm:py-16 lg:grid-cols-2 lg:items-center lg:px-14">
          <Image
            src="/images/gallery/car-removal-5.jpg"
            alt=""
            fill
            quality={85}
            className="-z-10 object-cover object-center"
            sizes="(min-width: 1280px) 1200px, 100vw"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/40"
            aria-hidden
          />

          <FadeIn>
            <span className="inline-flex items-center rounded-full bg-brand/25 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
              Free, No-Obligation Quote
            </span>
            <h2 className="font-display mt-5 text-3xl font-bold text-white sm:text-4xl">
              Get cash for your car today
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-200">
              Tell us about your vehicle and we&apos;ll get back to you with a
              fair cash offer, or call us directly for an instant quote.
            </p>
            <Stagger className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <StaggerItem
                  key={point}
                  className="flex items-center gap-2 text-sm font-medium text-white"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-brand"
                    aria-hidden
                  />
                  {point}
                </StaggerItem>
              ))}
            </Stagger>
          </FadeIn>

          <FadeIn className="rounded-3xl border border-ink/8 bg-white p-5 shadow-xl sm:p-9">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
                <Zap className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                  Get Cash Offer Now
                </h3>
                <p className="text-xs text-zinc-500">Takes about 60 seconds</p>
              </div>
            </div>
            <div className="mt-6">
              <ContactForm variant="light" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
