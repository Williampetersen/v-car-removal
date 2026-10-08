"use client";

import { useEffect } from "react";

/**
 * One small script that powers the "live" feel site-wide, using event delegation:
 *  - scroll reveal for .reveal (below-the-fold only, so it never delays first paint)
 *  - [data-count] number counters
 *  - [data-tilt] cursor-reactive cards, [data-magnetic] buttons, [data-ripple] click ripple
 *  - [data-parallax] mouse parallax layers (children with [data-depth])
 *  - header shadow and scroll progress bar
 * Everything is skipped for users who prefer reduced motion; content stays visible without JS.
 */
export function Effects() {
  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const boot = () => {
      if (!cancelled) dispose = setup();
    };
    // Start after load and when the browser is idle, so it never competes with first paint.
    const schedule = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (typeof ric === "function") ric(boot, { timeout: 3000 });
      else window.setTimeout(boot, 1500);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      dispose?.();
    };
  }, []);

  return null;
}

function setup(): () => void {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    // ---------- scroll progress + header shadow ----------
    const bar = document.getElementById("scroll-progress");
    const header = document.querySelector<HTMLElement>("header[data-header]");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        if (bar) bar.style.transform = `scaleX(${p})`;
        if (header) header.dataset.scrolled = String(window.scrollY > 8);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    if (reduce) return () => cleanups.forEach((fn) => fn());

    // ---------- scroll reveal ----------
    document.documentElement.classList.add("fx");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.r = "show";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) return; // already on screen: leave visible
      el.dataset.r = el.dataset.reveal === "left" ? "hide-left" : "hide";
      io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    // ---------- number counters ----------
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const countIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          countIo.unobserve(el);
          const end = Number(el.dataset.count);
          const prefix = el.dataset.prefix ?? "";
          const start = performance.now();
          const dur = 1400;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = prefix + Math.round(end * eased).toLocaleString("en-AU");
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => {
      el.textContent = (el.dataset.prefix ?? "") + "0";
      countIo.observe(el);
    });
    cleanups.push(() => countIo.disconnect());

    // ---------- click ripple (works for touch too) ----------
    const onDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-ripple]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const dot = document.createElement("span");
      dot.className = "ripple-dot";
      dot.style.width = dot.style.height = `${size}px`;
      dot.style.left = `${e.clientX - rect.left - size / 2}px`;
      dot.style.top = `${e.clientY - rect.top - size / 2}px`;
      target.appendChild(dot);
      window.setTimeout(() => dot.remove(), 650);
    };
    document.addEventListener("pointerdown", onDown, { passive: true });
    cleanups.push(() => document.removeEventListener("pointerdown", onDown));

    if (!finePointer) return () => cleanups.forEach((fn) => fn());

    // ---------- tilt, magnetic, parallax (mouse only) ----------
    let raf = 0;
    let lastEvent: PointerEvent | null = null;
    const process = () => {
      raf = 0;
      const e = lastEvent;
      if (!e) return;
      const el = e.target as HTMLElement | null;

      const tilt = el?.closest<HTMLElement>("[data-tilt]");
      document.querySelectorAll<HTMLElement>("[data-tilting]").forEach((n) => {
        if (n !== tilt) {
          n.removeAttribute("data-tilting");
          n.style.removeProperty("--rx");
          n.style.removeProperty("--ry");
          n.style.removeProperty("--ty");
        }
      });
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.dataset.tilting = "true";
        tilt.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
        tilt.style.setProperty("--rx", `${(-py * 9).toFixed(2)}deg`);
        tilt.style.setProperty("--ty", "-6px");
      }

      const mag = el?.closest<HTMLElement>("[data-magnetic]");
      document.querySelectorAll<HTMLElement>("[data-magnetic][data-pulled]").forEach((n) => {
        if (n !== mag) {
          n.removeAttribute("data-pulled");
          n.style.transform = "";
        }
      });
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        mag.dataset.pulled = "true";
        mag.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      }

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((root) => {
        const r = root.getBoundingClientRect();
        if (e.clientY < r.top || e.clientY > r.bottom) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        root.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer) => {
          const d = Number(layer.dataset.depth);
          layer.style.transform = `translate3d(${(-px * d).toFixed(1)}px, ${(-py * d).toFixed(1)}px, 0)`;
        });
      });
    };
    const onMove = (e: PointerEvent) => {
      lastEvent = e;
      if (!raf) raf = requestAnimationFrame(process);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    const onLeave = () => {
      document.querySelectorAll<HTMLElement>("[data-tilting]").forEach((n) => {
        n.removeAttribute("data-tilting");
        n.style.removeProperty("--rx");
        n.style.removeProperty("--ry");
        n.style.removeProperty("--ty");
      });
    };
    document.addEventListener("pointerleave", onLeave);
    cleanups.push(() => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    });

    return () => cleanups.forEach((fn) => fn());
}
