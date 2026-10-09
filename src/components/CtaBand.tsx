import { Container } from "./Container";
import { PrimaryButton, CallButton, EmailButton } from "./Buttons";
import { FadeIn } from "./motion/FadeIn";

export function CtaBand({
  title = "Ready to turn your car into cash today?",
  description = "Get a free, no-obligation quote in minutes and have your vehicle picked up as soon as today.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-12 sm:py-20 lg:py-28">
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/20 blur-3xl"
        aria-hidden
      />
      <FadeIn>
        <Container className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-display text-balance max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <PrimaryButton href="/contact">Get Your Free Quote</PrimaryButton>
            <CallButton />
            <EmailButton />
          </div>
        </Container>
      </FadeIn>
    </section>
  );
}
