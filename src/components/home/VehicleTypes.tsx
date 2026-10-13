import Image from "next/image";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { FadeIn } from "../motion/FadeIn";
import { Stagger, StaggerItem } from "../motion/Stagger";

const vehicles = [
  {
    name: "Cars",
    description: "Sedans, hatchbacks and coupes, any make or model",
    image: "/images/misc/vehicle-car.png",
  },
  {
    name: "SUVs & 4WDs",
    description: "All SUV and 4WD brands, running or not",
    image: "/images/misc/vehicle-suv.png",
  },
  {
    name: "Utes",
    description: "Single cab, dual cab and all work utes",
    image: "/images/misc/vehicle-ute.png",
  },
  {
    name: "Trucks",
    description: "Light and commercial trucks of any size",
    image: "/images/misc/vehicle-ute-2.png",
  },
  {
    name: "Vans & Minibuses",
    description: "Delivery vans, minibuses and commercial transport vans",
    image: "/images/misc/vehicle-van.png",
  },
  {
    name: "Motorbikes",
    description: "Used, damaged, unregistered or unwanted bikes",
    image: "/images/misc/vehicle-motorbike.png",
  },
];

export function VehicleTypes() {
  return (
    <section className="bg-white py-12 sm:py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="All Vehicle Types"
            title="We buy all types of vehicles"
            description="Cars, SUVs, utes, trucks, vans and motorbikes — running, damaged, old or scrap."
            align="center"
          />
        </FadeIn>
        <Stagger className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-6">
          {vehicles.map((vehicle) => (
            <StaggerItem
              key={vehicle.name}
              className="group relative overflow-hidden rounded-2xl bg-white text-center shadow-md shadow-ink/5 ring-1 ring-ink/8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink/15 hover:ring-brand"
            >
              <div className="relative bg-gradient-to-b from-sky-50 via-sky-50/60 to-white px-4 pb-2 pt-6 sm:pt-8">
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-40 -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand/0 blur-2xl transition-colors duration-500 group-hover:bg-brand/30"
                  aria-hidden
                />
                <div className="relative mx-auto h-24 w-full sm:h-32">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-contain drop-shadow-[0_10px_8px_rgba(15,40,80,0.22)] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1"
                    sizes="(min-width: 640px) 260px, 45vw"
                  />
                </div>
                <div
                  className="mx-auto mt-1 h-2 w-3/5 rounded-[50%] bg-ink/10 blur-md transition-all duration-500 group-hover:w-2/3 group-hover:bg-ink/15"
                  aria-hidden
                />
              </div>
              <div className="px-4 pb-5 pt-3 sm:pb-6">
                <h3 className="font-display text-base font-bold text-ink sm:text-lg">
                  {vehicle.name}
                </h3>
                <span
                  className="mx-auto mt-2 block h-1 w-8 rounded-full bg-brand transition-all duration-500 group-hover:w-14"
                  aria-hidden
                />
                <p className="mt-2.5 text-xs leading-relaxed text-ink/65 sm:text-sm">
                  {vehicle.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
