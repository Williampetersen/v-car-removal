"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PrimaryButton, CallButton } from "../Buttons";
import { CheckCircle2 } from "../Icons";
import { site } from "@/lib/site";

const easing = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easing } },
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
    <span className="relative my-1 flex h-[1.2em] w-full items-center overflow-hidden">
      {CONDITIONS.map((label, i) => (
        <motion.span
          key={label}
          className="absolute left-0 whitespace-nowrap rounded-lg bg-brand px-2 text-ink"
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

const points = ["Free same-day towing", "Cash paid on pickup", "Any make, any condition"];

function VehicleStage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[17rem] sm:mt-4 sm:max-w-xl lg:mt-0 lg:max-w-none">
      <motion.div
        aria-hidden
        className="absolute inset-[8%] rounded-full bg-brand/30 blur-3xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: easing }}
      />
      <div
        aria-hidden
        className="absolute inset-x-[6%] bottom-[10%] h-6 rounded-[50%] bg-black/50 blur-xl"
      />

      <motion.div
        className="absolute left-[-2%] top-[2%] w-[78%]"
        initial={{ opacity: 0, x: 120 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: easing, delay: 0.25 }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/misc/vehicle-suv.png"
            alt=""
            width={640}
            height={480}
            priority
            className="h-auto w-full drop-shadow-2xl"
            sizes="(min-width: 1024px) 480px, 80vw"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-[2%] right-[-2%] w-[72%]"
        initial={{ opacity: 0, x: 160 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: easing, delay: 0.45 }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/misc/vehicle-car.png"
            alt=""
            width={640}
            height={480}
            priority
            className="h-auto w-full drop-shadow-2xl"
            sizes="(min-width: 1024px) 450px, 72vw"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function HeroContent() {
  return (
    <div className="grid flex-1 grid-cols-1 items-center gap-2 py-4 sm:gap-6 sm:py-6 lg:grid-cols-2 lg:gap-10 lg:py-10">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.span
          variants={item}
          className="inline-flex items-center rounded-md bg-brand px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink"
        >
          Brisbane&apos;s Trusted Car Removal Team
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-balance mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.35)] sm:mt-5 sm:text-5xl lg:text-6xl"
        >
          <span className="block">Top Cash For Your</span>
          <RotatingCondition />
          <span className="block">Up To {site.cashOfferMax}!</span>
        </motion.h1>

        <motion.ul variants={item} className="mt-4 space-y-2 sm:mt-6 sm:space-y-2.5">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-center gap-2.5 text-base font-medium text-zinc-100"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" aria-hidden />
              {point}
            </li>
          ))}
        </motion.ul>

        <motion.div
          variants={item}
          className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row"
        >
          <PrimaryButton href="/contact">Get Your Free Quote</PrimaryButton>
          <CallButton />
        </motion.div>
      </motion.div>

      <VehicleStage />
    </div>
  );
}
