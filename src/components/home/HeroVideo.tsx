"use client";

import { useEffect, useRef, useState } from "react";

const sources = {
  desktop: "/video/hero-desktop.mp4",
  mobile: "/video/hero-mobile.mp4",
};

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/**
 * Full-bleed looping hero video. The poster is a real <img> so it paints immediately (and is the
 * LCP element); the <video> is mounted after hydration with a portrait cut on phones and a
 * landscape cut everywhere else. It is skipped for reduced-motion and Data Saver users.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    if (reduce || saveData) return;
    const mobile = window.matchMedia("(max-width: 767px)");
    const pick = () => setSrc(mobile.matches ? sources.mobile : sources.desktop);
    pick();
    mobile.addEventListener("change", pick);
    return () => mobile.removeEventListener("change", pick);
  }, []);

  // Autoplay needs the muted *property* (React only sets the attribute); retry on first touch
  // for browsers such as iOS in Low Power Mode that block the initial play().
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    video.muted = true;
    const play = () => void video.play().catch(() => {});
    play();
    window.addEventListener("touchstart", play, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", play);
  }, [src]);

  return (
    <>
      <picture>
        <source media="(min-width: 768px)" srcSet="/video/hero-desktop-poster.jpg" />
        <img
          src="/video/hero-mobile-poster.jpg"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {src && (
        <video
          ref={videoRef}
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </>
  );
}
