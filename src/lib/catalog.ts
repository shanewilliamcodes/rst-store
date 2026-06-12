export type ProductColor = { name: string; hex: string };

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
  image: string;
  detailImage: string;
  imagePosition?: string;
  colors: ProductColor[];
  sizes: string[];
  badge?: string;
  rating: number;
  reviewCount: number;
  hiddenDetail: string;
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
    price: 34,
    category: "Mom",
    collections: ["best-sellers", "mom", "family"],
    audience: ["Mom"],
    description: "A thoughtfully oversized tee with soft drape, real structure, and a tiny neon heart tucked beneath the sleeve cuff, just for you.",
    details: [
      "Hidden neon pink heart embroidery under the sleeve cuff",
      "Tone-on-tone RST hem monogram",
      "Printed RST / Really Soft Tees neck label",
      "Pre-washed and shrink-resistant",
    ],
    fit: "Intentionally oversized with room through the body and a softly dropped shoulder.",
    fabric: "100% long-staple combed cotton, 6.5 oz.",
    image: "/images/mom-tee.png",
    detailImage: "/images/rst-details-packaging.png",
    colors: [colors.cream, colors.oatmeal, colors.sand, colors.taupe, colors.gray, colors.black],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    badge: "The first drop",
    rating: 4.9,
    reviewCount: 96,
    hiddenDetail: "A tiny neon pink heart, hidden under the sleeve cuff.",
    accent: "#ff3fa4",
  },
  {
    id: "rst-dad-001",
    slug: "the-dad-tee",
    name: "The Dad Tee",
    shortName: "Dad Tee",
    price: 34,
    category: "Dad",
    collections: ["best-sellers", "dad", "family"],
    audience: ["Dad"],
    description: "A substantial relaxed tee that keeps its collar, keeps its shape, and hides one very small neon mustache at the side seam.",
    details: [
      "Hidden neon orange mustache embroidery inside the side seam",
      "Tone-on-tone RST hem monogram",
      "Printed RST / Really Soft Tees neck label",
      "Pre-washed and shrink-resistant",
    ],
    fit: "Relaxed through the chest and body with a clean, dependable neckline.",
    fabric: "100% long-staple combed cotton, 6.5 oz.",
    image: "/images/dad-tee.png",
    detailImage: "/images/rst-details-packaging.png",
    colors: [colors.black, colors.gray, colors.taupe, colors.sand, colors.oatmeal, colors.cream],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    badge: "The first drop",
    rating: 4.9,
    reviewCount: 81,
    hiddenDetail: "A tiny neon orange mustache, tucked inside the side seam.",
    accent: "#ff6a22",
  },
  {
    id: "rst-baby-001",
    slug: "the-baby-tee",
    name: "The Baby Tee",
    shortName: "Baby Tee",
    price: 30,
    category: "Baby",
    collections: ["baby", "family"],
    audience: ["Baby"],
    description: "An exceptionally soft first tee with gentle stretch and a tiny neon bottle hiding behind the shoulder snaps.",
    details: [
      "Hidden neon aqua baby bottle embroidery behind the snap placket",
      "Tone-on-tone RST hem monogram",
      "Nickel-free shoulder snaps",
      "Printed RST / Really Soft Tees neck label",
    ],
    fit: "Easy and gentle with room for movement, layering, and growing.",
    fabric: "95% organic cotton, 5% elastane.",
    image: "/images/baby-tee.png",
    detailImage: "/images/rst-details-packaging.png",
    colors: [colors.oatmeal, colors.cream, colors.sand, colors.gray],
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M"],
    badge: "The first drop",
    rating: 5,
    reviewCount: 27,
    hiddenDetail: "A tiny neon aqua bottle, hidden behind the shoulder snaps.",
    accent: "#20e3e3",
  },
  {
    id: "rst-little-001",
    slug: "the-little-tee",
    name: "The Little Tee",
    shortName: "Little Tee",
    price: 30,
    category: "Little",
    collections: ["little", "family"],
    audience: ["Toddler", "Kids"],
    description: "Play-ready softness with durable seams and three tiny neon ABC blocks waiting inside the turned-up hem.",
    details: [
      "Hidden neon ABC block embroidery inside the bottom hem",
      "Tone-on-tone RST hem monogram",
      "Tag-free printed RST / Really Soft Tees neck label",
      "Extra-durable seams and shrink-resistant finish",
    ],
    fit: "Relaxed and play-ready with enough room to grow.",
    fabric: "100% combed cotton, 6.0 oz.",
    image: "/images/little-tee.png",
    detailImage: "/images/rst-details-packaging.png",
    colors: [colors.sand, colors.oatmeal, colors.cream, colors.gray, colors.black],
    sizes: ["2T", "3T", "4T", "5T", "YXS", "YS", "YM", "YL"],
    badge: "The first drop",
    rating: 4.9,
    reviewCount: 63,
    hiddenDetail: "Three tiny neon ABC blocks, hidden inside the bottom hem.",
    accent: "#b8ff2c",
  },
];

export const collections = [
  { slug: "mom", name: "Mom", description: "The Mom Tee and its hidden heart.", image: "/images/mom-tee.png" },
  { slug: "dad", name: "Dad", description: "The Dad Tee and its hidden mustache.", image: "/images/dad-tee.png" },
  { slug: "baby", name: "Baby", description: "The Baby Tee and its hidden bottle.", image: "/images/baby-tee.png" },
  { slug: "little", name: "Little", description: "The Little Tee and its hidden blocks.", image: "/images/little-tee.png" },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
