"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "./Icons";

// Five stars that fill smoothly up to the given rating (e.g. 4.8 fills 96%).
export function RatingStars({
  rating,
  className = "h-6 w-6",
}: {
  rating: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));
  const row = (tone: string) => (
    <span className={`flex w-max gap-1 ${tone}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={`${className} shrink-0 fill-current`} />
      ))}
    </span>
  );

  return (
    <span
      className="relative inline-flex"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {row("text-ink/15")}
      <motion.span
        aria-hidden
        className="absolute inset-y-0 left-0 overflow-hidden"
        initial={{ width: reduceMotion ? `${percent}%` : "0%" }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {row("text-brand")}
      </motion.span>
    </span>
  );
}
