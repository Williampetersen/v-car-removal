import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { PrimaryButton } from "../Buttons";
import { CheckCircle2, Truck, BadgeDollarSign } from "../Icons";
import { TowTruck } from "./HeroScene";

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
          className="reveal relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6 shadow-2xl shadow-sky-500/10 ring-1 ring-white/10 lg:order-2"
          aria-hidden
        >
          <div className="dot-grid absolute inset-0" />
          <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-sky-400/30 blur-3xl" />
          <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute inset-x-6 bottom-10 top-10 flex items-center">
            <div className="w-full">
              <TowTruck />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-8 bg-slate-950/70" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/15">
            <Truck className="h-4 w-4 text-sky-300" /> Free towing
          </span>
          <span className="absolute bottom-12 right-5 inline-flex items-center gap-2 rounded-full bg-sky-400 px-3 py-1.5 text-sm font-semibold text-slate-900">
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
