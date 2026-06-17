import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { formatPrice, products } from "@/lib/catalog";
import { siteConfig } from "@/lib/constants";
import { ProductCard } from "@/components/product-card";
import { NewsletterForm } from "@/components/newsletter-form";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[80vh] overflow-hidden bg-oatmeal/30">
        <Image src="/images/rst-family-hero.png" alt="The RST family relaxing together at home in soft neutral Really Soft Tees" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-ink/20 to-transparent" />
        <div className="page-shell relative flex min-h-[80vh] items-end pb-12 pt-28 sm:items-center sm:pb-0">
          <div className="max-w-2xl text-cream">
            <p className="eyebrow">RST · Really Soft Tees</p>
            <h1 className="mt-5 font-display text-[3.6rem] leading-[.93] sm:text-7xl lg:text-[6.4rem]">Soft enough<br />to feel like home.</h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-cream/85 sm:text-base">Four exceptionally soft, garment-dyed family tees to start — each finished with the RST monogram embroidered tone-on-tone on the chest.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/shop" className="button-primary !border-cream !bg-cream !text-ink hover:!bg-white">Meet the four</Link><Link href="/about" className="button-secondary">Our family story</Link></div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10"><div className="page-shell grid grid-cols-2 divide-x divide-y divide-ink/10 md:grid-cols-4 md:divide-y-0">{[[Sparkles,"Really soft, actually"],[Wand2,"Embroidered RST monogram"],[RefreshCw,"Pre-shrunk, garment-dyed"],[HeartHandshake,"Every tee gives $1"]].map(([Icon,label])=>{const Comp=Icon as typeof Sparkles;return <div key={label as string} className="flex items-center justify-center gap-2 px-3 py-5 text-center text-[.62rem] font-bold uppercase tracking-[.12em]"><Comp size={15}/>{label as string}</div>})}</div></section>

      <section className="page-shell py-20 sm:py-28">
        <div className="mb-10 max-w-3xl"><p className="eyebrow text-ink/50">The first drop · The signature four</p><h2 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">One for every person who makes home.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-ink/60">We started with four fit-tested tees, made from premium cotton and designed to live together. More is coming, but it all begins here.</p></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-4">{products.map((product)=><ProductCard key={product.id} product={product}/>)}</div>
      </section>

      <section className="bg-ink text-cream"><div className="page-shell grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28"><div className="relative aspect-square overflow-hidden rounded-sm"><Image src="/images/rst-details-packaging.png" alt="RST Really Soft Tees embroidered signature details, labels, hang tags, and packaging" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div><div className="lg:pl-10"><p className="eyebrow text-cream/55">Look a little closer</p><h2 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">Our monogram, quietly done.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-cream/65">Most branding shouts. Ours doesn&apos;t. Every Really Soft Tee carries the RST monogram embroidered tone-on-tone on the chest — stitched, not printed, in a thread shade that sits close to the garment.</p><div className="mt-9 grid grid-cols-3 gap-3">{[["Stitched","Real embroidery, not a print"],["Tonal","Thread close to the garment color"],["Built in","On every tee, every color"]].map(([t,d])=><div key={t} className="border border-cream/15 p-4"><p className="text-xs font-bold uppercase tracking-[.14em]">{t}</p><p className="mt-2 text-xs leading-5 text-cream/55">{d}</p></div>)}</div></div></div></section>

      <section className="page-shell grid items-center gap-12 py-20 lg:grid-cols-[.8fr_1.2fr] lg:py-28"><div><p className="eyebrow text-ink/50">Riley · Shane · Tori</p><h2 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">Really Soft Tees is a family name.</h2><p className="mt-6 max-w-lg text-sm leading-7 text-ink/65">RST stands for Really Soft Tees. Quietly, it also stands for Riley, Shane, and Tori, the family behind the idea. We started with the shirt everyone wanted to change into, then made it softer, more dependable, and more personal.</p><Link href="/about" className="button-secondary mt-8">About us <ArrowRight size={15}/></Link></div><div className="rounded-sm bg-oatmeal/20 p-8 sm:p-12"><p className="font-display text-4xl leading-tight sm:text-6xl">“Clothing that feels like quality time: easy, familiar, and better when you&apos;re together.”</p><p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-ink/50">The RST idea</p></div></section>

      <section className="bg-sage/15"><div className="page-shell grid items-center gap-10 py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-28"><div><p className="eyebrow text-ink/50">Families supporting families</p><h2 className="mt-4 max-w-xl font-display text-5xl leading-tight sm:text-7xl">Every tee gives a dollar.</h2><p className="mt-6 max-w-lg text-sm leading-7 text-ink/65">For every Really Soft Tee sold, we donate {formatPrice(siteConfig.giving.amountPerTee)} to <a href={siteConfig.giving.url} target="_blank" rel="noopener noreferrer" className="underline">{siteConfig.giving.name}</a>, supporting their mission so that no family ever receives a bill for treatment, travel, housing, or food.</p><p className="mt-4 max-w-lg text-xs leading-5 text-ink/45">RST is an independent supporter. {siteConfig.giving.shortName} does not endorse RST products.</p></div><div className="rounded-sm border border-ink/10 bg-cream p-8 text-center sm:p-12"><HeartHandshake size={36} strokeWidth={1.3} className="mx-auto" /><p className="mt-6 font-display text-3xl leading-snug sm:text-4xl">Soft for your family.<br/>Kind to others.</p><p className="mt-4 text-xs text-ink/55">Built into every order, automatically.</p></div></div></section>

      <section className="bg-soft-rose/15"><div className="page-shell py-20 text-center sm:py-28"><p className="eyebrow text-ink/50">From our family to yours</p><h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">Be first to know when we drop something new.</h2><div className="mx-auto max-w-md text-left"><NewsletterForm source="homepage" /></div></div></section>
    </>
  );
}
