import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductConfigurator } from "@/components/product-configurator";
import { ProductCard } from "@/components/product-card";
import { getProduct, products } from "@/lib/catalog";
import { siteConfig } from "@/lib/constants";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const product = getProduct((await params).slug); return product ? { title: product.name, description: product.description } : {}; }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug); if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id && item.collections.some((collection) => product.collections.includes(collection))).slice(0, 4);
  const jsonLd = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, brand: { "@type": "Brand", name: "RST" }, offers: { "@type": "Offer", priceCurrency: "USD", price: product.price, availability: "https://schema.org/InStock", url: `${siteConfig.url}/products/${product.slug}` } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="page-shell py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-7 text-[.68rem] uppercase tracking-[.13em] text-ink/50"><Link href="/shop">Shop</Link> / <span>{product.category}</span></nav>
        <ProductConfigurator product={product} />
      </div>
      <section className="page-shell py-20 sm:py-28">
        <h2 className="font-display text-4xl sm:text-5xl">The rest of the family</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </section>
    </>
  );
}
