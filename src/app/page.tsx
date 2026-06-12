import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { HiddenDetailIcon } from "@/components/hidden-detail-icon";

const details = [
  { type: "heart" as const, color: "#ff3fa4", label: "Mom", copy: "A tiny heart under the cuff." },
  { type: "mustache" as const, color: "#ff6a22", label: "Dad", copy: "A mustache inside the side seam." },
  { type: "bottle" as const, color: "#20e3e3", label: "Baby", copy: "A bottle behind the shoulder snaps." },
  { type: "blocks" as const, color: "#b8ff2c", label: "Little", copy: "ABC blocks inside the hem." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[80vh] overflow-hidden bg-oatmeal/30">
        <Image src="/images/rst-family-hero.png" alt="The RST family wearing matching neutral Really Soft Tees with hidden neon embroidery" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-ink/20 to-transparent" />
        <div className="page-shell relative flex min-h-[80vh] items-end pb-12 pt-28 sm:items-center sm:pb-0">
          <div className="max-w-2xl text-cream">
            <p className="eyebrow">RST · Really Soft Tees</p>
            <h1 className="mt-5 font-display text-[3.6rem] leading-[.93] sm:text-7xl lg:text-[6.4rem]">Soft enough<br />to feel like home.</h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-cream/85 sm:text-base">Four exceptionally soft family tees. Each one finished with a tiny hidden neon detail made to be discovered.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/shop" className="button-primary !border-cream !bg-cream !text-ink hover:!bg-white">Meet the four</Link><Link href="/about" className="button-secondary">Our family story</Link></div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10"><div className="page-shell grid grid-cols-2 divide-x divide-y divide-ink/10 md:grid-cols-4 md:divide-y-0">{[[Sparkles,"Really soft, actually"],[Eye,"Hidden neon details"],[RefreshCw,"Shrink-resistant"],[ShieldCheck,"Only four, done right"]].map(([Icon,label])=>{const Comp=Icon as typeof Sparkles;return <div key={label as string} className="flex items-center justify-center gap-2 px-3 py-5 text-center text-[.62rem] font-bold uppercase tracking-[.12em]"><Comp size={15}/>{label as string}</div>})}</div></section>

      <section className="page-shell py-20 sm:py-28">
        <div className="mb-10 max-w-3xl"><p className="eyebrow text-ink/50">The first drop · Four tees only</p><h2 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">One for every person who makes home.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-ink/60">No filler. No endless assortment. Just four fit-tested tees, made from premium cotton and designed to live together.</p></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-4">{products.map((product,index)=><ProductCard key={product.id} product={product} priority={index<2}/>)}</div>
      </section>

      <section className="bg-ink text-cream"><div className="page-shell grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28"><div className="relative aspect-square overflow-hidden rounded-sm"><Image src="/images/rst-details-packaging.png" alt="RST Really Soft Tees hidden embroidery, labels, hang tags, and packaging" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div><div className="lg:pl-10"><p className="eyebrow text-cream/55">Look a little closer</p><h2 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">The best part is hidden.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-cream/65">Most branding asks to be seen. Ours rewards attention. Every Really Soft Tee carries a private embroidered detail in a bright little flash of neon, a family signature tucked into the seams.</p><div className="mt-9 grid grid-cols-2 gap-3">{details.map((detail)=><div key={detail.label} className="border border-cream/15 p-4"><HiddenDetailIcon type={detail.type} color={detail.color} className="h-7 w-7"/><p className="mt-4 text-xs font-bold uppercase tracking-[.14em]">{detail.label}</p><p className="mt-2 text-xs leading-5 text-cream/55">{detail.copy}</p></div>)}</div></div></div></section>

      <section className="page-shell grid items-center gap-12 py-20 lg:grid-cols-[.8fr_1.2fr] lg:py-28"><div><p className="eyebrow text-ink/50">Riley · Shane · Tori</p><h2 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">Really Soft Tees is a family name.</h2><p className="mt-6 max-w-lg text-sm leading-7 text-ink/65">RST stands for Really Soft Tees. Quietly, it also stands for Riley, Shane, and Tori, the family behind the idea. We started with the shirt everyone wanted to change into, then made it softer, more dependable, and more personal.</p><Link href="/about" className="button-secondary mt-8">About us <ArrowRight size={15}/></Link></div><div className="rounded-sm bg-oatmeal/20 p-8 sm:p-12"><p className="font-display text-4xl leading-tight sm:text-6xl">“Clothing that feels like quality time: easy, familiar, and better when you&apos;re together.”</p><p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-ink/50">The RST idea</p></div></section>

      <section className="bg-soft-rose/15"><div className="page-shell py-20 text-center sm:py-28"><p className="eyebrow text-ink/50">From our family to yours</p><h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">Get 15% off your first Really Soft Tees order.</h2><div className="mx-auto max-w-md text-left"><NewsletterForm source="homepage" /></div></div></section>
    </>
  );
}
