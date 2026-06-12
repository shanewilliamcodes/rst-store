import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { collections, getCollection, products } from "@/lib/catalog";

export function generateStaticParams() { return collections.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const collection = getCollection(slug); return collection ? { title: collection.name, description: collection.description } : {}; }
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const collection = getCollection(slug); if (!collection) notFound(); const collectionProducts = products.filter((product) => product.collections.includes(slug) || (slug === "kids" && ["Baby", "Kids"].includes(product.category))); return <><section className="bg-oatmeal/22"><div className="page-shell py-16 sm:py-24"><p className="eyebrow text-ink/50">RST collection</p><h1 className="mt-3 font-display text-5xl sm:text-7xl">{collection.name}</h1><p className="mt-3 max-w-lg text-sm text-ink/60">{collection.description}</p></div></section><div className="page-shell py-12 sm:py-20"><ProductGrid initialProducts={collectionProducts} /></div></>; }
