import { Container } from "../Container";
import { ShieldCheck, Clock, Truck, BadgeDollarSign } from "../Icons";
import { Stagger, StaggerItem } from "../motion/Stagger";

const badges = [
  { icon: Truck, label: "Free Same-Day Towing" },
  { icon: BadgeDollarSign, label: "Cash On The Spot" },
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Clock, label: "7 Days A Week" },
];

export function TrustBadges() {
  return (
    <section className="bg-zinc-50 py-12">
      <Container>
        <Stagger className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {badges.map(({ icon: Icon, label }) => (
            <StaggerItem
              key={label}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-ink/8 bg-white px-4 py-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-ink/20 hover:shadow-lg sm:flex-row sm:text-left"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-dark ring-1 ring-brand/15 transition-all group-hover:scale-110 group-hover:bg-brand/20">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <span className="font-display text-sm font-bold text-ink sm:text-base">{label}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
