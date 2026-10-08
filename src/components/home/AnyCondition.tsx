import Image from "next/image";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { PrimaryButton } from "../Buttons";
import { CheckCircle2 } from "../Icons";

const conditions = [
  "Accident-damaged and written-off",
  "Not running or won't start",
  "Unregistered or expired rego",
  "Failed roadworthy or too costly to repair",
  "Flood, hail or fire damaged",
  "Old, rusted or simply unwanted",
];

export function AnyCondition() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 lg:order-2">
          <Image
            src="/images/gallery/car-removal-hero.jpg"
            alt="Accident-damaged red car strapped onto a tow truck"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-2 bg-brand" aria-hidden />
        </div>
        <div>
          <SectionHeading
            eyebrow="Any condition"
            title="Damaged, unregistered or not running? Still worth something"
            description="Even a car that is not worth selling privately has value in its parts and metal. Tell us what you have and we will quote."
          />
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {conditions.map((c) => (
              <li key={c} className="flex items-start gap-3 text-base text-ink">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cash-dark" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
          <PrimaryButton href="/get-a-quote" className="mt-9">
            Get a free quote
          </PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
