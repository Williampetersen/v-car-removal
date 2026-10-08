import Link from "next/link";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { GhostButton } from "../Buttons";
import { allLocations, locationPath } from "@/lib/locations";
import { MapPin, ChevronRight } from "../Icons";

export function ServiceAreas() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Where we operate"
            title="Brisbane and South East Queensland"
            description="Pick your area for suburbs, pickup details and local answers. Not listed? Call us, we may still cover you."
          />
          <GhostButton href="/locations" className="shrink-0">
            All service areas
          </GhostButton>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allLocations.map((loc, i) => (
            <li
              key={loc.slug}
              className="reveal"
              style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
            >
              <Link
                prefetch={false}
                data-tilt
                href={locationPath(loc.slug)}
                className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/20"
              >
                <span className="flex items-center gap-2 text-sm text-link">
                  <MapPin className="h-4 w-4" aria-hidden />
                  ~{loc.distanceKm} km from our depot
                </span>
                <span className="heading-xl mt-2 text-3xl text-ink">
                  Cash for cars {loc.name}
                </span>
                <span className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {loc.suburbs.slice(0, 4).join(", ")} and more
                </span>
                <span className="font-display mt-4 inline-flex items-center gap-1 text-base text-ink">
                  View area
                  <ChevronRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
