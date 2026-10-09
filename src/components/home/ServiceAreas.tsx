import Link from "next/link";
import Image from "next/image";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { PrimaryButton } from "../Buttons";
import { FadeIn } from "../motion/FadeIn";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { regions } from "@/lib/locations";
import { MapPin, ArrowRight } from "../Icons";

const areaVehicleImages: Record<string, string> = {
  brisbane: "/images/misc/vehicle-car.png",
  ipswich: "/images/misc/vehicle-ute-2.png",
  caboolture: "/images/misc/vehicle-van.png",
  "gold-coast": "/images/misc/vehicle-motorbike.png",
  logan: "/images/misc/vehicle-suv.png",
  "moreton-bay": "/images/misc/vehicle-car.png",
  redlands: "/images/misc/vehicle-suv.png",
  "sunshine-coast": "/images/misc/vehicle-van.png",
  toowoomba: "/images/misc/vehicle-ute.png",
};

export function ServiceAreas() {
  return (
    <section className="bg-cream py-12 sm:py-20 lg:py-28">
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
            className="mt-8 grid grid-cols-1 overflow-hidden rounded-xl bg-white shadow-xl sm:mt-12 shadow-ink/10 ring-1 ring-ink/5 lg:grid-cols-[1fr_2fr]"
          >
            <div
              id={region.slug}
              className="relative flex scroll-mt-28 flex-col justify-between gap-6 overflow-hidden bg-ink p-5 text-white sm:gap-10 sm:p-8"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/25 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-ink">
                  <MapPin className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="font-display mt-6 text-2xl font-bold leading-tight">
                  {region.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {region.blurb}
                </p>
              </div>
              <div className="relative grid grid-cols-2 gap-4 border-t border-white/15 pt-6">
                <div>
                  <p className="font-display text-4xl font-bold text-brand">
                    {region.locations.length}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Service areas
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-brand">
                    {region.locations.reduce((n, l) => n + l.suburbs.length, 0)}+
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Suburbs covered
                  </p>
                </div>
              </div>
            </div>

            <Stagger className="grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-3">
              {region.locations.map((loc, index) => (
                <StaggerItem key={loc.slug} className="bg-white">
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="group relative flex h-full min-h-[112px] items-start justify-between gap-2 overflow-hidden px-4 py-4 sm:min-h-[132px] sm:gap-3 sm:px-6 sm:py-6 transition-colors duration-300 hover:bg-brand/10"
                  >
                    <span
                      className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100"
                      aria-hidden
                    />
                    <span className="relative z-10 max-w-[60%]">
                      <span className="text-xs font-bold text-brand-dark">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display mt-0.5 block text-lg font-bold text-ink">
                        {loc.name}
                      </span>
                      <span className="block text-xs text-ink/60">
                        {loc.suburbs.length} suburbs
                      </span>
                    </span>
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink transition-all duration-300 group-hover:bg-brand group-hover:text-ink">
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45"
                        aria-hidden
                      />
                    </span>
                    {areaVehicleImages[loc.slug] && (
                      <Image
                        src={areaVehicleImages[loc.slug]}
                        alt=""
                        width={640}
                        height={480}
                        sizes="140px"
                        className="pointer-events-none absolute -bottom-2 -right-2 w-24 translate-x-3 opacity-90 drop-shadow-lg transition-all duration-500 ease-out group-hover:-translate-x-2 group-hover:scale-110 group-hover:opacity-100 sm:-bottom-3 sm:-right-1 sm:w-36"
                      />
                    )}
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
