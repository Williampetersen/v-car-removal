import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { allLocations, locationPath } from "@/lib/locations";
import { faqs, cityFaqs } from "@/lib/faqs";

export const dynamic = "force-static";

/** Long-form, citation-friendly summary of the business and every service area, for AI assistants. */
export function GET() {
  const out: string[] = [
    `# ${site.name}: full reference`,
    "",
    `> ${site.description}`,
    "",
    "## Business facts",
    `- Name: ${site.name}`,
    `- Address: ${site.address.street}, ${site.address.suburb} ${site.address.state} ${site.address.postcode}, Australia`,
    `- Phone: ${site.phoneDisplay} (${site.phoneE164})`,
    `- Email: ${site.email}`,
    ...site.hours.map((h) => `- Hours: ${h.days} ${h.time}`),
    `- Website: ${site.url}`,
    `- Services: ${services.map((s) => s.name).join("; ")}`,
    `- Payment: cash or bank transfer when the vehicle is collected. Price quoted before pickup, up to ${site.cashOfferMax} depending on the vehicle.`,
    "- Towing: free when the vehicle is bought.",
    `- Last updated: ${site.lastUpdated}`,
    "",
    "## General questions and answers",
    ...faqs.flatMap((f) => [`### ${f.question}`, f.answer, ""]),
    "## Service areas in detail",
    "",
  ];

  for (const l of allLocations) {
    out.push(
      `### Cash for cars ${l.name} (${l.tier === "core" ? "core area" : "extended region, by arrangement"})`,
      `URL: ${site.url}${locationPath(l.slug)}`,
      `Council: ${l.council}. Region: ${l.region}. About ${l.distanceKm} km from the Sherwood depot.`,
      `Suburbs and towns: ${l.suburbs.join(", ")}.`,
      `Access: ${l.access}`,
      `Typically collected: ${l.vehicles}`,
      `Pickup timing: ${l.pickup}`,
      ...l.about,
      "",
      ...cityFaqs(l)
        .slice(0, 5)
        .flatMap((f) => [`Q: ${f.question}`, `A: ${f.answer}`]),
      ""
    );
  }

  return new Response(out.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
