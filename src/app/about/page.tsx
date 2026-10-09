import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import {
  ShieldCheck,
  Truck,
  Recycle,
  BadgeDollarSign,
  MapPin,
  PhoneCall,
  Clock,
  ArrowRight,
} from "@/components/Icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name}, your trusted local car removal and cash-for-cars service across Brisbane and South East Queensland.`,
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
      <PageHero
        eyebrow="About Us"
        title="Local car removal, done the right way"
        description="V Car Removal helps people across Brisbane and South East Queensland turn unwanted vehicles into cash, quickly and without hassle."
        image="/images/gallery/car-removal-1.jpg"
        imageAlt="Vehicle loaded on a V Car Removal tow truck"
      />

      <section className="py-12 sm:py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <SectionHeading
              eyebrow="Our Story"
              title="Making car removal simple and rewarding"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-600">
              <p>
                We specialise in fast, reliable and hassle-free car removal,
                with years of experience helping locals turn old, unwanted or
                damaged vehicles into top cash — up to {site.cashOfferMax}{" "}
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
                className="group rounded-xl border border-ink/8 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-ink/20 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand-dark ring-1 ring-brand/15 transition-all group-hover:scale-110 group-hover:bg-brand/20">
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
          <FadeIn className="group relative h-80 w-full overflow-hidden rounded-xl bg-ink shadow-xl shadow-ink/10 sm:h-96">
            <Image
              src="/images/gallery/car-removal-2.jpg"
              alt="V Car Removal tow truck loading a vehicle for removal"
              fill
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10"
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12">
              <span className="inline-flex w-fit items-center rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white ring-1 ring-white/20">
                On the job
              </span>
              <p className="font-display mt-4 max-w-md text-2xl font-bold leading-tight text-white sm:text-4xl">
                From your driveway to cash in hand, same day.
              </p>
              <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-white/15 pt-6">
                {[
                  { value: site.cashOfferMax, label: "Top cash offer" },
                  { value: "$0", label: "Towing cost" },
                  { value: "Same day", label: "Pickup available" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-xl font-bold text-white sm:text-2xl">
                      {stat.value}
                    </dd>
                    <dd className="mt-0.5 text-xs text-zinc-300">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-cream py-12 sm:py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading eyebrow="Visit Us" title="Our location" align="center" />
          </FadeIn>
          {site.depots.map((depot) => (
            <FadeIn
              key={depot.name}
              className="mx-auto mt-10 grid max-w-5xl grid-cols-1 overflow-hidden rounded-xl border border-ink/8 bg-white shadow-xl shadow-ink/5 lg:grid-cols-2"
            >
              <div className="flex flex-col justify-center gap-6 p-8 sm:p-10">
                <div className="relative h-10 w-28">
                  <Image
                    src={depot.logo}
                    alt={depot.name}
                    fill
                    className="object-contain object-left"
                    sizes="112px"
                  />
                </div>
                <ul className="space-y-4 text-sm text-zinc-600">
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
                      <MapPin className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="pt-2 font-semibold text-ink">{depot.address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
                      <PhoneCall className="h-4 w-4" aria-hidden />
                    </span>
                    <a href={site.phoneHref} className="pt-2 font-semibold text-ink hover:text-brand-dark">
                      {site.phoneDisplay}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-dark">
                      <Clock className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="pt-2">
                      {site.hours.map((h) => (
                        <span key={h.days} className="block">
                          <span className="font-semibold text-ink">{h.days}:</span> {h.time}
                        </span>
                      ))}
                    </span>
                  </li>
                </ul>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${depot.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
                >
                  Get directions
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
              </div>
              <div className="relative min-h-72 bg-zinc-100 lg:min-h-full">
                <iframe
                  title={`Map showing ${depot.name} at ${depot.address}`}
                  src={`https://www.google.com/maps?q=${depot.mapQuery}&output=embed`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeIn>
          ))}
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
