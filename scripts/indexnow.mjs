// Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver, ...).
// Run after a deploy: npm run seo:indexnow
const host = "vcarremoval.com.au";
const key = "60a86b0cc4d2be09b4aff5ba25cd428b"; // also served at https://vcarremoval.com.au/60a86b0cc4d2be09b4aff5ba25cd428b.txt

const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${response.status} ${response.statusText} for ${urlList.length} URLs`);
if (!response.ok) console.log(await response.text());
