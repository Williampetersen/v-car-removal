import { ReactNode } from "react";
import Image from "next/image";
import { Container } from "./Container";
import { FadeIn } from "./motion/FadeIn";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  image,
  imageAlt = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl"
        aria-hidden
      />
      <Container
        className={`relative ${image ? "grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10" : ""}`}
      >
        <FadeIn>
          {eyebrow && (
            <span className="inline-flex items-center rounded-full bg-brand/15 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-soft sm:px-4 sm:py-1.5 sm:text-xs">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-balance mt-4 max-w-3xl text-3xl font-bold leading-tight text-ink sm:mt-5 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:mt-5 sm:text-lg">
              {description}
            </p>
          )}
          {children}
        </FadeIn>

        {image && (
          <div className="relative mx-auto w-full max-w-xl lg:max-w-md">
            <div
              className="absolute inset-0 hidden translate-x-4 translate-y-4 rounded-xl bg-brand/25 lg:block"
              aria-hidden
            />
            <div className="group relative aspect-[16/9] overflow-hidden rounded-lg bg-cream shadow-xl shadow-ink/15 ring-1 ring-ink/5 lg:aspect-[4/3] lg:rounded-xl lg:shadow-2xl">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 448px, (min-width: 640px) 576px, 100vw"
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
