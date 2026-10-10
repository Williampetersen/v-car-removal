import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { Clock, MapPin, Zap, ArrowRight } from "@/components/Icons";
import { CallButton, EmailButton } from "@/components/Buttons";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/lib/site";
import { allLocations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get a free quote from ${site.name}. Call, email, or send us your vehicle details online.`,
  alternates: {
    canonical: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get your free, no-obligation quote"
        description="Tell us about your vehicle and we'll get back to you with a fair cash offer, or call us directly for an instant quote."
        image="/images/gallery/car-removal-hero.jpg"
      />

      <section className="py-12 sm:py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-5">
          <FadeIn className="relative overflow-hidden rounded-xl border border-ink/8 bg-white p-7 shadow-xl shadow-ink/5 sm:p-10 lg:col-span-3">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand via-brand-dark to-brand" aria-hidden />
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
                <Zap className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="font-display text-2xl font-bold text-ink">
                Get Cash Offer Now
              </h2>
            </div>
            <p className="mt-3 text-sm text-zinc-600">
              Fill in your vehicle and contact details below and we&apos;ll
              get back to you with a cash offer as soon as possible.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </FadeIn>

          <Stagger className="space-y-5 lg:col-span-2">
            <StaggerItem>
              <CallButton variant="onLight" className="w-full" />
            </StaggerItem>

            <StaggerItem>
              <EmailButton variant="outline" className="w-full" />
            </StaggerItem>

            <StaggerItem className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg shadow-ink/10 ring-1 ring-ink/5">
              <span className="absolute inset-x-0 top-0 h-1 bg-brand" aria-hidden />
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-brand shadow-md shadow-ink/20">
                  <Clock className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="font-display text-xl font-bold text-ink">
                  Opening hours
                </h3>
              </div>
              <ul className="mt-5 divide-y divide-dashed divide-ink/15">
                {site.hours.map((h) => {
                  const closed = /closed/i.test(h.time);
                  return (
                    <li
                      key={h.days}
                      className="flex items-center justify-between gap-3 py-3 text-sm"
                    >
                      <span className="font-semibold text-ink">{h.days}</span>
                      {closed ? (
                        <span className="rounded-full bg-ink/10 px-3 py-1 text-xs font-bold text-ink/60">
                          Closed
                        </span>
                      ) : (
                        <span className="rounded-full bg-brand/30 px-3 py-1 text-xs font-bold text-ink">
                          {h.time}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </StaggerItem>

            <StaggerItem className="relative overflow-hidden rounded-xl bg-white p-6 shadow-lg shadow-ink/10 ring-1 ring-ink/5">
              <span className="absolute inset-x-0 top-0 h-1 bg-brand" aria-hidden />
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-brand shadow-md shadow-ink/20">
                  <MapPin className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="font-display text-xl font-bold text-ink">
                  Areas we cover
                </h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {allLocations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className="rounded-full bg-cream px-3.5 py-1.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:ring-brand"
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem className="relative overflow-hidden rounded-xl bg-ink p-6 text-white shadow-lg shadow-ink/20">
              <span className="absolute inset-x-0 top-0 h-1 bg-brand" aria-hidden />
              <h3 className="font-display text-xl font-bold">Visit us</h3>
              <div className="mt-5 space-y-5">
                {site.depots.map((depot) => (
                  <div key={depot.name}>
                    <p className="font-semibold text-brand">{depot.name}</p>
                    <p className="mt-1 flex items-start gap-2 text-sm text-zinc-200">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                      {depot.address}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${depot.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-bold text-ink transition-colors duration-300 hover:bg-white"
                    >
                      Get directions
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </a>
                  </div>
                ))}
              </div>
            </StaggerItem>
          </Stagger>
        </Container>
      </section>
    </>
  );
}
