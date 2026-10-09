import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { PrimaryButton, CallButton } from "@/components/Buttons";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuickAnswer } from "@/components/QuickAnswer";
import { LastUpdated } from "@/components/LastUpdated";
import { NapBlock } from "@/components/NapBlock";
import { JsonLd } from "@/components/JsonLd";
import {
  allLocations,
  getLocationBySlug,
  locationPath,
} from "@/lib/locations";
import { cityFaqs } from "@/lib/faqs";
import { site } from "@/lib/site";
import {
  locationSchema,
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";

const PREFIX = "cash-for-cars-";

// Old WordPress URLs (/cash-for-cars-ipswich etc.) are kept as-is.
export const dynamicParams = false;

export function generateStaticParams() {
  return allLocations.map((loc) => ({ slug: `${PREFIX}${loc.slug}` }));
}

function resolve(slug: string) {
  if (!slug.startsWith(PREFIX)) return undefined;
  return getLocationBySlug(slug.slice(PREFIX.length));
}

function metaFor(name: string, suburbs: string[]) {
  const build = (n: number) =>
    `Sell your car for cash in ${name}. Free towing, quote before pickup, any condition. Serving ${suburbs
      .slice(0, n)
      .join(", ")} and more. Call ${site.phoneDisplay}.`;
  let description = build(3);
  if (description.length > 158) description = build(2);
  if (description.length > 158) description = build(1);
  return {
    title: `Cash For Cars ${name} | Free Car Removal`,
    description,
  };
}

export async function generateMetadata(
  props: PageProps<"/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const location = resolve(slug);
  if (!location) return {};
  const { title, description } = metaFor(location.name, location.suburbs);
  return {
    title: { absolute: `${title} | ${site.shortName}` },
    description,
    alternates: { canonical: `${site.url}${locationPath(location.slug)}` },
    openGraph: {
      title,
      description,
      url: `${site.url}${locationPath(location.slug)}`,
      type: "website",
      images: location.heroImage ? [{ url: location.heroImage }] : undefined,
    },
  };
}

export default async function CityPage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const location = resolve(slug);
  if (!location) notFound();

  const path = locationPath(location.slug);
  const { title, description } = metaFor(location.name, location.suburbs);
  const faqs = cityFaqs(location);
  const extended = location.tier === "extended";
  const nearby = location.nearby
    .map((s) => getLocationBySlug(s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: `Cash For Cars ${location.name}`, path },
  ];

  return (
    <>
      <JsonLd data={locationSchema(location)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <JsonLd
        data={webPageSchema({ path, name: title, description })}
      />

      <PageHero
        eyebrow={`${location.name}, ${location.region}`}
        title={`Cash For Cars ${location.name}`}
        description={`Free car removal and a cash offer for your car, ute, van, 4WD or motorbike in ${location.name}, in any condition.`}
        aside={
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-sky-900/10 sm:p-7">
            <p className="font-display text-sm text-link">
              Pickup in {location.name}
            </p>
            <dl className="mt-4 divide-y divide-slate-200">
              {[
                ["From our depot", `about ${location.distanceKm} km`],
                ["Pickup", extended ? "Booked in advance" : "Often same-day"],
                ["Towing", "Free"],
                ["Quote", "Before we send a truck"],
                ["Payment", "Cash or bank transfer"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-sm text-slate-500">{k}</dt>
                  <dd className="text-right text-base font-semibold text-slate-900">{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href={site.phoneHref}
              className="heading-xl mt-3 block text-3xl text-link hover:text-slate-900"
            >
              {site.phoneDisplay}
            </a>
          </div>
        }
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations" },
          { name: `Cash for cars ${location.name}` },
        ]}
      >
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <PrimaryButton href="#quote">Get Your Free Quote</PrimaryButton>
          <CallButton variant="onLight" />
        </div>
      </PageHero>

      <section className="bg-white pt-12 pb-4">
        <Container className="max-w-4xl">
          <QuickAnswer title={`Selling a car in ${location.name}: the short answer`}>
            <p>
              <strong>{site.name}</strong> buys cars, utes, vans, 4WDs and
              motorbikes in {location.name} ({location.council}), including{" "}
              {location.suburbs.slice(0, 3).join(", ")}, in any condition, and
              tows them free. We quote up to {site.cashOfferMax} before we send
              a truck and pay on collection. {location.name} is about{" "}
              {location.distanceKm} km from our Sherwood depot (
              {site.address.street}, {site.address.suburb}{" "}
              {site.address.state} {site.address.postcode}).{" "}
              {extended
                ? "Collections here are booked in advance and confirmed when we quote."
                : "It is part of our regular service area."}{" "}
              Call{" "}
              <a href={site.phoneHref} className="font-bold underline">
                {site.phoneDisplay}
              </a>
              .
            </p>
          </QuickAnswer>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="heading-xl text-3xl text-ink sm:text-4xl">
              Car removal in {location.name}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700">
              {location.about.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              <p>{location.access}</p>
            </div>

            <h2 className="heading-xl mt-12 text-3xl text-ink sm:text-4xl">
              Suburbs we collect from in {location.name}
            </h2>
            <p className="mt-3 text-base text-slate-700">
              We regularly collect from the {location.council} area, including:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {location.suburbs.map((s) => (
                <li
                  key={s}
                  className="rounded-xl border border-ink/15 bg-cream px-3.5 py-1.5 text-sm font-medium text-ink-soft"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate-500">
              Not on the list? Call {site.phoneDisplay} and we will confirm
              whether we can collect from your address.
            </p>

            <h2 className="heading-xl mt-12 text-3xl text-ink sm:text-4xl">
              What we collect in {location.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {location.vehicles}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              A vehicle left on a road or public land is usually a matter for{" "}
              {location.council}. If it is yours, or on your own property, we
              can quote it.
            </p>

            <h2 className="heading-xl mt-12 text-3xl text-ink sm:text-4xl">
              Pickup timing in {location.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {location.pickup} The trip from our depot is about{" "}
              {location.distanceKm} km, and we confirm the day and window when
              we send your quote.
            </p>

            <h2 className="heading-xl mt-12 text-3xl text-ink sm:text-4xl">
              {location.name} at a glance
            </h2>
            <dl className="mt-5 grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-2">
              {[
                ["Area", location.name],
                ["Council", location.council],
                ["Region", location.region],
                ["From our depot", `about ${location.distanceKm} km`],
                ["Pickup", extended ? "Booked in advance" : "Regular runs, often same-day"],
                ["Towing", "Free when we buy"],
                ["Quote", "Before we send a truck"],
                ["Payment", "Cash or bank transfer on collection"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-3 sm:odd:border-r"
                >
                  <dt className="text-sm text-slate-500">{k}</dt>
                  <dd className="text-right text-sm font-semibold text-slate-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="h-fit rounded-2xl border border-ink/10 bg-cream p-7 lg:sticky lg:top-28">
            <NapBlock />
            <Link
              href="/locations"
              className="mt-6 inline-block text-sm font-bold text-link"
            >
              All service areas →
            </Link>
          </aside>
        </Container>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="heading-xl text-3xl text-ink sm:text-4xl">
            Cash for cars {location.name}: your questions answered
          </h2>
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </section>

      {nearby.length > 0 && (
        <section className="bg-white py-14">
          <Container>
            <h2 className="heading-xl text-2xl text-ink">
              Nearby areas we service
            </h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {nearby.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={locationPath(l.slug)}
                    className="font-display inline-block rounded-xl border border-ink/20 bg-white px-4 py-2 text-base text-ink-soft transition-colors hover:border-sky-400 hover:bg-sky-50 hover:text-link"
                  >
                    Cash for cars {l.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <LastUpdated />
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        title={`Get cash for your car in ${location.name} today`}
        description={`Send your details or call ${site.phoneDisplay}. We quote before we send a truck, and towing is free.`}
      />
    </>
  );
}
