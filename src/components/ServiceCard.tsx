import Link from "next/link";
import { Service } from "@/lib/services";
import { ServiceIcons, ChevronRight } from "./Icons";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = ServiceIcons[service.icon];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white p-4 shadow-md shadow-ink/5 ring-1 ring-ink/8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink/15 hover:ring-brand sm:p-7"
    >
      <span
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-brand/25 to-sky-400/10 blur-2xl transition-all duration-700 group-hover:scale-125 group-hover:from-brand/40"
        aria-hidden
      />

      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/30 to-brand/5 p-[5px] ring-1 ring-brand/30 transition-all duration-500 group-hover:ring-brand sm:h-[4.5rem] sm:w-[4.5rem]">
        <span className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-[#1d4f91] to-ink text-brand shadow-lg shadow-ink/30 transition-all duration-500 ease-out group-hover:from-brand group-hover:to-brand group-hover:text-ink">
          <Icon
            className="h-6 w-6 stroke-[1.8] transition-transform duration-500 group-hover:scale-110 sm:h-8 sm:w-8"
            aria-hidden
          />
        </span>
      </span>

      <h3 className="font-display relative mt-4 text-base font-bold leading-snug text-ink sm:mt-6 sm:text-xl">
        {service.name}
      </h3>
      <p className="relative mt-1.5 line-clamp-3 flex-1 text-xs leading-relaxed text-ink/70 sm:mt-2 sm:line-clamp-none sm:text-sm">
        {service.shortDescription}
      </p>
      <span className="relative mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark sm:mt-5 sm:text-sm">
        Learn more
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/30 transition-all duration-500 group-hover:translate-x-1 group-hover:bg-brand sm:h-6 sm:w-6">
          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
        </span>
      </span>
    </Link>
  );
}
