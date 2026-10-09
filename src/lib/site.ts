export const site = {
  name: "V Car Removal Brisbane",
  shortName: "V Car Removal",
  tagline: "Cash For Cars & Free Car Removal in Brisbane",
  cashOfferMax: "$9,999",
  description:
    "V Car Removal Brisbane pays cash for cars, SUVs, utes, vans, trucks and motorbikes in any condition. Free towing across Brisbane, Ipswich, Caboolture, Gold Coast, Logan, Moreton Bay, Redlands, Sunshine Coast and Toowoomba, plus ten more Queensland regions by arrangement.",
  phoneDisplay: "0422 360 534",
  phoneHref: "tel:+61422360534",
  phoneE164: "+61422360534",
  email: "info@vcarremoval.com.au",
  hours: [
    { days: "Monday – Friday", time: "6:30 AM – 5:00 PM" },
    { days: "Saturday", time: "7:00 AM – 2:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  areasSummary:
    "Brisbane, Ipswich, Caboolture, Gold Coast, Logan, Moreton Bay, Redlands, Sunshine Coast & Toowoomba, plus the Scenic Rim, Lockyer Valley, Somerset, Noosa, Gympie, Southern Downs, South Burnett, Western Downs, Fraser Coast & Bundaberg by arrangement",
  url: "https://vcarremoval.com.au",
  address: {
    street: "451 Sherwood Rd",
    suburb: "Sherwood",
    state: "QLD",
    postcode: "4075",
    country: "AU",
  },
  // Coordinates of the Sherwood depot (taken from the Google Maps embed on the old site).
  geo: { latitude: -27.5325, longitude: 152.9915 },
  // ABN is not published on the old site. Set it here (or leave null) and it appears in the footer/legal pages.
  abn: null as string | null,
  // The old site shows no review count or rating, so none is claimed here.
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=V+Car+Removal+Brisbane+451+Sherwood+Rd+Sherwood+QLD",
  // Date the content was last reviewed (shown as "Last updated" and used in sitemap/schema).
  lastUpdated: "2026-10-08",
  depots: [
    {
      name: "V Car Removal Brisbane",
      address: "451 Sherwood Rd, Sherwood QLD 4075",
      mapQuery: "451+Sherwood+Rd+Sherwood+QLD+4075",
      logo: "/images/logo/logo.png",
    },
  ],
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/get-a-quote", label: "Get a Quote" },
  { href: "/contact", label: "Contact" },
] as const;
