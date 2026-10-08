import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { ServiceCard } from "../ServiceCard";
import { services } from "@/lib/services";

export function ServicesGrid() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our services"
          title="One team for every removal job"
          description="From a daily driver to a written-off ute, we give you a fair price and take care of the towing."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
