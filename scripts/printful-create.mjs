// Creates RST products in Printful via API (no design-tool clicking).
// Usage: node scripts/printful-create.mjs <mom|dad|little|baby|all>
import { readFileSync } from "node:fs";

let key = "";
for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^PRINTFUL_API_KEY=(.*)$/);
  if (m) key = m[1].trim().replace(/^["']|["']$/g, "");
}
const BASE = "https://rst-store-two.vercel.app/design/";

async function pf(path, init) {
  const r = await fetch("https://api.printful.com" + path, {
    ...init,
    headers: { Authorization: "Bearer " + key, "Content-Type": "application/json", ...(init?.headers) },
  });
  const b = await r.json();
  if (!r.ok) throw new Error(r.status + ": " + JSON.stringify(b.error ?? b));
  return b.result;
}

const NOTES = "Embroider the RST monogram crisply on the chest, tone-on-tone. Center it cleanly within the placement area.";

// Single fixed brand monogram on every tee, embroidered tone-on-tone in soft
// gray (from Printful's fixed thread palette). chest_left where supported;
// the infant garment only offers chest_center.
const MONO = (placement) => ({ type: placement, url: BASE + "rst-monogram.png", threads: ["#96A1A8"] });

const CONFIGS = {
  mom: {
    name: "The Mom Tee", catalogId: 586, price: "30.00",
    colors: ["Ivory", "Hemp", "Khaki", "Granite", "Grey", "Pepper"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    chest: MONO("embroidery_chest_left"), sleeve: null,
  },
  dad: {
    name: "The Dad Tee", catalogId: 586, price: "30.00",
    colors: ["Pepper", "Grey", "Granite", "Khaki", "Hemp", "Ivory"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    chest: MONO("embroidery_chest_left"), sleeve: null,
  },
  little: {
    name: "The Little Tee", catalogId: 1485, price: "20.00",
    colors: ["White", "Pepper", "Chambray"],
    sizes: null,
    chest: MONO("embroidery_chest_left"), sleeve: null,
  },
  baby: {
    name: "The Baby Tee", catalogId: 305, price: "15.00",
    colors: null,
    sizes: null,
    chest: MONO("embroidery_chest_center"), sleeve: null,
  },
};

async function createProduct(target) {
  const cfg = CONFIGS[target];
  if (!cfg) throw new Error("Unknown target " + target);

  // Replace-safe: delete an existing product with the same name first.
  const existing = await pf("/store/products?limit=100");
  for (const p of existing) {
    if (p.name === cfg.name) { await pf("/store/products/" + p.id, { method: "DELETE" }); console.log(`  (removed old "${cfg.name}" #${p.id})`); }
  }

  const detail = await pf("/products/" + cfg.catalogId);
  const available = detail.variants;
  const allColors = [...new Set(available.map((v) => v.color))];

  // pick colors: requested ones that exist, else neutral fallback for baby
  let colors = cfg.colors ? cfg.colors.filter((c) => allColors.some((a) => a.toLowerCase() === c.toLowerCase())) : null;
  if (cfg.colors) {
    const missing = cfg.colors.filter((c) => !allColors.some((a) => a.toLowerCase() === c.toLowerCase()));
    if (missing.length) console.log(`  ⚠ ${target}: colors not offered, skipping: ${missing.join(", ")}`);
  }
  if (!colors) {
    const NEUTRAL = ["natural", "white", "vintage white", "heather dust", "soft cream", "ivory", "oatmeal", "ash", "sand"];
    colors = allColors.filter((c) => NEUTRAL.includes(c.toLowerCase()));
    if (!colors.length) colors = allColors.slice(0, 3);
    console.log(`  ${target}: auto-picked colors -> ${colors.join(", ")}`);
  }

  const sizes = cfg.sizes ?? [...new Set(available.map((v) => v.size))];
  const chosen = available.filter((v) => colors.some((c) => c.toLowerCase() === v.color.toLowerCase()) && sizes.includes(v.size));
  if (!chosen.length) throw new Error("no variants matched colors/sizes for " + target);

  const files = [cfg.chest];
  if (cfg.sleeve) files.push(cfg.sleeve);

  const threadOptions = files.map((f) => ({ id: f.type.replace("embroidery_", "thread_colors_"), value: f.threads }));
  const sync_variants = chosen.map((v) => ({
    retail_price: cfg.price,
    variant_id: v.id,
    files: files.map((f) => ({ type: f.type, url: f.url })),
    options: [...threadOptions, { id: "notes", value: NOTES }],
  }));

  const minCost = Math.min(...chosen.map((v) => Number(v.price)));
  console.log(`  ${target}: ${chosen.length} variants (${colors.length} colors x ${sizes.length} sizes), garment cost from $${minCost.toFixed(2)} + embroidery`);

  const result = await pf("/store/products", {
    method: "POST",
    body: JSON.stringify({ sync_product: { name: cfg.name }, sync_variants }),
  });
  console.log(`  ✓ Created "${cfg.name}" -> sync product id ${result.id}`);
  return result;
}

const target = process.argv[2] ?? "mom";
const targets = target === "all" ? ["mom", "dad", "little", "baby"] : [target];
for (const t of targets) {
  try { await createProduct(t); }
  catch (e) { console.log(`  ✗ ${t} failed: ${e.message}`); }
}
