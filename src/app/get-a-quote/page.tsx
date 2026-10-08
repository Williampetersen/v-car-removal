import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { QuickAnswer } from "@/components/QuickAnswer";
import { NapBlock } from "@/components/NapBlock";
import { LastUpdated } from "@/components/LastUpdated";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const title = "Get a Free Car Removal Quote in Brisbane";
const description = `Request a free, no-obligation cash offer for your car in Brisbane and South East Queensland. Free towing, any condition. Or call ${site.phoneDisplay}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/get-a-quote` },
  openGraph: { title, description, url: `${site.url}/get-a-quote`, type: "website" },
};

export default function GetAQuotePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/get-a-quote", name: title, description })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Get a quote", path: "/get-a-quote" },
        ])}
      />
      <PageHero
        eyebrow="Free quote"
        title="Get a free quote for your car"
        description="Tell us the make, model, year and suburb. We reply with a cash offer before we send a truck."
      />
      <section className="bg-white py-14 sm:py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-3">
            <QuickAnswer title="How it works">
              <p>
                Send the form or call{" "}
                <a href={site.phoneHref} className="font-bold underline">
                  {site.phoneDisplay}
                </a>
                . We quote a price (up to {site.cashOfferMax}, depending on the
                vehicle), book a pickup time, tow the car for free and pay you
                when we collect it. We buy cars, SUVs, utes, vans, trucks and
                motorbikes in any condition across Brisbane, Ipswich,
                Caboolture, the Gold Coast, Logan, Moreton Bay, Redlands, the
                Sunshine Coast and Toowoomba.
              </p>
            </QuickAnswer>
            <div className="rounded-2xl border border-ink/10 bg-cream p-7 sm:p-10">
              <h2 className="heading-xl text-4xl text-ink">
                Your vehicle details
              </h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-ink/10 bg-white p-7">
              <NapBlock />
            </div>
            <LastUpdated />
          </div>
        </Container>
      </section>
    </>
  );
}
