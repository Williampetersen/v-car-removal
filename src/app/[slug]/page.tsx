import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { PrimaryButton, CallButton } from "@/components/Buttons";
import { CtaBand } from "@/components/CtaBand";
import { ServiceCard } from "@/components/ServiceCard";
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
import { services } from "@/lib/services";
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
  return {
    title: `Cash For Cars ${name} | Free Car Removal & Instant Quote`,
    description: `Sell your car for cash in ${name}. Free towing, quote before pickup, any make or condition. Serving ${suburbs
      .slice(0, 4)
      .join(", ")} and more. Call ${site.phoneDisplay}.`,
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

const steps = [
  {
    title: "Tell us about your car",
    text: "Call or send the quote form with the make, model, year and your suburb.",
  },
  {
    title: "Get your cash offer",
    text: "We reply with a price before sending a truck. The quoted price is what you receive.",
  },
  {
    title: "We tow it for free",
    text: "Pick a time that suits you. We come to your address and handle the pickup.",
  },
  {
    title: "Get paid",
    text: "Payment is made when we collect the vehicle, in cash or by bank transfer.",
  },
];

export default async function CityPage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const location = resolve(slug);
  if (!location) notFound();

  const path = locationPath(location.slug);
  const { title, description } = metaFor(location.name, location.suburbs);
  const faqs = cityFaqs(location.name, location.faqs);
  const nearby = location.nearby
    .map((s) => getLocationBySlug(s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));
  const featuredServices = services.slice(0, 3);

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
        image={location.heroImage}
        imageAlt={`${site.name} tow truck collecting a car in ${location.name}`}
      >
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <PrimaryButton href="#quote">Get Your Free Quote</PrimaryButton>
          <CallButton variant="onLight" />
        </div>
      </PageHero>

      <section className="pb-12">
        <Container className="max-w-4xl">
          <QuickAnswer title={`Selling a car in ${location.name}: the short answer`}>
            <p>
              <strong>{site.name}</strong> buys cars, SUVs, utes, vans, light
              trucks and motorbikes in {location.name} in any condition and
              tows them away for free. We pay up to {site.cashOfferMax}{" "}
              depending on the vehicle, give you the price before we send a
              truck and pay you when we collect, in cash or by bank transfer.
            </p>
            <p>
              We cover {location.name} and nearby suburbs, working from our
              depot at {site.address.street}, {site.address.suburb}{" "}
              {site.address.state} {site.address.postcode} (about{" "}
              {location.distanceKm} km away). Call{" "}
              <a href={site.phoneHref} className="font-bold underline">
                {site.phoneDisplay}
              </a>{" "}
              or send the form below.
            </p>
          </QuickAnswer>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Car removal in {location.name}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-zinc-700">
              {location.about.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              <p>{location.access}</p>
            </div>

            <h2 className="font-display mt-12 text-2xl font-bold text-ink sm:text-3xl">
              Suburbs we collect from in {location.name}
            </h2>
            <p className="mt-3 text-base text-zinc-700">
              We regularly collect from the {location.council} area, including:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {location.suburbs.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-ink/10 bg-zinc-50 px-3.5 py-1.5 text-sm font-medium text-ink-soft"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-zinc-500">
              Not on the list? Call {site.phoneDisplay} and we will confirm
              whether we can collect from your address.
            </p>
          </div>

          <aside className="h-fit rounded-3xl border border-ink/8 bg-zinc-50 p-7 lg:sticky lg:top-28">
            <NapBlock />
            <Link
              href="/locations"
              className="mt-6 inline-block text-sm font-bold text-brand-dark"
            >
              All service areas →
            </Link>
          </aside>
        </Container>
      </section>

      <section className="bg-zinc-50 py-14 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            How selling your car in {location.name} works
          </h2>
          <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-3xl border border-ink/8 bg-white p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-bold text-brand">
                  {i + 1}
                </span>
                <h3 className="font-display mt-4 text-base font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Services available in {location.name}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50 py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Cash for cars {location.name}: your questions answered
          </h2>
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </section>

      {nearby.length > 0 && (
        <section className="py-14">
          <Container>
            <h2 className="font-display text-xl font-bold text-ink">
              Nearby areas we service
            </h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {nearby.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={locationPath(l.slug)}
                    className="inline-block rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-brand hover:text-ink"
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
