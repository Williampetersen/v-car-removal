"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../Container";
import { ShieldCheck, Clock, Truck, BadgeDollarSign } from "../Icons";

const easing = [0.22, 1, 0.36, 1] as const;

const badges = [
  { icon: Truck, label: "Free Same-Day Towing", hint: "We come to you" },
  { icon: BadgeDollarSign, label: "Cash On The Spot", hint: "Paid at pickup" },
  { icon: ShieldCheck, label: "Licensed & Insured", hint: "Fully compliant" },
  { icon: Clock, label: "7 Days A Week", hint: "Early to late" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const card = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easing },
  },
};

export function TrustBadges() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-cream py-12 sm:py-16">
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        >
          {badges.map(({ icon: Icon, label, hint }, index) => (
            <motion.div
              key={label}
              variants={card}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              transition={{ duration: 0.4, ease: easing }}
              className="group relative overflow-hidden rounded-xl bg-white p-5 text-center shadow-lg shadow-ink/10 ring-1 ring-ink/5 sm:p-7"
            >
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
              <motion.span
                className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-ink"
                animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.6,
                }}
              >
                {!reduceMotion && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-brand"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ scale: [1, 1.3, 1.45], opacity: [0, 0.35, 0] }}
                    transition={{
                      duration: 4,
                      times: [0, 0.35, 1],
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.6,
                    }}
                  />
                )}
                <Icon className="relative h-8 w-8" aria-hidden />
              </motion.span>
              <p className="font-display mt-4 text-sm font-bold leading-snug text-ink sm:text-base">
                {label}
              </p>
              <p className="mt-1 text-xs text-ink/60">{hint}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
