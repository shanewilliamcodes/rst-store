import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = { title: "About Us", description: "Meet Riley, Shane, and Tori, the family behind RST Really Soft Tees." };

export default function AboutPage() {
  return (
    <>
      <section className="page-shell grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div><p className="eyebrow text-ink/50">About us</p><h1 className="mt-4 font-display text-6xl leading-[.95] sm:text-8xl">RST.<br /><span className="text-ink/45">Really Soft Tees.</span></h1><p className="mt-7 max-w-lg text-base leading-8 text-ink/65">It is the name of what we make. It is also the beginning of our family&apos;s names: Riley, Shane, and Tori.</p></div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm"><Image src="/images/rst-family-hero.png" alt="The family behind RST Really Soft Tees relaxing together at home" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div>
      </section>

      <section className="bg-oatmeal/20"><div className="page-shell grid gap-12 py-20 lg:grid-cols-[.7fr_1.3fr] lg:py-28"><p className="eyebrow text-ink/50">How it started</p><div><h2 className="font-display text-5xl leading-tight sm:text-7xl">We wanted to make the shirt you change into.</h2><div className="mt-8 max-w-2xl space-y-5 text-sm leading-7 text-ink/65"><p>The idea for RST came from ordinary family life: long days, shoes by the door, everybody finally home, and the immediate search for something softer to wear.</p><p>We loved the comfort of an old favorite tee, but not the way so many “soft” shirts shrank, twisted, stiffened, or lost their shape after laundry day. We wanted to make that feeling dependable.</p><p>So we began with four people in mind: Mom, Dad, Baby, and Little. Four tees to start. Premium cotton. Relaxed fits. Colors that live easily together. Nothing extra unless it means something.</p></div></div></div></section>

      <section className="page-shell py-20 sm:py-28"><div className="max-w-3xl"><p className="eyebrow text-ink/50">The detail that matters</p><h2 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">One quiet mark, on every tee.</h2><p className="mt-6 text-sm leading-7 text-ink/65">Every RST tee carries the same signature: the RST monogram, embroidered tone-on-tone on the chest. Stitched, not printed. Close to the color of the shirt, so it reads as quality rather than a logo for strangers — a small mark for the person wearing it.</p></div></section>

      <section className="bg-ink text-cream"><div className="page-shell grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28"><div className="flex aspect-square items-center justify-center rounded-sm bg-cream/8 p-10 text-center"><div><HeartHandshake size={44} strokeWidth={1.2} className="mx-auto text-cream/85" /><p className="mt-8 font-display text-4xl leading-snug sm:text-5xl">Every tee gives $1 to {siteConfig.giving.shortName}.</p><p className="mt-5 text-xs leading-6 text-cream/55">We donate $1 from every Really Soft Tee to {siteConfig.giving.name}. RST is an independent supporter; {siteConfig.giving.shortName} does not endorse RST products.</p></div></div><div><p className="eyebrow text-cream/50">From our family to yours</p><h2 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">Comfort, quality time, and a little kindness.</h2><p className="mt-6 max-w-lg text-sm leading-7 text-cream/65">That is the whole RST philosophy. Make fewer things. Make them thoughtfully. Make them soft enough to become part of the life happening at home — and let every order quietly help a family that needs it.</p><Link href="/shop" className="button-secondary mt-8">Meet the first four</Link></div></div></section>
    </>
  );
}
