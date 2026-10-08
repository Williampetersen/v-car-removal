// Read-only extraction of the WordPress site into /content.
// Usage: node --env-file=.env.local scripts/wp-extract.mjs
// Only issues GET requests. Never writes to WordPress.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { existsSync, statSync } from "node:fs";

const WP_URL = (process.env.WP_URL || "https://vcarremoval.com.au").replace(/\/$/, "");
const USER = process.env.WP_USER;
const PASS = process.env.WP_APP_PASSWORD;
const OUT = path.resolve("content");
const authHeader =
  USER && PASS ? { Authorization: "Basic " + Buffer.from(`${USER}:${PASS}`).toString("base64") } : {};

const UA = { "User-Agent": "Mozilla/5.0 (compatible; vcar-migration/1.0)" };

async function get(url, { auth = false, text = false } = {}) {
  const res = await fetch(url, { headers: { ...UA, ...(auth ? authHeader : {}) } });
  if (!res.ok) return { ok: false, status: res.status };
  return { ok: true, status: res.status, headers: res.headers, data: text ? await res.text() : await res.json() };
}

async function getAll(route) {
  const items = [];
  for (let page = 1; ; page++) {
    const sep = route.includes("?") ? "&" : "?";
    const r = await get(`${WP_URL}/wp-json/${route}${sep}per_page=100&page=${page}`, { auth: true }).then(
      (x) => (x.ok ? x : get(`${WP_URL}/wp-json/${route}${sep}per_page=100&page=${page}`)),
    );
    if (!r.ok) return page === 1 ? { error: r.status, items: [] } : { items };
    items.push(...r.data);
    if (page >= Number(r.headers.get("x-wp-totalpages") || 1)) break;
  }
  return { items };
}

const save = async (rel, data) => {
  const file = path.join(OUT, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, typeof data === "string" ? data : JSON.stringify(data, null, 2));
};

const report = { authWorks: false, errors: {} };

// 1. Does Basic Auth work?
const me = await get(`${WP_URL}/wp-json/wp/v2/users/me`, { auth: true });
report.authWorks = me.ok;
console.log("Basic auth:", me.ok ? "OK" : `FAILED (${me.status})`);

// 2. Core REST collections
const routes = {
  pages: "wp/v2/pages?status=publish&context=view",
  posts: "wp/v2/posts",
  project: "wp/v2/project",
  media: "wp/v2/media",
  categories: "wp/v2/categories",
  tags: "wp/v2/tags",
  project_category: "wp/v2/project_category",
  project_tag: "wp/v2/project_tag",
  menus: "wp/v2/menus",
  "menu-items": "wp/v2/menu-items",
  users: "wp/v2/users",
  comments: "wp/v2/comments",
  "cf7-forms": "contact-form-7/v1/contact-forms",
};
for (const [name, route] of Object.entries(routes)) {
  const r = await getAll(route);
  if (r.error) report.errors[name] = r.error;
  await save(`wp/${name}.json`, r.items);
  console.log(name.padEnd(18), r.error ? `error ${r.error}` : `${r.items.length} items`);
}

// 3. Sitemaps -> every URL
const urls = new Map();
async function walkSitemap(url) {
  const r = await get(url, { text: true });
  if (!r.ok) return;
  const locs = [...r.data.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    if (loc.endsWith(".xml")) await walkSitemap(loc);
    else urls.set(loc, url);
  }
}
await walkSitemap(`${WP_URL}/sitemap_index.xml`);
await walkSitemap(`${WP_URL}/wp-sitemap.xml`);

// URLs from REST objects too (pages the sitemap may omit)
const fs = await import("node:fs/promises");
for (const t of ["pages", "posts", "project"]) {
  const items = JSON.parse(await fs.readFile(path.join(OUT, `wp/${t}.json`), "utf8"));
  for (const i of items) if (i.link) urls.set(i.link, urls.get(i.link) || `rest:${t}`);
}
urls.set(`${WP_URL}/`, urls.get(`${WP_URL}/`) || "rest:home");
await save("wp/urls.json", [...urls].map(([url, source]) => ({ url, source })));
console.log("urls".padEnd(18), `${urls.size} URLs`);

// 4. Rendered HTML of every URL (for body text, nav, footer, forms, business details)
let n = 0;
for (const url of urls.keys()) {
  const r = await get(url, { text: true });
  if (!r.ok) {
    report.errors[`html:${url}`] = r.status;
    continue;
  }
  const slug = new URL(url).pathname.replace(/^\/|\/$/g, "").replace(/\//g, "__") || "home";
  await save(`wp/html/${slug}.html`, r.data);
  n++;
}
console.log("html".padEnd(18), `${n} pages saved`);

// 5. Download every media file at full quality
const media = JSON.parse(await fs.readFile(path.join(OUT, "wp/media.json"), "utf8"));
const manifest = [];
const used = new Set();
await mkdir(path.join(OUT, "media"), { recursive: true });
for (const m of media) {
  const src = m.source_url;
  const ext = path.extname(new URL(src).pathname).toLowerCase() || ".bin";
  let base = path.basename(new URL(src).pathname, ext);
  let file = `${base}${ext}`;
  for (let i = 2; used.has(file); i++) file = `${base}-${i}${ext}`;
  used.add(file);
  const target = path.join(OUT, "media", file);
  let res = { ok: false, status: 0 };
  if (existsSync(target) && statSync(target).size > 0) res = { ok: true };
  for (let attempt = 1; !res.ok && attempt <= 4; attempt++) {
    try {
      res = await fetch(src, { headers: UA });
      if (res.ok) await writeFile(target, Buffer.from(await res.arrayBuffer()));
    } catch (e) {
      res = { ok: false, status: String(e.cause?.code || e.message) };
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  if (!res.ok) report.errors[`media:${src}`] = res.status;
  manifest.push({
    id: m.id,
    file,
    source_url: src,
    alt: m.alt_text,
    title: m.title?.rendered,
    caption: m.caption?.rendered,
    mime: m.mime_type,
    width: m.media_details?.width,
    height: m.media_details?.height,
    post: m.post,
    date: m.date,
    downloaded: res.ok,
  });
}
await save("media-manifest.json", manifest);
console.log("media".padEnd(18), `${manifest.filter((x) => x.downloaded).length}/${manifest.length} downloaded`);

await save("extract-report.json", report);
console.log("done", JSON.stringify(report.errors));
