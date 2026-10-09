import Link from "next/link";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { GhostButton } from "../Buttons";
import {
  coreAreas,
  extendedAreas,
  locationPath,
  regions,
  type Location,
} from "@/lib/locations";
import { MapPin, ChevronRight } from "../Icons";

function AreaCards({ areas }: { areas: Location[] }) {
  return (
    <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((loc, i) => (
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
              {loc.tier === "extended" && (
                <span className="ml-auto rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                  By arrangement
                </span>
              )}
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
  );
}

/** Core areas grid (home + locations hub). */
export function ServiceAreas({ showExtendedLinks = true }: { showExtendedLinks?: boolean }) {
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
        <AreaCards areas={coreAreas} />

        {showExtendedLinks && (
          <div className="reveal mt-14 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <p className="font-display text-sm text-link">Extended regions</p>
            <h3 className="heading-xl mt-1 text-2xl sm:text-3xl">
              Further out? We collect across Queensland and northern NSW too
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
              Large regions from the Scenic Rim to Bundaberg, Rockhampton and
              northern New South Wales are served by arrangement: we book a
              day, confirm a window and tow for free when we buy.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {extendedAreas.slice(0, 10).map((loc) => (
                <li key={loc.slug}>
                  <Link
                    prefetch={false}
                    href={locationPath(loc.slug)}
                    className="font-display inline-block rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-base text-ink-soft transition-colors hover:border-sky-400 hover:bg-sky-50 hover:text-link"
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  prefetch={false}
                  href="/locations#northern-nsw"
                  className="font-display inline-block rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-base text-link transition-colors hover:border-sky-400"
                >
                  + {extendedAreas.length - 10} more across Queensland and northern NSW →
                </Link>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

/** Extended regions, one section per region group (locations hub). */
export function ExtendedAreas() {
  return (
    <>
      {regions.slice(1).map((region, i) => (
        <section
          key={region.slug}
          id={region.slug}
          className={`${i % 2 === 0 ? "bg-white" : "bg-cream"} py-16 sm:py-24`}
        >
          <Container>
            <SectionHeading
              eyebrow="By arrangement"
              title={region.name}
              description={region.blurb}
            />
            <AreaCards areas={region.locations} />
          </Container>
        </section>
      ))}
    </>
  );
}
