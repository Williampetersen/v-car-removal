import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { allLocations, locationPath } from "@/lib/locations";
import { faqs } from "@/lib/faqs";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Business details",
    `- Name: ${site.name}`,
    `- Address: ${site.address.street}, ${site.address.suburb} ${site.address.state} ${site.address.postcode}, Australia`,
    `- Phone: ${site.phoneDisplay}`,
    `- Email: ${site.email}`,
    ...site.hours.map((h) => `- Hours: ${h.days} ${h.time}`),
    `- Website: ${site.url}`,
    `- Payment: cash or bank transfer when the vehicle is collected; price quoted before pickup (up to ${site.cashOfferMax}, depending on the vehicle).`,
    `- Last updated: ${site.lastUpdated}`,
    "",
    "## What we do",
    "We buy cars, SUVs, 4WDs, utes, vans, light trucks and motorbikes in any condition (running, damaged, unregistered, scrap) and remove them for free.",
    "",
    "## Services",
    ...services.map(
      (s) => `- [${s.name}](${site.url}/services/${s.slug}): ${s.shortDescription}`
    ),
    "",
    "## Service areas",
    ...allLocations.map(
      (l) =>
        `- [Cash for cars ${l.name}](${site.url}${locationPath(l.slug)}): ${l.suburbs
          .slice(0, 6)
          .join(", ")} and more`
    ),
    "",
    "## Key pages",
    `- [Get a free quote](${site.url}/get-a-quote)`,
    `- [Service locations](${site.url}/locations)`,
    `- [About us](${site.url}/about)`,
    `- [FAQ](${site.url}/faq)`,
    `- [Contact](${site.url}/contact)`,
    "",
    "## Frequently asked questions",
    ...faqs.slice(0, 6).flatMap((f) => [`### ${f.question}`, f.answer, ""]),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
