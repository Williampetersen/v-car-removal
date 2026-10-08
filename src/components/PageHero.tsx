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
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-sky-200/60 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl"
        aria-hidden
      />
      <Container
        className={`relative py-14 sm:py-20 ${
          image || aside ? "grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.25fr_1fr]" : ""
        }`}
      >
        <div>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-slate-500">
              <ol className="flex flex-wrap items-center gap-2">
                {crumbs.map((c, i) => (
                  <li key={c.name} className="flex items-center gap-2">
                    {c.href ? (
                      <Link href={c.href} className="hover:text-link">
                        {c.name}
                      </Link>
                    ) : (
                      <span className="text-slate-800">{c.name}</span>
                    )}
                    {i < crumbs.length - 1 && <span aria-hidden>/</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && (
            <p className="font-display inline-flex items-center gap-2 text-sm text-link">
              <span aria-hidden className="h-0.5 w-8 bg-sky-500" />
              {eyebrow}
            </p>
          )}
          <h1 className="heading-xl mt-3 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              {description}
            </p>
          )}
          {children}
        </div>

        {aside && <div>{aside}</div>}

        {image && (
          <div className="relative mx-auto hidden aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-sky-900/10 lg:block">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="448px"
              priority
            />
          </div>
        )}
      </Container>
      <div className="stripe" aria-hidden />
    </section>
  );
}
