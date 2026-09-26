export type Location = {
  slug: string;
  name: string;
  region: string;
  heroImage?: string;
};

export type Region = {
  slug: string;
  name: string;
  blurb: string;
  locations: Location[];
};

const galleryImages = [
  "/images/gallery/car-removal-hero.jpg",
  "/images/gallery/car-removal-1.jpg",
  "/images/gallery/car-removal-2.jpg",
  "/images/gallery/car-removal-3.jpg",
  "/images/gallery/car-removal-4.jpg",
  "/images/gallery/car-removal-5.jpg",
];

const areaSlugs = [
  "brisbane",
  "ipswich",
  "caboolture",
  "gold-coast",
  "logan",
  "moreton-bay",
  "redlands",
  "sunshine-coast",
  "toowoomba",
] as const;

const areaNames: Record<(typeof areaSlugs)[number], string> = {
  brisbane: "Brisbane",
  ipswich: "Ipswich",
  caboolture: "Caboolture",
  "gold-coast": "Gold Coast",
  logan: "Logan",
  "moreton-bay": "Moreton Bay",
  redlands: "Redlands",
  "sunshine-coast": "Sunshine Coast",
  toowoomba: "Toowoomba",
};

export const regions: Region[] = [
  {
    slug: "south-east-queensland",
    name: "Brisbane & South East Queensland",
    blurb:
      "Free car removal and top cash offers across Brisbane and the wider South East Queensland region.",
    locations: areaSlugs.map((slug, i) => ({
      slug,
      name: areaNames[slug],
      region: "South East Queensland",
      heroImage: galleryImages[i % galleryImages.length],
    })),
  },
];

export const allLocations: Location[] = regions.flatMap((r) => r.locations);

export function getLocationBySlug(slug: string) {
  return allLocations.find((l) => l.slug === slug);
}

export function getRegionByLocationSlug(slug: string) {
  return regions.find((region) =>
    region.locations.some((location) => location.slug === slug)
  );
}
