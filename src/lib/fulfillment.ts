// Single source of truth for resolving a (product, color, size) choice into
// everything downstream: the mockup the shopper previews, the cart line item,
// and the exact Printful variant the order is placed with. Every consumer goes
// through these two functions — never duplicate this mapping.

import printfulMapJson from "@/data/printful-map.json";
import mockupsJson from "@/data/mockups.json";

type PrintfulMap = {
  products: Record<string, { syncProductId: number | null; variants: Record<string, { syncVariantId: number | null }> }>;
};
type MockupMap = Record<string, Record<string, string>>;

const printfulMap = printfulMapJson as unknown as PrintfulMap;
const mockups = mockupsJson as unknown as MockupMap;

const variantKey = (color: string, size: string) => `${color}|${size}`;

/** Printful sync variant for an exact color + size choice. Null until `npm run printful:sync` has populated the map. */
export function getSyncVariantId(productId: string, color: string, size: string): number | null {
  return printfulMap.products[productId]?.variants[variantKey(color, size)]?.syncVariantId ?? null;
}

/** Photorealistic mockup image for an exact color choice. Null until `npm run printful:mockups` has populated it. */
export function getMockupUrl(slug: string, color: string): string | null {
  const url = mockups[slug]?.[color];
  return typeof url === "string" ? url : null;
}
