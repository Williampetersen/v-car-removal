import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { BadgeDollarSign, Truck, Clock, Recycle } from "../Icons";

const reasons = [
  {
    icon: BadgeDollarSign,
    title: "A price before we send a truck",
    description:
      "We assess your vehicle honestly and the quoted price is the amount you receive. No hidden fees.",
  },
  {
    icon: Truck,
    title: "Towing is always free",
    description:
      "Free removal from your home, workplace or roadside anywhere in our service area.",
  },
  {
    icon: Clock,
    title: "Fast, flexible pickups",
    description:
      "Same-day pickup is often possible near our Sherwood depot. Further out, we book the next run and confirm the time.",
  },
  {
    icon: Recycle,
    title: "Responsible recycling",
    description:
      "Vehicles go to a licensed dismantling and recycling facility where usable parts are recovered.",
  },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-indigo-50/60 py-16 sm:py-24">
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow="Why V Car Removal"
          title="Straightforward car removal, done right"
          description="A fair price, a fast pickup and payment when we collect, without the runaround."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              data-tilt
              style={{ ["--d" as string]: `${i * 100}ms` }}
              className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-sky-300"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-lg shadow-sky-500/30">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="heading-xl mt-5 text-xl">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
