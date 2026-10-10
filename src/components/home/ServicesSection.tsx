import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { ServiceCard } from "../ServiceCard";
import { FadeIn } from "../motion/FadeIn";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { services } from "@/lib/services";

export function ServicesSection() {
  return (
    <section className="bg-cream py-12 sm:py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="What We Do"
            title="Every kind of vehicle, every condition, one great offer"
            description="Whether it's an old daily driver, a written-off ute or a truck that won't start, we'll give you a fair price and take care of everything."
          />
        </FadeIn>
        <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
