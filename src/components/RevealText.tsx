"use client";

import { useEffect, useRef, useState } from "react";

// Headline whose words glide up one after another when scrolled into view.
// It renders fully visible first, so the text never disappears if scripts
// fail or the user is already looking at it.
export function RevealText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<"visible" | "hidden" | "shown">("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom"
        >
          <span
            style={{ transitionDelay: state === "shown" ? `${i * 90}ms` : "0ms" }}
            className={`inline-block transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              state === "hidden" ? "translate-y-[110%] opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
