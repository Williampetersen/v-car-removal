import { promises as fs } from "node:fs";
import path from "node:path";
import { get, put } from "@vercel/blob";
import { site } from "./site";

/**
 * Agent inboxes that receive every quote request. Managed from /admin (max 5).
 *
 * Storage, first one configured wins: an Upstash Redis REST database (KV_REST_API_URL / KV_REST_API_TOKEN),
 * a private Vercel Blob store (BLOB_READ_WRITE_TOKEN, set when the store is connected to the project),
 * otherwise a local JSON file for development. Serverless hosts have no writable disk.
 */
export const MAX_RECIPIENTS = 5;
const KEY = "vcr:quote-recipients";
const FILE = path.join(process.cwd(), ".data", "recipients.json");
const BLOB_PATH = "admin/quote-recipients.json";

export const EMAIL_RE = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/;

const redisUrl = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export function storageStatus(): { persistent: boolean; kind: "redis" | "blob" | "file" | "none" } {
  if (redisUrl() && redisToken()) return { persistent: true, kind: "redis" };
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) return { persistent: true, kind: "blob" };
  if (process.env.VERCEL) return { persistent: false, kind: "none" };
  return { persistent: true, kind: "file" };
}

async function redis(command: string[]) {
  const response = await fetch(redisUrl()!, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const json = (await response.json()) as { result?: unknown; error?: string };
  if (!response.ok || json.error) throw new Error(json.error || `Redis error ${response.status}`);
  return json.result;
}

function clean(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  for (const item of value) {
    if (typeof item !== "string") continue;
    const email = item.trim().toLowerCase();
    if (EMAIL_RE.test(email)) seen.add(email);
  }
  return [...seen].slice(0, MAX_RECIPIENTS);
}

/** Recipients saved by the admin (may be empty). */
export async function getRecipients(): Promise<string[]> {
  const { kind } = storageStatus();
  try {
    if (kind === "redis") {
      const raw = await redis(["GET", KEY]);
      return typeof raw === "string" ? clean(JSON.parse(raw)) : [];
    }
    if (kind === "blob") {
      const result = await get(BLOB_PATH, { access: "private", useCache: false });
      if (!result || result.statusCode !== 200) return [];
      return clean(JSON.parse(await new Response(result.stream).text()));
    }
    if (kind === "file") return clean(JSON.parse(await fs.readFile(FILE, "utf8")));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error("Could not read quote recipients:", error);
    }
  }
  return [];
}

export async function saveRecipients(emails: string[]): Promise<string[]> {
  const list = clean(emails);
  const { kind } = storageStatus();
  if (kind === "redis") {
    await redis(["SET", KEY, JSON.stringify(list)]);
  } else if (kind === "blob") {
    await put(BLOB_PATH, JSON.stringify(list), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
  } else if (kind === "file") {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(list, null, 2));
  } else {
    throw new Error("No persistent storage is connected.");
  }
  return list;
}

/** Who a quote email goes to: the admin's list, else CONTACT_TO_EMAIL, else the business inbox. */
export async function quoteDestinations(): Promise<string[]> {
  const saved = await getRecipients();
  if (saved.length) return saved;
  return [process.env.CONTACT_TO_EMAIL || site.email];
}
