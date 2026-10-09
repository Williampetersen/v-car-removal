import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { SlantCard } from "../SlantCard";
import { ShieldCheck, BadgeDollarSign, Clock, Recycle } from "../Icons";
import { FadeIn } from "../motion/FadeIn";
import { Stagger, StaggerItem } from "../motion/Stagger";

const reasons = [
  {
    icon: <ShieldCheck className="h-9 w-9 text-ink" aria-hidden />,
    title: "Fair, transparent quotes",
    description:
      "No lowball tactics. We assess your vehicle honestly and explain exactly how we arrived at your offer.",
  },
  {
    icon: <BadgeDollarSign className="h-9 w-9 text-ink" aria-hidden />,
    title: "Zero cost to you",
    description:
      "Free towing, free paperwork assistance and no hidden fees, ever. What we quote is what you get.",
  },
  {
    icon: <Clock className="h-9 w-9 text-ink" aria-hidden />,
    title: "Fast, flexible scheduling",
    description:
      "We work around your availability, with same-day and after-hours pickups available across our service area.",
  },
  {
    icon: <Recycle className="h-9 w-9 text-ink" aria-hidden />,
    title: "Responsible recycling",
    description:
      "Vehicles are dismantled at a licensed facility, with usable parts resold and materials recycled properly.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-cream py-12 sm:py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Straightforward car removal, done right"
            description="We've built our process around what actually matters to you: a fair price, a fast pickup, and cash in your hand without the runaround."
          />
        </FadeIn>
        <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 lg:grid-cols-4">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title} className="h-full">
              <SlantCard
                icon={reason.icon}
                title={reason.title}
                description={reason.description}
                tone="blue"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
