import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { QuoteSection } from "@/components/home/QuoteSection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import { BrandStrip } from "@/components/home/BrandStrip";
import { ServicesSection } from "@/components/home/ServicesSection";
import { VehicleTypes } from "@/components/home/VehicleTypes";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { CtaBand } from "@/components/CtaBand";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FaqAccordion } from "@/components/FaqAccordion";
import { LastUpdated } from "@/components/LastUpdated";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/lib/faqs";
import { site } from "@/lib/site";
import { faqSchema, webPageSchema } from "@/lib/schema";

const title = "Cash For Cars Brisbane | Free Car Removal";
const description = `Sell your car for cash in Brisbane. Free towing, a quote before pickup, any make or condition, up to ${site.cashOfferMax}. Call ${site.phoneDisplay}.`;

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.shortName}` },
  description,
  alternates: { canonical: site.url },
  openGraph: { title, description, url: site.url, type: "website" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/", name: title, description })} />
      <JsonLd data={faqSchema(faqs.slice(0, 8))} />
      <Hero />
      <section className="py-10">
        <Container className="max-w-4xl">
          <QuickAnswer title="Who we are and what we do">
            <p>
              <strong>{site.name}</strong> is a Brisbane car removal and
              cash-for-cars business based at {site.address.street},{" "}
              {site.address.suburb} {site.address.state}{" "}
              {site.address.postcode}. We buy cars, SUVs, utes, vans, trucks
              and motorbikes in any condition, running or not, and tow them
              away for free.
            </p>
            <p>
              We pay up to {site.cashOfferMax} depending on the vehicle, quote
              you before we send a truck, and pay you when we collect, in cash
              or by bank transfer. We service Brisbane, Ipswich, Caboolture,
              the Gold Coast, Logan, Moreton Bay, Redlands, the Sunshine Coast
              and Toowoomba. Same-day pickup is available in most cases.
            </p>
          </QuickAnswer>
        </Container>
      </section>
      <QuoteSection />
      <TrustBadges />
      <GoogleReviews />
      <BrandStrip />
      <ServicesSection />
      <VehicleTypes />
      <ProcessSteps />
      <WhyChooseUs />
      <ServiceAreas />
      <section className="bg-zinc-50 py-16 sm:py-24">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Cash for cars in Brisbane: common questions
          </h2>
          <div className="mt-8">
            <FaqAccordion items={faqs.slice(0, 8)} />
          </div>
          <div className="mt-6">
            <LastUpdated />
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
