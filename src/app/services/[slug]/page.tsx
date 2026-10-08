import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PrimaryButton, CallButton } from "@/components/Buttons";
import { ServiceCard } from "@/components/ServiceCard";
import { CheckCircle2, ServiceIcons } from "@/components/Icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/JsonLd";
import { LastUpdated } from "@/components/LastUpdated";
import { services, getServiceBySlug } from "@/lib/services";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} Brisbane | Free Pickup, Any Condition`,
    description: `${service.shortDescription} Free towing across ${site.areasSummary.split(",").slice(0, 4).join(",")} and more. Call ${site.phoneDisplay}.`.slice(0, 160),
    alternates: {
      canonical: `${site.url}/services/${slug}`,
    },
    openGraph: {
      title: `${service.name} Brisbane`,
      description: service.shortDescription,
      url: `${site.url}/services/${slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">
) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = ServiceIcons[service.icon];
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <PageHero
        eyebrow="Service"
        title={service.name}
        description={service.description}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton href="#quote">Get a free quote</PrimaryButton>
          <CallButton />
        </div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink text-brand">
              <Icon className="h-7 w-7" aria-hidden />
            </span>
            <h2 className="heading-xl mt-6 text-3xl text-ink">
              What&apos;s included
            </h2>
            <ul className="mt-6 space-y-4">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cash-dark" aria-hidden />
                  <span className="text-base leading-relaxed text-slate-700">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base leading-relaxed text-slate-600">
              {service.name} is available across {site.areasSummary}.{" "}
              <Link
                href="/locations"
                className="font-semibold text-link hover:underline"
              >
                See all service areas →
              </Link>
            </p>
          </FadeIn>

          <aside className="rounded-2xl border border-ink/10 bg-cream p-7 lg:sticky lg:top-28 lg:h-fit">
            <h3 className="heading-xl text-2xl text-ink">
              Explore other services
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-brand hover:text-ink"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <Container>
          <FadeIn>
            <h2 className="heading-xl text-3xl text-ink">
              Other services you might need
            </h2>
          </FadeIn>
          <Stagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <StaggerItem key={s.slug} className="h-full">
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <LastUpdated />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
