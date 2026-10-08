import Image from "next/image";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";

const vehicles = [
  {
    name: "Cars",
    description: "Sedans, hatchbacks and wagons, any make or model",
    image: "/images/misc/vehicle-car.png",
  },
  {
    name: "SUVs & 4WDs",
    description: "Family SUVs and off-roaders, running or not",
    image: "/images/misc/vehicle-suv.png",
  },
  {
    name: "Utes",
    description: "Single cab, dual cab and work utes",
    image: "/images/misc/vehicle-ute.png",
  },
  {
    name: "Trucks",
    description: "Light commercial trucks",
    image: "/images/misc/vehicle-ute-2.png",
  },
  {
    name: "Vans",
    description: "Delivery vans and people movers",
    image: "/images/misc/vehicle-van.png",
  },
  {
    name: "Motorbikes",
    description: "Used, damaged or unwanted bikes",
    image: "/images/misc/vehicle-motorbike.png",
  },
];

export function VehiclesWeBuy() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What we buy"
          title="If it has wheels, we'll make an offer"
          description="Running, damaged, old, unregistered or scrap. Tell us what you have and we quote before we send a truck."
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {vehicles.map((v, i) => (
            <li
              key={v.name}
              data-tilt
              style={{ ["--d" as string]: `${i * 70}ms` }}
              className="reveal group overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all hover:-translate-y-1 hover:border-ink hover:shadow-[0_8px_0_0_var(--brand)]"
            >
              <div className="relative h-32 bg-white sm:h-40">
                <Image
                  src={v.image}
                  alt={`${v.name} we buy`}
                  fill
                  className="object-contain p-3"
                  sizes="(min-width: 640px) 33vw, 50vw"
                />
              </div>
              <div className="border-t border-ink/10 p-4 sm:p-5">
                <h3 className="heading-xl text-2xl text-ink sm:text-3xl">{v.name}</h3>
                <p className="mt-1 text-sm leading-snug text-zinc-600">{v.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
