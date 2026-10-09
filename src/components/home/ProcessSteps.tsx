import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { SlantCard } from "../SlantCard";
import { FadeIn } from "../motion/FadeIn";
import { Stagger, StaggerItem } from "../motion/Stagger";

const steps = [
  {
    number: "01",
    image: "/images/gallery/car-removal-1.jpg",
    alt: "A damaged white car ready for a free quote",
    title: "Get your free quote",
    description:
      "Call us or fill out our online form with your car's details. We'll give you a fair, obligation-free offer.",
  },
  {
    number: "02",
    image: "/images/gallery/car-removal-3.jpg",
    alt: "A written-off hatchback that can be sold in any condition",
    title: "Accept the offer",
    description:
      "Happy with the price? Lock it in and book a pickup time that suits you, any day of the week.",
  },
  {
    number: "03",
    image: "/images/gallery/car-removal-4.jpg",
    alt: "A car being loaded onto our tow truck at the owner's home",
    title: "We come to you",
    description:
      "Our tow truck arrives at your home, office or roadside location and loads your vehicle at no cost.",
  },
  {
    number: "04",
    image: "/images/gallery/car-removal-2.jpg",
    alt: "A vehicle on the tow truck after pickup",
    title: "Get paid on the spot",
    description:
      "We handle the paperwork and pay you in cash the moment your vehicle is picked up. It's that simple.",
  },
];

export function ProcessSteps() {
  return (
    <section className="bg-ink-soft py-12 text-white sm:py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="How It Works"
            title="Cash in your hand in four easy steps"
            tone="dark"
          />
        </FadeIn>
        <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 lg:grid-cols-4">
          {steps.map((step) => (
            <StaggerItem key={step.number} className="h-full">
              <SlantCard
                image={step.image}
                imageAlt={step.alt}
                title={step.title}
                description={step.description}
                step={step.number}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
