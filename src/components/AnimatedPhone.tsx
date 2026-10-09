"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhoneCall } from "./Icons";

// Gentle ringing phone: a slow, small wiggle followed by two soft rings that
// fade in and out (never snapping back), repeating on a ~4s cycle.
export function AnimatedPhone({
  className = "h-5 w-5",
  ringClassName = "bg-brand/40",
}: {
  className?: string;
  ringClassName?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="relative inline-flex items-center justify-center">
      {!reduceMotion &&
        [0, 1].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className={`pointer-events-none absolute -inset-1 rounded-full ${ringClassName}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ scale: [0.9, 1.6, 2.1], opacity: [0, 0.5, 0] }}
            transition={{
              duration: 1.8,
              times: [0, 0.3, 1],
              repeat: Infinity,
              repeatDelay: 2,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      <motion.span
        className="relative flex"
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: [0, -14, 12, -9, 6, -3, 0],
                scale: [1, 1.1, 1.1, 1.06, 1.06, 1.02, 1],
              }
        }
        transition={{
          duration: 1.6,
          repeat: Infinity,
          repeatDelay: 2.2,
          ease: "easeInOut",
        }}
      >
        <PhoneCall className={className} aria-hidden />
      </motion.span>
    </span>
  );
}
