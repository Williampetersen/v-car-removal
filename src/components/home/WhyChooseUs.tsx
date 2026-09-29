import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { CheckCircle2 } from "../Icons";
import { FadeIn } from "../motion/FadeIn";
import { Stagger, StaggerItem } from "../motion/Stagger";

const reasons = [
  {
    title: "Fair, transparent quotes",
    description:
      "No lowball tactics. We assess your vehicle honestly and explain exactly how we arrived at your offer.",
  },
  {
    title: "Zero cost to you",
    description:
      "Free towing, free paperwork assistance and no hidden fees, ever. What we quote is what you get.",
  },
  {
    title: "Fast, flexible scheduling",
    description:
      "We work around your availability, with same-day and after-hours pickups available across our service area.",
  },
  {
    title: "Responsible recycling",
    description:
      "Vehicles are dismantled at a licensed facility, with usable parts resold and materials recycled properly.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
        <FadeIn>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Straightforward car removal, done right"
            description="We've built our process around what actually matters to you: a fair price, a fast pickup, and cash in your hand without the runaround."
          />
        </FadeIn>
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <StaggerItem
              key={reason.title}
              className="group relative overflow-hidden rounded-3xl border border-ink/8 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-cash/40 hover:shadow-lg hover:shadow-cash/10"
            >
              <span
                className="font-display pointer-events-none absolute -right-2 -top-4 text-7xl font-bold text-ink/[0.04] transition-colors group-hover:text-cash/10"
                aria-hidden
              >
                0{index + 1}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cash/10 text-cash-dark ring-1 ring-cash/15 transition-all group-hover:scale-110 group-hover:bg-cash/20">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display mt-5 text-lg font-bold text-ink">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {reason.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
