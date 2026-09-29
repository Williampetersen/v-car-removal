export type Location = {
  slug: string;
  name: string;
  region: string;
  heroImage?: string;
  suburbs: string[];
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

// Real suburb names within (or immediately around) each service area. Used to
// give every location page unique, locally-specific content instead of a
// templated paragraph with only the area name swapped in — and to pick up
// long-tail "cash for cars <suburb>" searches without creating a separate
// thin page per suburb.
const areaSuburbs: Record<(typeof areaSlugs)[number], string[]> = {
  brisbane: [
    "Sherwood",
    "Chelmer",
    "Graceville",
    "Indooroopilly",
    "Toowong",
    "St Lucia",
    "West End",
    "Woolloongabba",
    "Coorparoo",
    "Annerley",
    "Fairfield",
    "Yeronga",
  ],
  ipswich: [
    "Booval",
    "Bundamba",
    "Riverview",
    "Goodna",
    "Redbank",
    "Redbank Plains",
    "Springfield",
    "Springfield Lakes",
    "Yamanto",
    "Raceview",
    "Brassall",
  ],
  caboolture: [
    "Morayfield",
    "Burpengary",
    "Narangba",
    "Deception Bay",
    "Wamuran",
    "Elimbah",
    "Upper Caboolture",
  ],
  "gold-coast": [
    "Southport",
    "Surfers Paradise",
    "Broadbeach",
    "Robina",
    "Nerang",
    "Coomera",
    "Burleigh Heads",
    "Currumbin",
    "Palm Beach",
    "Ashmore",
  ],
  logan: [
    "Beenleigh",
    "Loganholme",
    "Springwood",
    "Shailer Park",
    "Marsden",
    "Woodridge",
    "Browns Plains",
    "Jimboomba",
  ],
  "moreton-bay": [
    "Redcliffe",
    "Kallangur",
    "Petrie",
    "North Lakes",
    "Strathpine",
    "Scarborough",
    "Bribie Island",
  ],
  redlands: [
    "Cleveland",
    "Capalaba",
    "Victoria Point",
    "Wellington Point",
    "Alexandra Hills",
    "Thornlands",
    "Redland Bay",
    "Mount Cotton",
  ],
  "sunshine-coast": [
    "Maroochydore",
    "Caloundra",
    "Nambour",
    "Mooloolaba",
    "Buderim",
    "Noosa",
    "Coolum Beach",
    "Kawana",
  ],
  toowoomba: [
    "Highfields",
    "Harristown",
    "Rangeville",
    "Newtown",
    "Harlaxton",
    "Wilsonton",
    "Glenvale",
  ],
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
      suburbs: areaSuburbs[slug],
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
