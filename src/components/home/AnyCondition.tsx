import Image from "next/image";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { PrimaryButton } from "../Buttons";
import { CheckCircle2, Truck, BadgeDollarSign } from "../Icons";

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
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-sky-500/15 ring-1 ring-slate-200 lg:order-2"
          aria-hidden
        >
          <Image
            src="/images/gallery/car-removal-2.jpg"
            alt=""
            fill
            quality={75}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-800 shadow-sm ring-1 ring-slate-200">
            <Truck className="h-4 w-4 text-sky-600" /> Free towing
          </span>
          <span className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-sky-400 px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-500/30">
            <BadgeDollarSign className="h-4 w-4" /> Paid when we collect
          </span>
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
