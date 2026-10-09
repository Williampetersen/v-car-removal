"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Faq } from "@/lib/faqs";
import { ChevronRight } from "./Icons";

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/8 rounded-xl border border-ink/8 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className={`transition-colors duration-300 ${isOpen ? "bg-brand/5" : ""}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span
                className={`font-display text-base font-bold transition-colors duration-300 sm:text-lg ${
                  isOpen ? "text-brand-dark" : "text-ink group-hover:text-brand-dark"
                }`}
              >
                {item.question}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-90 bg-brand text-ink" : "bg-zinc-100 text-ink-soft group-hover:bg-brand/15"
                }`}
              >
                <ChevronRight className="h-4 w-4" aria-hidden />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -8 }}
                    animate={{ y: 0 }}
                    exit={{ y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="px-6 pb-6 text-sm leading-relaxed text-zinc-600 sm:text-base"
                  >
                    {item.answer}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
