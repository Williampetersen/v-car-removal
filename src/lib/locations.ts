import type { Faq } from "./faqs";

export type Location = {
  slug: string;
  name: string;
  region: string;
  /** Local government area, used in copy and schema. */
  council: string;
  heroImage?: string;
  /** Approximate road distance from the Sherwood depot, in km. */
  distanceKm: string;
  geo: { latitude: number; longitude: number };
  /** Suburbs and towns we regularly collect from. */
  suburbs: string[];
  /** Route / travel context for this area. */
  access: string;
  /** Two or three paragraphs that are specific to this area. */
  about: string[];
  /** Q&As that only make sense for this area. */
  faqs: Faq[];
  /** Slugs of the geographically nearest service areas (for internal links). */
  nearby: string[];
  /** core = regular daily runs from the depot; extended = large regions served by arrangement. */
  tier: "core" | "extended";
  /** What we typically collect here. */
  vehicles: string;
  /** How pickup timing works here. */
  pickup: string;
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

import { extendedLocationData } from "./locations-extended";

type CoreInput = Omit<Location, "heroImage" | "region" | "tier" | "vehicles" | "pickup">;

const locationData: CoreInput[] = [
  {
    slug: "brisbane",
    name: "Brisbane",
    council: "Brisbane City Council",
    distanceKm: "5–25",
    geo: { latitude: -27.4698, longitude: 153.0251 },
    suburbs: [
      "Sherwood",
      "Corinda",
      "Indooroopilly",
      "Toowong",
      "Moorooka",
      "Sunnybank",
      "Mount Gravatt",
      "Carindale",
      "Chermside",
      "Nundah",
      "Wynnum",
      "Inala",
      "Acacia Ridge",
      "Stafford",
    ],
    access:
      "Our Sherwood depot sits in Brisbane's inner south-west, close to the Ipswich Motorway and the Western Freeway, so most inner and middle-ring suburbs are a short run for our tow trucks.",
    about: [
      "Brisbane is where we are based. The depot at 451 Sherwood Rd, Sherwood is a few minutes from Corinda, Oxley and Indooroopilly and a short drive from the CBD, so Brisbane pickups are the quickest we do.",
      "Brisbane's older housing has plenty of cars sitting in driveways, carports and shared parking areas: unregistered cars, vehicles that failed a roadworthy, flood- or hail-damaged cars and cars that cost more to repair than they are worth. We collect from houses, units, workplaces and roadsides and handle the lifting and towing ourselves.",
      "If your car is parked in a body corporate or apartment car park, tell us when you request the quote so we can plan access and a suitable truck.",
    ],
    faqs: [
      {
        question: "Which Brisbane suburbs do you collect from?",
        answer:
          "We collect across Brisbane, north and south of the river, including Sherwood, Corinda, Indooroopilly, Toowong, Sunnybank, Mount Gravatt, Carindale, Chermside, Nundah and Wynnum. If your suburb is not listed, call 0422 360 534 and we will confirm.",
      },
      {
        question: "Can you collect a car from an apartment car park in Brisbane?",
        answer:
          "Usually yes. Tell us the clearance height and how the building's access works when you ask for your quote, and we will send a truck that can get in and out safely.",
      },
    ],
    nearby: ["logan", "ipswich", "redlands", "moreton-bay"],
  },
  {
    slug: "ipswich",
    name: "Ipswich",
    council: "Ipswich City Council",
    distanceKm: "25–40",
    geo: { latitude: -27.6171, longitude: 152.7608 },
    suburbs: [
      "Booval",
      "Bundamba",
      "Goodna",
      "Redbank",
      "Redbank Plains",
      "Springfield",
      "Springfield Lakes",
      "Brassall",
      "Raceview",
      "Karalee",
      "Collingwood Park",
      "Yamanto",
      "Ripley",
      "Rosewood",
    ],
    access:
      "Ipswich is on the Ipswich Motorway corridor west of Brisbane, which is the direct route from our Sherwood depot.",
    about: [
      "Ipswich is one of South East Queensland's fastest-growing cities, and that means a lot of households with more than one vehicle. We regularly collect second cars, work utes and ageing family cars from suburbs such as Redbank Plains, Springfield, Booval and Brassall.",
      "The Ipswich Motorway links Ipswich to our Sherwood depot, so towing back is a straightforward run. Further out, for example Rosewood or Ripley, we schedule the truck around your preferred time.",
      "Ipswich has a long history of vehicle repair and recycling work, and many older cars in the area end up as parts donors. We assess each vehicle for the value in its parts, metal and condition and quote you a price before we send a truck.",
    ],
    faqs: [
      {
        question: "Do you collect from Springfield and Redbank Plains?",
        answer:
          "Yes. Springfield, Springfield Lakes, Redbank Plains, Goodna, Bundamba, Booval and the rest of the Ipswich area are all part of our regular run. Call 0422 360 534 or send the form for a quote.",
      },
      {
        question: "Can I get same-day pickup in Ipswich?",
        answer:
          "In most cases yes. Ipswich is roughly 30 minutes from our depot on the Ipswich Motorway, so same-day collection is often possible when you accept the quote early in the day. Tow truck availability decides the exact time.",
      },
    ],
    nearby: ["brisbane", "logan", "toowoomba"],
  },
  {
    slug: "caboolture",
    name: "Caboolture",
    council: "Moreton Bay Regional Council",
    distanceKm: "55–70",
    geo: { latitude: -27.0847, longitude: 152.9511 },
    suburbs: [
      "Caboolture",
      "Caboolture South",
      "Morayfield",
      "Burpengary",
      "Narangba",
      "Upper Caboolture",
      "Elimbah",
      "Beachmere",
      "Wamuran",
      "Bongaree (Bribie Island)",
    ],
    access:
      "Caboolture is north of Brisbane on the Bruce Highway and the Caboolture railway line. Our trucks run up the Bruce Highway from Sherwood.",
    about: [
      "Caboolture and the surrounding Morayfield, Burpengary and Narangba area has a mix of suburban homes, acreage and rural blocks. Acreage owners often have a paddock car or an old ute that has not moved in years, and we are used to collecting from properties with long driveways and gates.",
      "We service the Caboolture corridor from Narangba up to Elimbah. For Bribie Island, Beachmere and Wamuran we schedule the pickup in advance so the truck is on the right side of the day's run.",
      "Because Caboolture is outside Brisbane proper, the pickup time depends on the truck run. Send us the car's details and your address and we will confirm a time when we quote.",
    ],
    faqs: [
      {
        question: "Do you collect from acreage and rural properties around Caboolture?",
        answer:
          "Yes. Tell us about the access (gates, driveway length, soft ground) when you request your quote and we will plan the right truck. Non-running cars are not a problem.",
      },
      {
        question: "Is towing free from Caboolture to your depot?",
        answer:
          "Yes. Towing is free whenever we agree to buy the vehicle. There is no callout or distance fee in our service area.",
      },
    ],
    nearby: ["moreton-bay", "brisbane", "sunshine-coast"],
  },
  {
    slug: "gold-coast",
    name: "Gold Coast",
    council: "City of Gold Coast",
    distanceKm: "75–100",
    geo: { latitude: -28.0167, longitude: 153.4 },
    suburbs: [
      "Southport",
      "Surfers Paradise",
      "Broadbeach",
      "Burleigh Heads",
      "Robina",
      "Varsity Lakes",
      "Nerang",
      "Mudgeeraba",
      "Currumbin",
      "Palm Beach",
      "Coomera",
      "Helensvale",
      "Ormeau",
      "Pimpama",
    ],
    access:
      "The Gold Coast is reached from Sherwood via the Pacific Motorway (M1), with the northern Gold Coast, such as Coomera and Helensvale, being the closest part of the city to us.",
    about: [
      "The Gold Coast spans around 50 km of coastline, from Coomera and Pimpama in the north to Coolangatta in the south, with Nerang and Mudgeeraba inland. We schedule pickups along the M1 so we can reach the northern, central and southern parts of the city.",
      "Holiday-let and apartment car parks are common on the Gold Coast, and so are cars left behind by people moving interstate or overseas. If you are leaving, we can often arrange pickup around your move date. Tell us when you request the quote.",
      "Salt air is hard on car bodies, and many coastal cars are old and rusted. We still make an offer: a car that is not worth selling privately can still be worth scrap value and parts.",
    ],
    faqs: [
      {
        question: "Do you pick up cars from Surfers Paradise, Broadbeach and Southport?",
        answer:
          "Yes. We collect across the Gold Coast, from Coomera and Helensvale in the north through Southport, Surfers Paradise, Broadbeach and Burleigh Heads to Currumbin and Tugun in the south.",
      },
      {
        question: "How soon can you collect on the Gold Coast?",
        answer:
          "The Gold Coast is about 80 to 100 km from our depot, so the pickup time depends on the day's truck runs. We confirm a collection window when we give you the quote. Call 0422 360 534 for the earliest slot.",
      },
    ],
    nearby: ["logan", "brisbane", "redlands"],
  },
  {
    slug: "logan",
    name: "Logan",
    council: "Logan City Council",
    distanceKm: "20–40",
    geo: { latitude: -27.639, longitude: 153.109 },
    suburbs: [
      "Logan Central",
      "Woodridge",
      "Browns Plains",
      "Springwood",
      "Underwood",
      "Slacks Creek",
      "Loganholme",
      "Shailer Park",
      "Daisy Hill",
      "Beenleigh",
      "Eagleby",
      "Marsden",
      "Park Ridge",
      "Jimboomba",
    ],
    access:
      "Logan sits between Brisbane and the Gold Coast, and our trucks reach it through the Logan Motorway and the Pacific Motorway from Sherwood.",
    about: [
      "Logan is one of Queensland's largest and most diverse local government areas, from dense suburbs such as Woodridge and Logan Central to semi-rural Jimboomba and Park Ridge. That mix means a wide range of vehicles, from small commuter cars to work utes and trucks.",
      "Logan is a short run from our depot, so pickups here are among the quickest outside Brisbane itself. Tell us your suburb and car details and we will confirm a time when we quote.",
      "We buy Logan cars in any condition: running, unregistered, accident-damaged or not starting. If a car has no registration or plates, tell us when you call so we can explain the paperwork.",
    ],
    faqs: [
      {
        question: "Do you service Beenleigh, Browns Plains and Jimboomba?",
        answer:
          "Yes. We cover the whole Logan area, including Beenleigh, Browns Plains, Springwood, Loganholme, Shailer Park, Jimboomba and Park Ridge. Call 0422 360 534 if you are not sure about your suburb.",
      },
      {
        question: "Can you remove an unregistered car from my Logan property?",
        answer:
          "Yes. Unregistered and unroadworthy cars are a regular part of our work. We tow them, so the car does not need to be driven or registered.",
      },
    ],
    nearby: ["brisbane", "gold-coast", "redlands", "ipswich"],
  },
  {
    slug: "moreton-bay",
    name: "Moreton Bay",
    council: "Moreton Bay Regional Council",
    distanceKm: "30–60",
    geo: { latitude: -27.23, longitude: 153.1 },
    suburbs: [
      "Redcliffe",
      "Scarborough",
      "Margate",
      "Clontarf",
      "Deception Bay",
      "North Lakes",
      "Mango Hill",
      "Kallangur",
      "Petrie",
      "Strathpine",
      "Lawnton",
      "Bray Park",
      "Samford Village",
      "Dayboro",
    ],
    access:
      "The Moreton Bay Region stretches from the Redcliffe Peninsula to the Pine Rivers area and the D'Aguilar foothills, reached from Sherwood via the Gateway and Bruce Highway.",
    about: [
      "The Moreton Bay Region is large and varied. The Redcliffe Peninsula has older beachside suburbs, while North Lakes, Mango Hill and Kallangur are newer estates, and Strathpine, Petrie and Lawnton form the Pine Rivers corridor. Further out are Samford Village and Dayboro, with larger blocks and longer driveways.",
      "We collect from all of these, and we plan the run around you: the Peninsula and Pine Rivers corridor are straightforward, while Samford and Dayboro are scheduled in advance because of the distance.",
      "Caboolture and Morayfield are also in the Moreton Bay Region. They have their own page, linked below, with their suburbs and details.",
    ],
    faqs: [
      {
        question: "Do you collect from Redcliffe, North Lakes and Strathpine?",
        answer:
          "Yes. The Redcliffe Peninsula, North Lakes, Mango Hill, Kallangur, Petrie, Strathpine, Lawnton and Bray Park are all within our regular pickup area.",
      },
      {
        question: "Do you service Samford and Dayboro?",
        answer:
          "Yes. Samford Village, Dayboro and nearby areas are serviced by arrangement. Tell us your address when you request the quote and we will confirm the time.",
      },
    ],
    nearby: ["caboolture", "brisbane", "sunshine-coast"],
  },
  {
    slug: "redlands",
    name: "Redlands",
    council: "Redland City Council",
    distanceKm: "25–40",
    geo: { latitude: -27.5333, longitude: 153.2667 },
    suburbs: [
      "Cleveland",
      "Capalaba",
      "Alexandra Hills",
      "Birkdale",
      "Wellington Point",
      "Ormiston",
      "Thornlands",
      "Victoria Point",
      "Redland Bay",
      "Mount Cotton",
      "Thorneside",
      "Sheldon",
    ],
    access:
      "The Redlands are reached from Sherwood via the Gateway Motorway and Old Cleveland Road or the Redland Bay roads, with Capalaba and Cleveland being the main hubs.",
    about: [
      "The Redland City area covers Cleveland, Capalaba and the bayside suburbs from Wellington Point to Redland Bay, plus semi-rural Mount Cotton and Sheldon. It is a car-dependent part of Brisbane's east, with plenty of families running two or three cars.",
      "We collect from the mainland Redlands suburbs. If your car is on one of the bay islands, call us first so we can check whether a barge pickup is practical.",
      "Many Redlands pickups come from people who have upgraded, moved house or inherited a car they do not need. We buy it whatever the condition, and we tow it away free.",
    ],
    faqs: [
      {
        question: "Do you collect from Capalaba, Cleveland and Victoria Point?",
        answer:
          "Yes. Capalaba, Cleveland, Alexandra Hills, Birkdale, Wellington Point, Thornlands, Victoria Point and Redland Bay are all in our regular area.",
      },
      {
        question: "Can you collect from the bay islands?",
        answer:
          "Island pickups depend on the barge. Call 0422 360 534 with the car's details and location and we will tell you whether we can do it.",
      },
    ],
    nearby: ["brisbane", "logan", "gold-coast"],
  },
  {
    slug: "sunshine-coast",
    name: "Sunshine Coast",
    council: "Sunshine Coast Regional Council",
    distanceKm: "100–130",
    geo: { latitude: -26.65, longitude: 153.0667 },
    suburbs: [
      "Maroochydore",
      "Mooloolaba",
      "Buderim",
      "Kawana Waters",
      "Caloundra",
      "Pelican Waters",
      "Nambour",
      "Coolum Beach",
      "Palmwoods",
      "Landsborough",
      "Beerwah",
      "Maleny",
    ],
    access:
      "The Sunshine Coast is reached from Sherwood via the Bruce Highway and Sunshine Motorway, about an hour and a half north.",
    about: [
      "The Sunshine Coast runs from Caloundra in the south to Coolum in the north and inland to Nambour and the Blackall Range. The Glass House Mountains towns of Landsborough and Beerwah sit on the southern edge, and Maleny and Montville in the hinterland.",
      "Because the Sunshine Coast is a long way from our Sherwood depot, we group pickups by area. Tell us your suburb and a few preferred days, and we will fit you into the next run for that area.",
      "We buy cars of every condition here, including cars that have sat unused at holiday homes or on rural blocks, and we tow them for free.",
    ],
    faqs: [
      {
        question: "Do you really collect from the Sunshine Coast?",
        answer:
          "Yes. We collect from Caloundra through Maroochydore and Mooloolaba to Coolum and inland to Nambour and Maleny. Because the trip is long, we confirm a pickup window with you when we quote.",
      },
      {
        question: "Is there a fee for Sunshine Coast pickups?",
        answer:
          "No. Towing is free whenever we agree to buy the car, wherever you are in our service area.",
      },
    ],
    nearby: ["caboolture", "moreton-bay"],
  },
  {
    slug: "toowoomba",
    name: "Toowoomba",
    council: "Toowoomba Regional Council",
    distanceKm: "115–135",
    geo: { latitude: -27.5598, longitude: 151.9507 },
    suburbs: [
      "Toowoomba City",
      "Harristown",
      "Newtown",
      "Kearneys Spring",
      "Wilsonton",
      "Glenvale",
      "Darling Heights",
      "Centenary Heights",
      "Mount Lofty",
      "Rangeville",
      "Highfields",
      "Westbrook",
      "Drayton",
      "Gowrie Junction",
    ],
    access:
      "Toowoomba is reached from Sherwood via the Ipswich Motorway, Warrego Highway and the Toowoomba Range, about two hours west.",
    about: [
      "Toowoomba sits on the Great Dividing Range, west of Brisbane via the Warrego Highway. Toowoomba and the Darling Downs have a lot of farm and work vehicles: utes, 4WDs and trucks that are older, heavily used and still worth something.",
      "We collect from Toowoomba City and the surrounding suburbs and towns, including Highfields, Westbrook and Gowrie Junction. Because the trip over the range is long, we book Toowoomba pickups into a scheduled run and confirm the day and time with you.",
      "If you have more than one vehicle to sell, tell us when you call. Collecting several vehicles in one visit is easier to arrange, and we can quote them together.",
    ],
    faqs: [
      {
        question: "Do you collect farm utes and trucks around Toowoomba?",
        answer:
          "Yes. We buy utes, 4WDs, vans and light trucks in any condition. Tell us about the vehicle and the access (paddock, yard, driveway) when you request the quote.",
      },
      {
        question: "How fast is Toowoomba pickup?",
        answer:
          "Toowoomba is about two hours from our depot, so pickups are booked into a scheduled run rather than guaranteed same-day. Call 0422 360 534 to ask for the earliest day.",
      },
    ],
    nearby: ["ipswich", "brisbane"],
  },
];

const coreExtras: Record<string, { vehicles: string; pickup: string }> = {
  brisbane: {
    vehicles: "Everyday cars, second cars, unregistered and written-off vehicles, utes and vans from houses, units and workplaces.",
    pickup: "Brisbane is our closest area, so same-day pickup is often possible when you accept the quote early in the day.",
  },
  ipswich: {
    vehicles: "Second cars, work utes, family cars and project cars from the Ipswich Motorway corridor and the growth suburbs.",
    pickup: "Ipswich is about 30 minutes from our depot, so same-day collection is often possible. Tow truck availability decides the exact time.",
  },
  caboolture: {
    vehicles: "Utes, 4WDs and paddock cars from acreage, plus everyday cars from Morayfield, Burpengary and Narangba.",
    pickup: "Caboolture pickups depend on the day's northern run. We confirm a time when we quote.",
  },
  "gold-coast": {
    vehicles: "Cars left behind after a move, apartment-block cars, rusted coastal cars and everyday second cars.",
    pickup: "The Gold Coast is a longer run, so we confirm a collection window when we quote rather than promising a time.",
  },
  logan: {
    vehicles: "Commuter cars, work utes, trucks and unregistered vehicles from dense suburbs and semi-rural blocks.",
    pickup: "Logan is a short run from our depot, so same-day pickup is often possible.",
  },
  "moreton-bay": {
    vehicles: "Beachside and Pine Rivers cars, family SUVs and utes, plus larger blocks around Samford and Dayboro.",
    pickup: "The Peninsula and Pine Rivers corridor are quick runs. Samford, Dayboro and further out are scheduled in advance.",
  },
  redlands: {
    vehicles: "Family second and third cars, upgraded-from cars and inherited vehicles from bayside suburbs.",
    pickup: "Mainland Redlands pickups are often possible the same day or next day. Island pickups depend on the barge.",
  },
  "sunshine-coast": {
    vehicles: "Cars left at holiday homes, hinterland utes and 4WDs and older cars from coastal suburbs.",
    pickup: "Sunshine Coast pickups are grouped by area, so we book you into the next run for your suburb.",
  },
  toowoomba: {
    vehicles: "Farm and work utes, 4WDs, vans and light trucks, plus everyday cars from the city.",
    pickup: "Toowoomba pickups are booked into a scheduled run, and we confirm the day and time with you.",
  },
};

const coreLocations = locationData.map((loc) => ({
  ...loc,
  region: "South East Queensland",
  tier: "core" as const,
  ...coreExtras[loc.slug],
}));

export const regions: Region[] = [
  {
    slug: "south-east-queensland",
    name: "Brisbane & South East Queensland",
    blurb:
      "Our core service area: regular runs from the Sherwood depot across Brisbane and the wider South East Queensland region, plus Toowoomba on the Darling Downs.",
    locations: [...coreLocations].map((loc, i) => ({
      ...loc,
      heroImage: galleryImages[i % galleryImages.length],
    })),
  },
  {
    slug: "extended-regions",
    name: "Extended regions across Queensland",
    blurb:
      "Large regional areas from the Scenic Rim to Bundaberg and the Western Downs. Collections here are arranged in advance and confirmed with a day and window when we quote.",
    locations: extendedLocationData.map((loc, i) => ({
      ...loc,
      heroImage: galleryImages[i % galleryImages.length],
    })),
  },
];

export const allLocations: Location[] = regions.flatMap((r) => r.locations);
export const coreAreas = allLocations.filter((l) => l.tier === "core");
export const extendedAreas = allLocations.filter((l) => l.tier === "extended");

/** Public URL path of a city page. Matches the old WordPress URLs. */
export function locationPath(slug: string) {
  return `/cash-for-cars-${slug}`;
}

export function getLocationBySlug(slug: string) {
  return allLocations.find((l) => l.slug === slug);
}

export function getRegionByLocationSlug(slug: string) {
  return regions.find((region) =>
    region.locations.some((location) => location.slug === slug)
  );
}
