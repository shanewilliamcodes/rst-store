export type ProductColor = { name: string; hex: string };
export type DetailType = "heart" | "mustache" | "bottle" | "blocks";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  collections: string[];
  audience: string[];
  description: string;
  details: string[];
  fit: string;
  fabric: string;
  colors: ProductColor[];
  sizes: string[];
  badge?: string;
  detailType: DetailType;
  signatureDetail: string;
  snaps?: boolean;
  accent: string;
};

const colors = {
  cream: { name: "Cream", hex: "#eee5d6" },
  oatmeal: { name: "Oatmeal", hex: "#cdbc9f" },
  sand: { name: "Sand", hex: "#b9a588" },
  taupe: { name: "Taupe", hex: "#8f8172" },
  gray: { name: "Heather Gray", hex: "#a7a5a0" },
  black: { name: "Washed Black", hex: "#454542" },
};

export const products: Product[] = [
  {
    id: "rst-mom-001",
    slug: "the-mom-tee",
    name: "The Mom Tee",
    shortName: "Mom Tee",
    price: 30,
    category: "Mom",
    collections: ["best-sellers", "mom", "family"],
    audience: ["Mom"],
    description: "A thoughtfully oversized tee with soft drape and real structure, signed with a small neon heart on the chest.",
    details: [
      "Small neon pink heart embroidered on the front chest",
      "Tone-on-tone RST embroidery on the opposite sleeve",
      "Printed RST / Really Soft Tees neck label",
      "Pre-washed and shrink-resistant",
    ],
    fit: "Intentionally oversized with room through the body and a softly dropped shoulder.",
    fabric: "100% long-staple combed cotton, 6.5 oz.",
    colors: [colors.cream, colors.oatmeal, colors.sand, colors.taupe, colors.gray, colors.black],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    badge: "The first drop",
    detailType: "heart",
    signatureDetail: "A small neon pink heart on the chest, quiet enough to feel personal.",
    accent: "#ff3fa4",
  },
  {
    id: "rst-dad-001",
    slug: "the-dad-tee",
    name: "The Dad Tee",
    shortName: "Dad Tee",
    price: 30,
    category: "Dad",
    collections: ["best-sellers", "dad", "family"],
    audience: ["Dad"],
    description: "A substantial relaxed tee that keeps its collar, keeps its shape, and wears one very small neon mustache on the chest.",
    details: [
      "Small neon orange mustache embroidered on the front chest",
      "Tone-on-tone RST embroidery on the opposite sleeve",
      "Printed RST / Really Soft Tees neck label",
      "Pre-washed and shrink-resistant",
    ],
    fit: "Relaxed through the chest and body with a clean, dependable neckline.",
    fabric: "100% long-staple combed cotton, 6.5 oz.",
    colors: [colors.black, colors.gray, colors.taupe, colors.sand, colors.oatmeal, colors.cream],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    badge: "The first drop",
    detailType: "mustache",
    signatureDetail: "A small neon orange mustache on the chest, kept subtle on purpose.",
    accent: "#ff6a22",
  },
  {
    id: "rst-baby-001",
    slug: "the-baby-tee",
    name: "The Baby Tee",
    shortName: "Baby Tee",
    price: 15,
    category: "Baby",
    collections: ["baby", "family"],
    audience: ["Baby"],
    description: "An exceptionally soft first tee with gentle stretch and a tiny neon bottle stitched on the chest.",
    details: [
      "Tiny neon aqua baby bottle embroidered on the front chest",
      "Tone-on-tone RST embroidery on the opposite sleeve",
      "Nickel-free shoulder snaps",
      "Printed RST / Really Soft Tees neck label",
    ],
    fit: "Easy and gentle with room for movement, layering, and growing.",
    fabric: "95% organic cotton, 5% elastane.",
    colors: [colors.oatmeal, colors.cream, colors.sand, colors.gray],
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M"],
    badge: "The first drop",
    detailType: "bottle",
    signatureDetail: "A tiny neon aqua bottle on the chest, sized for the smallest member of the family.",
    snaps: true,
    accent: "#20e3e3",
  },
  {
    id: "rst-little-001",
    slug: "the-little-tee",
    name: "The Little Tee",
    shortName: "Little Tee",
    price: 20,
    category: "Little",
    collections: ["little", "family"],
    audience: ["Toddler", "Kids"],
    description: "Play-ready softness with durable seams and three tiny neon ABC blocks stitched on the chest.",
    details: [
      "Three tiny neon ABC blocks embroidered on the front chest",
      "Tone-on-tone RST embroidery on the opposite sleeve",
      "Tag-free printed RST / Really Soft Tees neck label",
      "Extra-durable seams and shrink-resistant finish",
    ],
    fit: "Relaxed and play-ready with enough room to grow.",
    fabric: "100% combed cotton, 6.0 oz.",
    colors: [colors.sand, colors.oatmeal, colors.cream, colors.gray, colors.black],
    sizes: ["2T", "3T", "4T", "5T", "YXS", "YS", "YM", "YL"],
    badge: "The first drop",
    detailType: "blocks",
    signatureDetail: "Three tiny neon ABC blocks on the chest, stacked just a little crooked.",
    accent: "#b8ff2c",
  },
];

export const collections = [
  { slug: "mom", name: "Mom", description: "The Mom Tee and its neon heart." },
  { slug: "dad", name: "Dad", description: "The Dad Tee and its neon mustache." },
  { slug: "baby", name: "Baby", description: "The Baby Tee and its neon bottle." },
  { slug: "little", name: "Little", description: "The Little Tee and its neon blocks." },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
