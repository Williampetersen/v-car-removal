import { site } from "./site";
import { allLocations, locationPath, type Location } from "./locations";
import type { Service } from "./services";
import type { Faq } from "./faqs";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function expandDayRange(days: string): string[] {
  const parts = days.split(/[–-]/).map((part) => part.trim().toLowerCase());
  const indexOf = (day: string) =>
    DAY_NAMES.findIndex((name) => name.toLowerCase() === day);

  if (parts.length === 1) {
    const index = indexOf(parts[0]);
    return index === -1 ? [] : [DAY_NAMES[index]];
  }

  const start = indexOf(parts[0]);
  const end = indexOf(parts[1]);
  if (start === -1 || end === -1) return [];

  const result: string[] = [];
  for (let i = start; ; i = (i + 1) % 7) {
    result.push(DAY_NAMES[i]);
    if (i === end) break;
  }
  return result;
}

function to24Hour(time: string): string | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  const [, hoursRaw, minutes, meridiem] = match;
  let hours = parseInt(hoursRaw, 10);
  if (/pm/i.test(meridiem) && hours !== 12) hours += 12;
  if (/am/i.test(meridiem) && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

function openingHoursSpecification() {
  return site.hours
    .filter((h) => !/closed/i.test(h.time))
    .flatMap((h) => {
      const [openRaw, closeRaw] = h.time.split(/[–-]/).map((t) => t.trim());
      const opens = to24Hour(openRaw);
      const closes = to24Hour(closeRaw);
      const dayOfWeek = expandDayRange(h.days);
      if (!opens || !closes || dayOfWeek.length === 0) return [];
      return [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek,
          opens,
          closes,
        },
      ];
    });
}

const orgId = `${site.url}/#organization`;

function areaServedList() {
  return allLocations.map((l) => ({
    "@type": "City",
    name: l.name,
    geo: {
      "@type": "GeoCoordinates",
      latitude: l.geo.latitude,
      longitude: l.geo.longitude,
    },
  }));
}

/** LocalBusiness (AutoWrecker) with the exact NAP used across the site. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoWrecker", "LocalBusiness"],
    "@id": orgId,
    name: site.name,
    url: site.url,
    image: `${site.url}/images/gallery/car-removal-hero.jpg`,
    logo: `${site.url}/images/logo/logo.png`,
    description: site.description,
    telephone: site.phoneE164,
    email: site.email,
    priceRange: "$$",
    currenciesAccepted: "AUD",
    paymentAccepted: "Cash, Bank transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.suburb,
      addressRegion: site.address.state,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.depots[0].mapQuery}`,
    areaServed: areaServedList(),
    openingHoursSpecification: openingHoursSpecification(),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneE164,
      email: site.email,
      contactType: "customer service",
      areaServed: "AU-QLD",
      availableLanguage: "English",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "en-AU",
    publisher: { "@id": orgId },
  };
}

/** WebPage node with a last-modified date, linked to the site and business. */
export function webPageSchema(opts: {
  path: string;
  name: string;
  description: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${site.url}${opts.path}#webpage`,
    url: `${site.url}${opts.path}`,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-AU",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": orgId },
    dateModified: site.lastUpdated,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["aside[aria-label]", "h1"],
    },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: `${service.name} | ${site.name}`,
    description: service.description,
    url: `${site.url}/services/${service.slug}`,
    areaServed: areaServedList(),
    provider: { "@id": orgId },
  };
}

export function locationSchema(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${locationPath(location.slug)}#service`,
    serviceType: "Cash for cars and free car removal",
    name: `Cash For Cars ${location.name} | ${site.name}`,
    description: `Free car removal and cash offers in ${location.name}, ${location.council} area. ${location.pickup}`,
    url: `${site.url}${locationPath(location.slug)}`,
    areaServed: [
      {
        "@type": "City",
        name: location.name,
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.geo.latitude,
          longitude: location.geo.longitude,
        },
        containedInPlace: [
          { "@type": "AdministrativeArea", name: location.council },
          {
            "@type": "AdministrativeArea",
            name: location.state === "NSW" ? "New South Wales" : "Queensland",
          },
        ],
      },
      ...location.suburbs.slice(0, 8).map((name) => ({
        "@type": "Place",
        name,
      })),
    ],
    provider: { "@id": orgId },
    offers: {
      "@type": "Offer",
      description: "Free towing when we buy the vehicle. Price quoted before pickup.",
      priceCurrency: "AUD",
    },
  };
}

/** ItemList of every service area, for the locations hub. */
export function areaListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} service areas`,
    itemListElement: allLocations.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Cash for cars ${l.name}`,
      url: `${site.url}${locationPath(l.slug)}`,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
