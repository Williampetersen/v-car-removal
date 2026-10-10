import Link from "next/link";
import { Service } from "@/lib/services";
import { ServiceIcons, ChevronRight } from "./Icons";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = ServiceIcons[service.icon];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white p-6 shadow-md shadow-ink/5 ring-1 ring-ink/8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink/15 hover:ring-brand sm:p-7"
    >
      <Icon
        className="pointer-events-none absolute -right-6 -top-6 h-36 w-36 rotate-12 stroke-[1.2] text-brand/15 transition-all duration-700 ease-out group-hover:-rotate-6 group-hover:scale-110 group-hover:text-brand/30"
        aria-hidden
      />

      <span className="relative flex h-16 w-16 items-center justify-center">
        <span
          className="absolute inset-0 rotate-6 rounded-xl bg-brand/40 transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-105"
          aria-hidden
        />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-ink text-brand shadow-lg shadow-ink/25 transition-all duration-500 ease-out group-hover:-rotate-3 group-hover:bg-brand group-hover:text-ink">
          <Icon className="h-8 w-8 stroke-[1.7]" aria-hidden />
        </span>
      </span>

      <h3 className="font-display relative mt-6 text-xl font-bold text-ink">
        {service.name}
      </h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-ink/70">
        {service.shortDescription}
      </p>
      <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-dark">
        Learn more
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/30 transition-all duration-500 group-hover:translate-x-1 group-hover:bg-brand">
          <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      </span>
    </Link>
  );
}
