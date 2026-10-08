import path from "node:path";
import type { NextConfig } from "next";

const longCache = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [360, 640, 828, 1080, 1280, 1600, 1920],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  // 301s so that no URL of the old WordPress site returns a 404.
  // City pages (/cash-for-cars-<city>), /locations, /get-a-quote and /thanks keep their old URLs.
  async redirects() {
    const citySlugs = [
      "brisbane",
      "ipswich",
      "caboolture",
      "gold-coast",
      "logan",
      "moreton-bay",
      "redlands",
      "sunshine-coast",
      "toowoomba",
    ];

    return [
      // Old Jet Car Removal-branded contact URL (and the old /contact-us alias).
      { source: "/contact-us-jet-car-removal-brisbane", destination: "/contact", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      // Orphan landing page and test page from WordPress.
      { source: "/qld-2", destination: "/", permanent: true },
      { source: "/test", destination: "/", permanent: true },
      // Empty WordPress archives.
      { source: "/project", destination: "/", permanent: true },
      { source: "/project/:path*", destination: "/", permanent: true },
      { source: "/category/:path*", destination: "/", permanent: true },
      { source: "/author/:path*", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      // Short intermediate URLs used while this site was in development.
      ...citySlugs.map((slug) => ({
        source: `/locations/${slug}`,
        destination: `/cash-for-cars-${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
