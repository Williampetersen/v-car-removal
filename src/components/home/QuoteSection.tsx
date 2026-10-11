import Image from "next/image";
import { Container } from "../Container";
import { ContactForm } from "../ContactForm";
import { RevealText } from "../RevealText";
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
    <section className="relative isolate z-10 -mt-7 overflow-hidden rounded-t-[1.75rem] bg-ink py-10 shadow-[0_-14px_34px_-10px_rgba(0,0,0,0.35)] sm:-mt-12 sm:rounded-t-[2.75rem] sm:py-16 lg:py-20">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <Image
          src="/images/gallery/car-removal-5.jpg"
          alt=""
          fill
          className="animate-kenburns object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/55"
        aria-hidden
      />

      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <FadeIn>
            <span className="inline-flex items-center rounded-full bg-brand px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
              Free, No-Obligation Quote
            </span>
          </FadeIn>
          <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:mt-5 sm:text-4xl lg:text-5xl">
            <RevealText text="Get cash for your car today" />
          </h2>
          <FadeIn delay={0.5}>
            <p className="mt-3 max-w-md text-base leading-relaxed text-zinc-200 sm:mt-4">
              Tell us about your vehicle and we&apos;ll get back to you with a
              fair cash offer, or call us directly for an instant quote.
            </p>
          </FadeIn>
          <Stagger className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:mt-8 sm:gap-x-6 sm:gap-y-3">
            {trustPoints.map((point) => (
              <StaggerItem
                key={point}
                className="flex items-center gap-2 text-xs font-semibold text-white sm:text-sm"
              >
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-brand"
                  aria-hidden
                />
                {point}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <FadeIn delay={0.25}>
          <div className="border-spin rounded-xl p-[2px] shadow-2xl shadow-black/30">
            <div className="rounded-[10px] bg-white p-4 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                  <span
                    className="soft-ping absolute inset-0 rounded-full bg-brand"
                    aria-hidden
                  />
                  <Zap className="zap-charge relative h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-shimmer font-display text-lg font-bold sm:text-xl">
                    Get Cash Offer Now
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-ink/60">
                    <span className="relative flex h-2 w-2" aria-hidden>
                      <span className="soft-ping absolute inset-0 rounded-full bg-brand" />
                      <span className="relative h-2 w-2 rounded-full bg-brand" />
                    </span>
                    Takes about 60 seconds
                  </p>
                </div>
              </div>
              <div className="mt-4 sm:mt-5">
                <ContactForm />
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
