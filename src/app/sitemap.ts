import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { allLocations, locationPath } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  // Real content-review date, not the build time, so crawlers can trust lastModified.
  const lastModified = new Date(`${site.lastUpdated}T00:00:00+10:00`);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1, lastModified },
    { url: `${site.url}/get-a-quote`, changeFrequency: "monthly", priority: 0.9, lastModified },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.9, lastModified },
    { url: `${site.url}/locations`, changeFrequency: "monthly", priority: 0.9, lastModified },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.7, lastModified },
    { url: `${site.url}/faq`, changeFrequency: "monthly", priority: 0.7, lastModified },
    { url: `${site.url}/contact`, changeFrequency: "monthly", priority: 0.8, lastModified },
    { url: `${site.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.3, lastModified },
    { url: `${site.url}/terms`, changeFrequency: "yearly", priority: 0.3, lastModified },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified,
  }));

  const locationRoutes: MetadataRoute.Sitemap = allLocations.map((l) => ({
    url: `${site.url}${locationPath(l.slug)}`,
    changeFrequency: "monthly",
    priority: l.tier === "core" ? 0.8 : 0.7,
    lastModified,
  }));

  return [...staticRoutes, ...locationRoutes, ...serviceRoutes];
}
