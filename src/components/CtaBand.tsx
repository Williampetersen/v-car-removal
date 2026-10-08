import { Container } from "./Container";
import { ContactForm } from "./ContactForm";
import { PhoneCall, CheckCircle2 } from "./Icons";
import { site } from "@/lib/site";

/** Closing call-to-action with the quote form. Shown on every content page (id="quote"). */
export function CtaBand({
  title = "Ready to turn your car into cash?",
  description = "Send your car's details for a free, no-obligation quote, or call and we will tell you straight away.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section
      id="quote"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-16 text-white sm:py-24"
    >
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand/30 blur-[110px]"
        aria-hidden
      />
      <Container className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-display inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-brand">
            <span aria-hidden className="h-0.5 w-8 bg-brand" />
            Free quote
          </p>
          <h2 className="heading-xl mt-3 text-5xl sm:text-6xl">{title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-300">
            {description}
          </p>
          <ul className="mt-7 space-y-3">
            {[
              "Free towing, any make, model or condition",
              "A price before we send a truck",
              "Paid when we collect, cash or bank transfer",
            ].map((point) => (
              <li key={point} className="flex items-center gap-3 text-base text-zinc-100">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
          <a
            href={site.phoneHref}
            className="font-display mt-8 inline-flex items-center gap-3 text-3xl text-white hover:text-brand"
          >
            <PhoneCall className="h-7 w-7 text-brand" aria-hidden />
            {site.phoneDisplay}
          </a>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          <h3 className="heading-xl text-3xl">Get your free quote</h3>
          <div className="mt-5">
            <ContactForm variant="dark" />
          </div>
        </div>
      </Container>
    </section>
  );
}
