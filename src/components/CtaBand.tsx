import { Container } from "./Container";
import { ContactForm } from "./ContactForm";
import { PhoneCall, CheckCircle2 } from "./Icons";
import { site } from "@/lib/site";

/** Closing call-to-action with the quote form. Shown on every content page (id="quote"). */
export function CtaBand({
  title = "Ready to turn your car into cash today?",
  description = "Send your car's details for a free, no-obligation quote, or call and we will tell you straight away.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section id="quote" className="scroll-mt-24 bg-brand py-14 sm:py-20">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-balance text-3xl font-bold text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/80">
            {description}
          </p>
          <ul className="mt-6 space-y-2 text-sm font-semibold text-ink">
            {["Free towing", "Any make, model or condition", "Paid when we collect"].map(
              (point) => (
                <li key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                  {point}
                </li>
              )
            )}
          </ul>
          <a
            href={site.phoneHref}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink/25 px-6 py-3.5 text-base font-bold text-ink transition-colors hover:border-ink"
          >
            <PhoneCall className="h-5 w-5" aria-hidden />
            Call {site.phoneDisplay}
          </a>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
          <h3 className="font-display text-lg font-bold text-ink">
            Get your free quote
          </h3>
          <div className="mt-5">
            <ContactForm variant="light" />
          </div>
        </div>
      </Container>
    </section>
  );
}
