import { Container } from "../Container";
import { NapBlock } from "../NapBlock";
import { SectionHeading } from "../SectionHeading";
import { PrimaryButton } from "../Buttons";
import { site } from "@/lib/site";

export function VisitUs() {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${site.depots[0].mapQuery}`;
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Visit us"
            title="Based in Sherwood, Brisbane"
            description="Our depot is in Brisbane's inner south-west, close to the Ipswich Motorway, so most of Brisbane is a short run for our tow trucks."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href={directions}>Get directions</PrimaryButton>
          </div>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-cream p-7 sm:p-9">
          <NapBlock />
        </div>
      </Container>
    </section>
  );
}
