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
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="All Vehicle Types"
            title="We buy all types of vehicles"
            description="Cars, SUVs, utes, trucks, vans and motorbikes — running, damaged, old or scrap."
            align="center"
          />
        </FadeIn>
        <Stagger className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3">
          {vehicles.map((vehicle) => (
            <StaggerItem
              key={vehicle.name}
              className="group relative overflow-hidden rounded-3xl border border-ink/8 bg-zinc-50 p-5 text-center transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
            >
              <div
                className="pointer-events-none absolute left-1/2 top-6 -z-10 h-24 w-24 -translate-x-1/2 rounded-full bg-brand/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <div className="relative mx-auto h-20 w-full">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
              <h3 className="font-display mt-4 text-sm font-bold text-ink">
                {vehicle.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {vehicle.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
