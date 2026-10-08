import Link from "next/link";
import { Service } from "@/lib/services";
import { ServiceIcons, ChevronRight } from "./Icons";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = ServiceIcons[service.icon];

  return (
    <Link
      prefetch={false}
      data-tilt
      href={`/services/${service.slug}`}
      className="reveal group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white p-7 transition-all hover:-translate-y-1 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/20"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100 text-sky-700 transition-colors group-hover:bg-sky-400 group-hover:text-slate-900">
        <Icon className="h-7 w-7" aria-hidden />
      </span>
      <h3 className="heading-xl mt-5 text-2xl text-ink">{service.name}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">
        {service.shortDescription}
      </p>
      <span className="font-display mt-6 inline-flex items-center gap-1 text-base text-link">
        Learn more
        <ChevronRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </span>
    </Link>
  );
}
