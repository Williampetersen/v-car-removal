import { Container } from "../Container";
import { allLocations } from "@/lib/locations";
import { site } from "@/lib/site";

const stats = [
  { value: `Up to ${site.cashOfferMax}`, label: "cash for your vehicle" },
  { value: "$0", label: "towing and removal" },
  { value: "Mon–Sat", label: "pickups, from 6:30am" },
  { value: `${allLocations.length}`, label: "areas across SE Queensland" },
];

export function StatsStrip() {
  return (
    <section className="border-b border-ink/10 bg-white">
      <Container>
        <dl className="grid grid-cols-2 divide-ink/10 lg:grid-cols-4 lg:divide-x">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-7 text-center sm:py-9 ${i < 2 ? "border-b border-ink/10 lg:border-b-0" : ""} ${i % 2 === 0 ? "border-r border-ink/10 lg:border-r-0" : ""}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="heading-xl block text-4xl text-ink sm:text-5xl">
                  {s.value}
                </span>
                <span className="mt-1 block text-sm text-zinc-600">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
