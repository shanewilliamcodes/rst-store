import type { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { products } from "@/lib/catalog";

export const metadata: Metadata = { title: "Shop the first drop", description: "Meet the four RST Really Soft Tees: The Mom Tee, The Dad Tee, The Baby Tee, and The Little Tee." };
export default function ShopPage() { return <div className="page-shell py-12 sm:py-20"><header className="mb-10 max-w-3xl"><p className="eyebrow text-ink/55">RST · Really Soft Tees</p><h1 className="mt-3 font-display text-5xl sm:text-7xl">Four tees.<br />That&apos;s the whole idea.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-ink/60">The Mom Tee. The Dad Tee. The Baby Tee. The Little Tee. Premium neutrals, dependable softness, and one tiny neon embroidery detail hidden in each.</p></header><ProductGrid initialProducts={products} /></div>; }
