import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    const locationSlugs = [
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
      ...locationSlugs.map((slug) => ({
        source: `/cash-for-cars-${slug}`,
        destination: `/locations/${slug}`,
        permanent: true,
      })),
      {
        source: "/get-a-quote",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us-jet-car-removal-brisbane",
        destination: "/contact",
        permanent: true,
      },
      {
        // Old post-submit "thank you" page from the WordPress quote form.
        source: "/thanks",
        destination: "/contact",
        permanent: true,
      },
      {
        // Old WordPress QLD locations overview page.
        source: "/qld-2",
        destination: "/locations",
        permanent: true,
      },
      {
        // Stray leftover test page from the old site.
        source: "/test",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
