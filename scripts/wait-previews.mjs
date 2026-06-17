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
const syncId = process.argv[2];
for (let i = 0; i < 40; i++) {
  const d = await pf("/store/products/" + syncId);
  const total = d.sync_variants.length;
  const ready = d.sync_variants.filter((sv) => (sv.files ?? []).some((f) => f.type === "preview" && f.preview_url)).length;
  console.log(`  previews ${ready}/${total}`);
  if (ready === total && total > 0) { console.log("READY"); break; }
  await new Promise((r) => setTimeout(r, 6000));
}
