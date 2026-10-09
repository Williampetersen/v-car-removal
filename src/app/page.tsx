import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { Ticker } from "@/components/home/Ticker";
import { VehiclesWeBuy } from "@/components/home/VehiclesWeBuy";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { AnyCondition } from "@/components/home/AnyCondition";
import { WhyUs } from "@/components/home/WhyUs";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { VisitUs } from "@/components/home/VisitUs";
import { CtaBand } from "@/components/CtaBand";
import { QuickAnswer } from "@/components/QuickAnswer";
import { FaqAccordion } from "@/components/FaqAccordion";
import { LastUpdated } from "@/components/LastUpdated";
import { SectionHeading } from "@/components/SectionHeading";
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
  const homeFaqs = faqs.slice(0, 8);
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/", name: title, description })} />
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <Ticker />
      <StatsStrip />
      <section className="bg-white py-14 sm:py-20">
        <Container className="reveal max-w-4xl">
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
              and Toowoomba on regular runs, and ten larger regions from the
              Scenic Rim to Bundaberg by arrangement. Same-day pickup is often
              possible near Brisbane.
            </p>
          </QuickAnswer>
        </Container>
      </section>
      <VehiclesWeBuy />
      <HowItWorks />
      <AnyCondition />
      <ServicesGrid />
      <WhyUs />
      <ServiceAreas />
      <section className="bg-white py-16 sm:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="FAQ"
              title="Cash for cars in Brisbane: your questions"
              description="Straight answers on price, pickup, paperwork and payment."
            />
            <div className="mt-6">
              <LastUpdated />
            </div>
          </div>
          <FaqAccordion items={homeFaqs} />
        </Container>
      </section>
      <VisitUs />
      <CtaBand />
    </>
  );
}
