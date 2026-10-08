import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  image,
  imageAlt = "",
  crumbs,
  aside,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
  crumbs?: { name: string; href?: string }[];
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/25 blur-[100px]"
        aria-hidden
      />
      <Container
        className={`relative py-14 sm:py-20 ${
          image || aside ? "grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.25fr_1fr]" : ""
        }`}
      >
        <div>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-zinc-400">
              <ol className="flex flex-wrap items-center gap-2">
                {crumbs.map((c, i) => (
                  <li key={c.name} className="flex items-center gap-2">
                    {c.href ? (
                      <Link href={c.href} className="hover:text-white">
                        {c.name}
                      </Link>
                    ) : (
                      <span className="text-zinc-200">{c.name}</span>
                    )}
                    {i < crumbs.length - 1 && <span aria-hidden>/</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && (
            <p className="font-display inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-brand">
              <span aria-hidden className="h-0.5 w-8 bg-brand" />
              {eyebrow}
            </p>
          )}
          <h1 className="heading-xl mt-3 max-w-3xl text-5xl sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-300">
              {description}
            </p>
          )}
          {children}
        </div>

        {aside && <div>{aside}</div>}

        {image && (
          <div className="relative mx-auto hidden aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 lg:block">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="448px"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-brand" aria-hidden />
          </div>
        )}
      </Container>
      <div className="stripe" aria-hidden />
    </section>
  );
}
