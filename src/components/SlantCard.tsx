"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1] as const;

export function SlantCard({
  icon,
  image,
  imageAlt = "",
  title,
  description,
  step,
  tone = "brand",
}: {
  icon?: ReactNode;
  image?: string;
  imageAlt?: string;
  title: string;
  description: string;
  step?: string;
  tone?: "brand" | "blue";
}) {
  const reduceMotion = useReducedMotion();
  const blue = tone === "blue";

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ duration: 0.3, ease: easing }}
      className="group relative h-full overflow-hidden rounded-xl bg-white shadow-lg shadow-ink/10 ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-ink/20"
    >
      <div
        className={`relative flex h-28 items-center justify-center overflow-hidden [clip-path:polygon(0_0,100%_0,100%_82%,0_100%)] sm:h-40 ${
          blue ? "bg-sky text-white" : "bg-brand text-ink"
        }`}
      >
        {image && (
          <>
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent"
            />
          </>
        )}
        <motion.span
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 ${
            blue ? "bg-white/20" : "bg-white/35"
          }`}
          initial={{ x: "-100%" }}
          whileInView={reduceMotion ? undefined : { x: "420%" }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
        />
        {step && (
          <span
            aria-hidden
            className={`font-display absolute right-3 top-2 text-3xl font-bold sm:right-4 sm:top-3 sm:text-5xl ${
              image ? "text-white drop-shadow-lg" : "opacity-20"
            }`}
          >
            {step}
          </span>
        )}
        {icon && !image && (
          <motion.span
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg sm:h-20 sm:w-20"
            initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: easing }}
          >
            <motion.span
              className="flex"
              animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {icon}
            </motion.span>
          </motion.span>
        )}
      </div>

      <div className="px-4 pb-5 pt-2 sm:px-6 sm:pb-8 sm:pt-3">
        <h3 className="font-display text-base font-bold leading-snug text-ink sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-ink/70 sm:mt-3 sm:text-sm">
          {description}
        </p>
      </div>

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <rect
          x="1.5"
          y="1.5"
          rx="10"
          ry="10"
          pathLength={1}
          style={{ width: "calc(100% - 3px)", height: "calc(100% - 3px)" }}
          className="fill-none stroke-brand stroke-[3] [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-700 ease-out group-hover:[stroke-dashoffset:0]"
        />
      </svg>
    </motion.article>
  );
}
