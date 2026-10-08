import { site } from "@/lib/site";

export function LastUpdated({ date = site.lastUpdated }: { date?: string }) {
  const label = new Date(`${date}T00:00:00+10:00`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Brisbane",
  });
  return (
    <p className="text-sm text-zinc-500">
      Last updated: <time dateTime={date}>{label}</time>
    </p>
  );
}
