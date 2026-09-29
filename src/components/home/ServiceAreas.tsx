import Link from "next/link";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { PrimaryButton } from "../Buttons";
import { FadeIn } from "../motion/FadeIn";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { regions } from "@/lib/locations";
import { MapPin, ArrowRight } from "../Icons";

export function ServiceAreas() {
  return (
    <section className="bg-zinc-50 py-20 sm:py-28">
      <Container>
        <FadeIn className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Where We Operate"
            title="Proudly covering Brisbane & South East Queensland"
            description="Don't see your suburb listed? Give us a call, chances are we still service your area."
          />
          <PrimaryButton href="/locations" className="shrink-0">
            View All Locations
          </PrimaryButton>
        </FadeIn>

        {regions.map((region) => (
          <FadeIn
            key={region.slug}
            className="mt-12 grid grid-cols-1 overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-sm lg:grid-cols-[1fr_2fr]"
          >
            <div
              id={region.slug}
              className="flex scroll-mt-28 flex-col justify-between gap-8 border-b border-ink/8 bg-gradient-to-br from-brand/10 via-white to-white p-8 lg:border-b-0 lg:border-r"
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand-dark ring-1 ring-brand/15">
                  <MapPin className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="font-display mt-5 text-2xl font-bold text-ink">
                  {region.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{region.blurb}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-display text-3xl font-bold text-ink">
                    {region.locations.length}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Service areas
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-ink">
                    {region.locations.reduce((n, l) => n + l.suburbs.length, 0)}+
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Suburbs covered
                  </p>
                </div>
              </div>
            </div>

            <Stagger className="grid grid-cols-1 gap-px bg-ink/8 sm:grid-cols-3">
              {region.locations.map((loc) => (
                <StaggerItem key={loc.slug} className="bg-white">
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="group flex h-full items-center justify-between gap-3 px-6 py-5 transition-colors hover:bg-zinc-50"
                  >
                    <span>
                      <span className="font-display block text-base font-bold text-ink transition-colors group-hover:text-brand-dark">
                        {loc.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {loc.suburbs.length} suburbs
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-zinc-300 transition-all group-hover:translate-x-1 group-hover:text-brand-dark"
                      aria-hidden
                    />
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </FadeIn>
        ))}
      </Container>
    </section>
  );
}
