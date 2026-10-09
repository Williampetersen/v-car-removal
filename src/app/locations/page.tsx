import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { ServiceAreas, ExtendedAreas } from "@/components/home/ServiceAreas";
import { QuickAnswer } from "@/components/QuickAnswer";
import { LastUpdated } from "@/components/LastUpdated";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { allLocations } from "@/lib/locations";
import { breadcrumbSchema, webPageSchema, areaListSchema } from "@/lib/schema";

const title = `Car Removal Service Areas: ${allLocations.length} Regions in QLD & NSW`;
const description = `We buy cars and remove them free across Brisbane, Ipswich, the Gold Coast, Sunshine Coast, Toowoomba and ${allLocations.length - 5} more regions, from the Scenic Rim to Rockhampton and northern NSW.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${site.url}/locations`,
  },
  openGraph: { title, description, url: `${site.url}/locations`, type: "website" },
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/locations", name: title, description })} />
      <JsonLd data={areaListSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ])}
      />
      <PageHero
        eyebrow="Service areas"
        title="Find your nearest car removal service"
        description="We service a wide area across South East Queensland. Select your area below, or call us to check if we cover your suburb."
        crumbs={[{ name: "Home", href: "/" }, { name: "Locations" }]}
      />
      <section className="bg-white pt-14">
        <Container className="max-w-4xl">
          <QuickAnswer title="Where we collect">
            <p>
              We collect from Brisbane, Ipswich, Caboolture, the Gold Coast,
              Logan, Moreton Bay, Redlands, the Sunshine Coast and Toowoomba
              on regular runs from our depot at {site.address.street},{" "}
              {site.address.suburb} {site.address.state}{" "}
              {site.address.postcode}. We also collect by arrangement from{" "}
              {allLocations.length - 9} larger regions across South East and
              central Queensland and northern New South Wales, from the Scenic
              Rim and Noosa to Bundaberg, Rockhampton, the Tweed and Armidale.
              Towing is free anywhere in these areas.
            </p>
          </QuickAnswer>
        </Container>
      </section>
      <ServiceAreas showExtendedLinks={false} />
      <ExtendedAreas />
      <section className="bg-cream pb-10">
        <Container>
          <LastUpdated />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
