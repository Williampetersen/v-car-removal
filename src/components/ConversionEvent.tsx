"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires once on the thank-you page: a GA4 `generate_lead` event, an optional Google Ads
 * conversion (NEXT_PUBLIC_GADS_ID + NEXT_PUBLIC_GADS_CONVERSION_LABEL) and a Meta Pixel Lead.
 * Each part is skipped when its tag is not loaded.
 */
export function ConversionEvent() {
  useEffect(() => {
    const adsId = process.env.NEXT_PUBLIC_GADS_ID;
    const label = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
    window.gtag?.("event", "generate_lead", { currency: "AUD", value: 1 });
    if (adsId && label) {
      window.gtag?.("config", adsId);
      window.gtag?.("event", "conversion", { send_to: `${adsId}/${label}` });
    }
    window.fbq?.("track", "Lead");
  }, []);
  return null;
}
