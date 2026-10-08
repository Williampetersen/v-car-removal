import path from "node:path";
import type { NextConfig } from "next";

const longCache = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  poweredByHeader: false,
  experimental: {
    // Inline critical CSS to remove the render-blocking stylesheet request.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    qualities: [50, 75],
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
      { source: "/contact-us-jet-car-removal-brisbane", destination: "/contact", statusCode: 301 },
      { source: "/contact-us", destination: "/contact", statusCode: 301 },
      // Orphan landing page and test page from WordPress.
      { source: "/qld-2", destination: "/", statusCode: 301 },
      { source: "/test", destination: "/", statusCode: 301 },
      // Empty WordPress archives.
      { source: "/project", destination: "/", statusCode: 301 },
      { source: "/project/:path*", destination: "/", statusCode: 301 },
      { source: "/category/:path*", destination: "/", statusCode: 301 },
      { source: "/author/:path*", destination: "/", statusCode: 301 },
      { source: "/feed", destination: "/", statusCode: 301 },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", statusCode: 301 },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", statusCode: 301 },
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", statusCode: 301 },
      // Short intermediate URLs used while this site was in development.
      ...citySlugs.map((slug) => ({
        source: `/locations/${slug}`,
        destination: `/cash-for-cars-${slug}`,
        statusCode: 301,
      })),
    ];
  },
};

export default nextConfig;
