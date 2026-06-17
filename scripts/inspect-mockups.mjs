import { readFileSync } from "node:fs";
let key = "";
for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^PRINTFUL_API_KEY=(.*)$/);
  if (m) key = m[1].trim().replace(/^["']|["']$/g, "");
}
async function pf(path) {
  const r = await fetch("https://api.printful.com" + path, { headers: { Authorization: "Bearer " + key } });
  const b = await r.json();
  if (!r.ok) throw new Error(r.status + ": " + JSON.stringify(b.error ?? b));
  return b.result;
}
const map = JSON.parse(readFileSync("src/data/printful-map.json", "utf8"));
const momId = map.products["rst-mom-001"].syncProductId;
const d = await pf("/store/products/" + momId);
const sv = d.sync_variants[0];
console.log("sync variant file types:", sv.files.map((f) => f.type).join(", "));
console.log("preview files on one variant:", sv.files.filter((f) => f.type === "preview").length);
console.log("\nAll preview URLs for variant 0:");
for (const f of sv.files.filter((f) => f.type === "preview")) console.log("  " + f.preview_url);
