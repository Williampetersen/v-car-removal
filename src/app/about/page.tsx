import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { ShieldCheck, Truck, Recycle, BadgeDollarSign } from "@/components/Icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { LastUpdated } from "@/components/LastUpdated";
import { VisitUs } from "@/components/home/VisitUs";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us | Local Car Buyers & Removal",
  description: `${site.name} buys cars for cash and removes them free from our Sherwood depot across Brisbane and South East QLD. Hours, address, how we work.`,
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
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
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
                className="rounded-2xl border border-ink/10 bg-cream p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-brand">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="heading-xl mt-4 text-xl text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <VisitUs />

      <section className="bg-white pb-10">
        <Container>
          <LastUpdated />
        </Container>
      </section>


      <CtaBand />
    </>
  );
}
