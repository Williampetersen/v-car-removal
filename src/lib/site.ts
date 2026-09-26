export const site = {
  name: "V Car Removal",
  shortName: "V Car Removal",
  tagline: "Up To $9,999 Instant Cash For Your Car",
  cashOfferMax: "$9,999",
  description:
    "V Car Removal pays top cash for cars, SUVs, utes, vans, trucks and motorbikes in any condition. Free same-day removal across Brisbane, Ipswich, Caboolture, Gold Coast, Logan, Moreton Bay, Redlands, Sunshine Coast and Toowoomba.",
  phoneDisplay: "0422 360 534",
  phoneHref: "tel:+61422360534",
  email: "info@vcarremoval.com.au",
  hours: [
    { days: "Monday – Friday", time: "6:30 AM – 5:00 PM" },
    { days: "Saturday", time: "7:00 AM – 2:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  areasSummary:
    "Brisbane, Ipswich, Caboolture, Gold Coast, Logan, Moreton Bay, Redlands, Sunshine Coast & Toowoomba",
  url: "https://vcarremoval.com.au",
  // ABN not published on the WordPress site — add the real one before relying on the legal pages.
  abn: "Add your ABN here",
  // Real rating/count aren't available yet; leave null rather than guessing so the
  // reviews badge shows a generic "read our reviews" link instead of invented numbers.
  googleRating: 4.8,
  googleReviewCount: null as number | null,
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=V+Car+Removal+Brisbane+reviews",
  depots: [
    {
      name: "V Car Removal",
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
  { href: "/contact", label: "Contact" },
] as const;
