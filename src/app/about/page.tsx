import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { ShieldCheck, Truck, Recycle, BadgeDollarSign, MapPin } from "@/components/Icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { LastUpdated } from "@/components/LastUpdated";
import { NapBlock } from "@/components/NapBlock";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About V Car Removal Brisbane | Local Car Buyers & Removal",
  description: `${site.name} buys cars for cash and removes them free from our Sherwood depot, serving Brisbane and South East Queensland. Hours, address and how we work.`,
  alternates: {
    canonical: `${site.url}/about`,
  },
};

const values = [
  {
    icon: BadgeDollarSign,
    title: "Top Cash Offers",
    description:
      "We offer competitive prices for scrap, damaged or unwanted cars, based on an honest read of make, model and condition.",
  },
  {
    icon: Truck,
    title: "Fast, Free Removal",
    description:
      "Free towing across our whole service area, with same-day pickup available in most cases.",
  },
  {
    icon: Recycle,
    title: "Environmentally Friendly",
    description:
      "We recycle and dispose of vehicles responsibly, minimising the impact on the local environment.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Service",
    description:
      "No lengthy paperwork and no delays — just prompt service and instant payment on the spot.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/about",
          name: "About V Car Removal Brisbane",
          description: `About ${site.name}.`,
          type: "AboutPage",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow="About Us"
        title="About V Car Removal Brisbane"
        description="V Car Removal Brisbane helps people across Brisbane and South East Queensland turn unwanted vehicles into cash, quickly and without hassle."
      />

      <section className="py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <SectionHeading
              eyebrow="Our Story"
              title="Making car removal simple and rewarding"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-600">
              <p>
                We specialise in fast, reliable and hassle-free car removal,
                helping locals turn old, unwanted or
                damaged vehicles into cash — up to {site.cashOfferMax}{" "}
                depending on your vehicle.
              </p>
              <p>
                We accept all vehicle types, including cars, utes, vans,
                motorbikes, light trucks, SUVs and 4x4s, regardless of
                condition. Whether your car is running, damaged, old or
                simply unwanted, our goal is to make selling it straightforward
                and worthwhile.
              </p>
              <p>
                Every vehicle we take off your hands is recycled and disposed
                of responsibly, so you get a fair price while minimising the
                impact on the environment.
              </p>
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <StaggerItem
                key={title}
                className="rounded-3xl border border-ink/8 bg-zinc-50 p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-brand">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-display mt-4 text-base font-bold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <FadeIn className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
            <Image
              src="/images/gallery/car-removal-2.jpg"
              alt="V Car Removal tow truck loading a vehicle for removal"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </FadeIn>
        </Container>
      </section>

      <section className="bg-zinc-50 py-20 sm:py-28">
        <Container>
          <FadeIn>
            <SectionHeading eyebrow="Visit Us" title="Our location" align="center" />
          </FadeIn>
          <Stagger className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-6">
            {site.depots.map((depot) => (
              <StaggerItem
                key={depot.name}
                className="rounded-3xl border border-ink/8 bg-white p-7 text-center"
              >
                <div className="relative mx-auto h-11 w-28">
                  <Image
                    src={depot.logo}
                    alt={depot.name}
                    fill
                    className="object-contain"
                    sizes="112px"
                  />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-ink">
                  {depot.name}
                </h3>
                <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-zinc-600">
                  <MapPin className="h-4 w-4 shrink-0 text-brand-dark" aria-hidden />
                  {depot.address}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="pb-10">
        <Container className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="rounded-3xl border border-ink/8 bg-zinc-50 p-7">
            <NapBlock />
          </div>
          <div className="flex items-end">
            <LastUpdated />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
