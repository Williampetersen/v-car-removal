"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PrimaryButton } from "../Buttons";
import { site } from "@/lib/site";

const easing = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
};

// Rotates through the vehicle conditions we accept — reinforces the "any
// condition" claim instead of just decorating the headline.
const CONDITIONS = ["Old Car", "Damaged Car", "Unwanted Car", "Written-Off Car", "Scrap Car"];

function RotatingCondition() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % CONDITIONS.length);
    }, 2200);
    return () => clearTimeout(id);
  }, [index]);

  return (
    <span className="relative flex h-[1.2em] w-full items-center justify-center overflow-hidden">
      {CONDITIONS.map((label, i) => (
        <motion.span
          key={label}
          className="absolute whitespace-nowrap rounded-lg bg-brand px-1.5 text-ink"
          initial={{ y: "100%", opacity: 0 }}
          animate={
            index === i
              ? { y: "0%", opacity: 1 }
              : { y: index > i ? "-120%" : "120%", opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 55, damping: 14 }}
        >
          {label}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-1 flex-col items-center justify-between text-center"
    >
      <div className="flex flex-col items-center">
        <motion.span
          variants={item}
          className="inline-flex items-center rounded-full bg-white/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-soft shadow-sm"
        >
          Brisbane&apos;s Trusted Car Removal Team
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-balance mt-3 max-w-xl text-2xl font-extrabold leading-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.35)] sm:text-3xl lg:text-4xl"
        >
          <span className="block">Top Cash For Your</span>
          <RotatingCondition />
          <span className="mt-1 block">Up To {site.cashOfferMax}!</span>
        </motion.h1>
      </div>

      <motion.div variants={item}>
        <PrimaryButton href="/contact">Get Your Free Quote</PrimaryButton>
      </motion.div>
    </motion.div>
  );
}
