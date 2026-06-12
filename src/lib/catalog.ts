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
  image: string;
  detailImage: string;
  imagePosition?: string;
  colors: ProductColor[];
  sizes: string[];
  badge?: string;
  detailType: DetailType;
  signatureDetail: string;
  hasSleeveMark: boolean;
  accent: string;
};

const colors = {
  cream: { name: "Cream", hex: "#eee5d6" },
  oatmeal: { name: "Oatmeal", hex: "#cdbc9f" },
  sand: { name: "Sand", hex: "#b9a588" },
  taupe: { name: "Taupe", hex: "#8f8172" },
  gray: { name: "Heather Gray", hex: "#a7a5a0" },
  black: { name: "Washed Black", hex: "#454542" },
  chambray: { name: "Chambray", hex: "#9caebd" },
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
    description: "A heavyweight, garment-dyed tee with soft drape and real structure, signed with a small embroidered heart on the chest.",
    details: [
      "Pink heart embroidered on the left chest",
      "Tone-on-tone RST embroidered on the right sleeve",
      "Garment-dyed 6.1 oz ring-spun cotton (Comfort Colors 1717)",
      "Pre-shrunk in the dye process — keeps its fit",
    ],
    fit: "Relaxed and a touch oversized. Runs generous — size down for a closer fit.",
    fabric: "100% ring-spun cotton, garment-dyed, 6.1 oz. Pre-shrunk so it holds its shape wash after wash.",
    image: "/mockups/the-mom-tee/cream.jpg",
    detailImage: "/images/rst-details-packaging.png",
    colors: [colors.cream, colors.oatmeal, colors.sand, colors.taupe, colors.gray, colors.black],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    badge: "The first drop",
    detailType: "heart",
    signatureDetail: "A small embroidered heart on the chest, quiet enough to feel personal.",
    hasSleeveMark: true,
    accent: "#cc3366",
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
    description: "A substantial, garment-dyed tee that keeps its collar and its shape, wearing one small embroidered mustache on the chest.",
    details: [
      "Orange mustache embroidered on the left chest",
      "Tone-on-tone RST embroidered on the right sleeve",
      "Garment-dyed 6.1 oz ring-spun cotton (Comfort Colors 1717)",
      "Pre-shrunk in the dye process — keeps its fit",
    ],
    fit: "Relaxed through the chest and body with a clean, dependable neckline. Runs generous.",
    fabric: "100% ring-spun cotton, garment-dyed, 6.1 oz. Pre-shrunk so it holds its shape wash after wash.",
    image: "/mockups/the-dad-tee/washed-black.jpg",
    detailImage: "/images/rst-details-packaging.png",
    colors: [colors.black, colors.gray, colors.taupe, colors.sand, colors.oatmeal, colors.cream],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    badge: "The first drop",
    detailType: "mustache",
    signatureDetail: "A small embroidered mustache on the chest, kept subtle on purpose.",
    hasSleeveMark: true,
    accent: "#e25c27",
  },
  {
    id: "rst-baby-001",
    slug: "the-baby-tee",
    name: "The Baby Tee",
    shortName: "Baby Tee",
    price: 24,
    category: "Baby",
    collections: ["baby", "family"],
    audience: ["Baby"],
    description: "An exceptionally soft first tee with a bright embroidered bottle stitched on the chest.",
    details: [
      "Bright bottle embroidered on the chest",
      "Soft combed ring-spun cotton baby jersey (Bella+Canvas)",
      "Easy, gentle fit for movement and layering",
      "Machine wash cold, tumble dry low",
    ],
    fit: "Easy and gentle with room for movement, layering, and growing.",
    fabric: "100% combed ring-spun cotton, soft baby jersey.",
    image: "/mockups/the-baby-tee/cream.jpg",
    detailImage: "/images/rst-details-packaging.png",
    colors: [colors.cream],
    sizes: ["6-12m", "12-18m", "18-24m"],
    badge: "The first drop",
    detailType: "bottle",
    signatureDetail: "A bright bottle stitched on the chest, sized for the littlest one.",
    hasSleeveMark: false,
    accent: "#3399ff",
  },
  {
    id: "rst-little-001",
    slug: "the-little-tee",
    name: "The Little Tee",
    shortName: "Little Tee",
    price: 28,
    category: "Little",
    collections: ["little", "family"],
    audience: ["Toddler", "Kids"],
    description: "Play-ready, garment-dyed softness with three bright embroidered ABC blocks on the chest.",
    details: [
      "Neon ABC blocks embroidered on the chest",
      "Garment-dyed heavyweight youth cotton (Comfort Colors 9018)",
      "Relaxed, play-ready fit",
      "Pre-shrunk — grows with fewer surprises",
    ],
    fit: "Relaxed and play-ready with enough room to grow.",
    fabric: "100% ring-spun cotton, garment-dyed, heavyweight youth tee.",
    image: "/mockups/the-little-tee/cream.jpg",
    detailImage: "/images/rst-details-packaging.png",
    colors: [colors.cream, colors.chambray, colors.black],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "The first drop",
    detailType: "blocks",
    signatureDetail: "Three bright ABC blocks on the chest, stacked just a little crooked.",
    hasSleeveMark: false,
    accent: "#7ba35a",
  },
];

export const collections = [
  { slug: "mom", name: "Mom", description: "The Mom Tee and its embroidered heart.", image: "/mockups/the-mom-tee/cream.jpg" },
  { slug: "dad", name: "Dad", description: "The Dad Tee and its embroidered mustache.", image: "/mockups/the-dad-tee/washed-black.jpg" },
  { slug: "baby", name: "Baby", description: "The Baby Tee and its embroidered bottle.", image: "/mockups/the-baby-tee/cream.jpg" },
  { slug: "little", name: "Little", description: "The Little Tee and its embroidered blocks.", image: "/mockups/the-little-tee/cream.jpg" },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
