import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { Clock, MapPin, Zap } from "@/components/Icons";
import { CallButton, EmailButton } from "@/components/Buttons";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/lib/site";

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

            <StaggerItem className="rounded-xl border border-ink/8 bg-white p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
                <Clock className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display mt-4 text-lg font-bold text-ink">
                Hours
              </h3>
              <div className="mt-2 space-y-1 text-sm text-zinc-600">
                {site.hours.map((h) => (
                  <p key={h.days}>
                    {h.days}: {h.time}
                  </p>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem className="rounded-xl border border-ink/8 bg-white p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display mt-4 text-lg font-bold text-ink">
                Service area
              </h3>
              <p className="mt-2 text-sm text-zinc-600">{site.areasSummary}</p>
            </StaggerItem>

            <StaggerItem className="rounded-xl border border-ink/8 bg-white p-7">
              <h3 className="font-display text-lg font-bold text-ink">
                Visit us
              </h3>
              <div className="mt-4 space-y-4">
                {site.depots.map((depot) => (
                  <div key={depot.name} className="flex items-center gap-3">
                    <div className="relative h-8 w-20 shrink-0">
                      <Image
                        src={depot.logo}
                        alt={depot.name}
                        fill
                        className="object-contain object-left"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{depot.name}</p>
                      <p className="text-sm text-zinc-600">{depot.address}</p>
                    </div>
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
