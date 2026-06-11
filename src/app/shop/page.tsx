import type { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { products } from "@/lib/catalog";

export const metadata: Metadata = { title: "Shop all", description: "Shop premium oversized tees, family matching styles, layers, and lounge essentials from RST." };
export default function ShopPage() { return <div className="page-shell py-12 sm:py-20"><header className="mb-10 max-w-3xl"><p className="eyebrow text-ink/55">The comfort collection</p><h1 className="mt-3 font-display text-5xl sm:text-7xl">The soft stuff.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-ink/60">Substantial tees and easy layers that keep their fit, hold onto their softness, and make getting dressed feel a little more like coming home.</p></header><ProductGrid initialProducts={products} /></div>; }
