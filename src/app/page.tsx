import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Heart, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { collections, products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { NewsletterForm } from "@/components/newsletter-form";

export default function HomePage() {
  const bestSellers = products.filter((product) => product.collections.includes("best-sellers")).slice(0, 4);
  return (
    <>
      <section className="relative min-h-[77vh] overflow-hidden bg-oatmeal/30 sm:min-h-[82vh]">
        <Image src="/images/hero-family.png" alt="A family relaxing together at home in coordinated soft RST tees" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "center center" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/18 to-transparent sm:from-ink/48" />
        <div className="page-shell relative flex min-h-[77vh] items-end pb-12 pt-28 sm:min-h-[82vh] sm:items-center sm:pb-0">
          <div className="max-w-xl text-cream"><p className="eyebrow">Made for the people who make home</p><h1 className="mt-5 font-display text-[3.5rem] leading-[.94] sm:text-7xl lg:text-[6rem]">Come home<br />to comfort.</h1><p className="mt-6 max-w-md text-sm leading-6 text-cream/85 sm:text-base sm:leading-7">Premium family essentials that stay soft, keep their shape, and feel like the best part of your day.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/shop" className="button-primary !border-cream !bg-cream !text-ink hover:!bg-white">Shop the first drop</Link><Link href="/our-softness" className="button-secondary">Why it stays soft</Link></div></div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-cream"><div className="page-shell grid grid-cols-2 divide-x divide-y divide-ink/10 py-2 md:grid-cols-4 md:divide-y-0">{[[Sparkles, "Soft from first wear"], [RefreshCw, "Shrink-resistant"], [ShieldCheck, "30-day exchanges"], [Heart, "Made for family life"]].map(([Icon, label]) => { const Comp = Icon as typeof Sparkles; return <div key={label as string} className="flex items-center justify-center gap-2 px-3 py-4 text-center text-[0.62rem] font-bold uppercase tracking-[0.12em]"><Comp size={15} strokeWidth={1.6} /><span>{label as string}</span></div>; })}</div></section>

      <section className="page-shell py-20 sm:py-28">
        <div className="mb-10 flex items-end justify-between gap-5"><div><p className="eyebrow text-ink/55">The first things you&apos;ll reach for</p><h2 className="mt-3 font-display text-4xl sm:text-6xl">Really soft. Really reliable.</h2></div><Link href="/shop" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] sm:flex">Shop all <ArrowRight size={15} /></Link></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-4">{bestSellers.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 2} />)}</div><Link href="/shop" className="button-secondary mt-10 w-full sm:hidden">Shop all</Link>
      </section>

      <section className="bg-sage text-cream"><div className="page-shell grid items-stretch lg:grid-cols-2"><div className="relative min-h-[520px] lg:order-2"><Image src="/images/tees-flatlay.png" alt="RST tees folded in a palette of warm, restful colors" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div><div className="flex flex-col justify-center py-16 lg:pr-20"><p className="eyebrow text-cream/70">The softness standard</p><h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.02] sm:text-7xl">Soft shouldn&apos;t be temporary.</h2><p className="mt-6 max-w-lg text-sm leading-7 text-cream/80">Most soft tees are at their best before the first wash. We started RST because that never made sense. Our dense, long-staple cotton is pre-washed, shape-tested, and finished to feel better with real life.</p><div className="mt-9 grid gap-6 sm:grid-cols-2"><div><p className="font-display text-3xl">6.5 oz.</p><p className="mt-1 text-xs uppercase tracking-[.13em] text-cream/65">Premium fabric weight</p></div><div><p className="font-display text-3xl">50 washes</p><p className="mt-1 text-xs uppercase tracking-[.13em] text-cream/65">Fit and feel tested</p></div></div><Link href="/our-softness" className="button-secondary mt-10 self-start">Meet our fabric</Link></div></div></section>

      <section className="page-shell py-20 sm:py-28"><div className="mb-10 text-center"><p className="eyebrow text-ink/55">Comfort, for everyone</p><h2 className="mt-3 font-display text-4xl sm:text-6xl">Find your people.</h2></div><div className="grid gap-4 md:grid-cols-3">{collections.slice(0, 3).map((collection) => <Link href={`/collections/${collection.slug}`} key={collection.slug} className="group relative min-h-[520px] overflow-hidden rounded-sm"><Image src={collection.image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" /><div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-cream"><h3 className="font-display text-4xl">{collection.name}</h3><p className="mt-2 max-w-xs text-sm text-cream/80">{collection.description}</p><span className="mt-5 inline-flex items-center gap-2 text-[.68rem] font-bold uppercase tracking-[.15em]">Shop collection <ArrowRight size={14} /></span></div></Link>)}</div></section>

      <section className="bg-soft-rose/20"><div className="page-shell grid items-center gap-12 py-20 lg:grid-cols-[.85fr_1.15fr] lg:py-28"><div><p className="eyebrow text-ink/55">Why RST</p><h2 className="mt-4 font-display text-5xl leading-tight sm:text-6xl">Three names.<br />One softer idea.</h2><p className="mt-6 max-w-lg text-sm leading-7 text-ink/65">RST stands for Really Soft Tees. Quietly, it also stands for Riley, Shane, and Tori, the family behind the idea. It began with one question: why does the shirt you want to change into always lose its magic after laundry day?</p><Link href="/about" className="button-secondary mt-8">Our story</Link></div><blockquote className="border-l border-ink/20 pl-8 sm:pl-12"><BadgeCheck size={26} strokeWidth={1.4} /><p className="mt-7 font-display text-4xl leading-tight sm:text-6xl">“I washed it, dried it, wore it again, and it somehow felt even better.”</p><footer className="mt-6 text-xs font-bold uppercase tracking-[.15em] text-ink/55">Mara L. · Verified soft-shirt person</footer></blockquote></div></section>

      <section className="page-shell py-20 text-center sm:py-28"><p className="eyebrow text-ink/55">A note from home</p><h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">Get 15% off your first order, plus the good kind of family email.</h2><div className="mx-auto max-w-md text-left"><NewsletterForm source="homepage" /></div><p className="mt-4 text-xs text-ink/45">No noise. Just new softness, thoughtful notes, and occasional early access.</p></section>
    </>
  );
}
