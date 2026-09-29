import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { MapPin, ArrowRight } from "@/components/Icons";
import { regions } from "@/lib/locations";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Locations",
  description: `${site.name} provides free car removal and top cash offers across ${site.areasSummary}.`,
  alternates: {
    canonical: `${site.url}/locations`,
  },
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Locations"
        title="Find your nearest car removal service"
        description="We service a wide area across South East Queensland. Select your area below, or call us to check if we cover your suburb."
      />
      <section className="py-20 sm:py-28">
        <Container className="space-y-14">
          {regions.map((region) => (
            <div key={region.slug} id={region.slug}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-brand">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {region.name}
                  </h2>
                  <p className="text-sm text-zinc-600">{region.blurb}</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {region.locations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-ink shadow-md transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/15"
                  >
                    {loc.heroImage && (
                      <Image
                        src={loc.heroImage}
                        alt={`Cash for cars ${loc.name}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                      />
                    )}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                      <div className="min-w-0">
                        <p className="font-display text-2xl font-bold text-white">
                          {loc.name}
                        </p>
                        <p className="mt-1 truncate text-xs text-zinc-300">
                          {loc.suburbs.slice(0, 3).join(", ")}
                          {loc.suburbs.length > 3 ? ` +${loc.suburbs.length - 3}` : ""}
                        </p>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-ink transition-transform group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
