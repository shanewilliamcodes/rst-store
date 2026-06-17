"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, HeartHandshake, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import { formatPrice, type Product } from "@/lib/catalog";
import { getMockupUrl } from "@/lib/fulfillment";
import { siteConfig } from "@/lib/constants";
import { useCart } from "./cart-provider";

export function ProductConfigurator({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const selected = product.colors.find((item) => item.name === color) ?? product.colors[0];
  const heroSrc = getMockupUrl(product.slug, selected.name) ?? product.image;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-oatmeal/25">
          <Image key={heroSrc} src={heroSrc} alt={`${product.name} in ${selected.name}`} fill priority sizes="(max-width:1024px) 100vw, 55vw" className="animate-[fadeIn_.4s_ease] object-cover" style={{ objectPosition: product.imagePosition ?? "center" }} />
          <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-cream/90 px-3.5 py-2 text-[.68rem] font-semibold text-ink/75 shadow-sm">
            <span className="h-3.5 w-3.5 rounded-full border border-ink/15" style={{ backgroundColor: selected.hex }} />
            {selected.name}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-center gap-3 rounded-lg bg-sage/15 px-4 py-3 text-center text-xs text-ink/65">
          <HeartHandshake size={16} strokeWidth={1.5} /> {formatPrice(siteConfig.giving.amountPerTee)} from this tee goes to {siteConfig.giving.name}.
        </div>
      </div>

      <section className="lg:self-start">
        <p className="eyebrow text-ink/50">RST · Really Soft Tees</p>
        <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">{product.name}</h1>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-medium">{formatPrice(product.price)}</span>
          <span className="flex items-center gap-1.5 text-xs text-ink/60"><HeartHandshake size={13} /> {formatPrice(siteConfig.giving.amountPerTee)} to {siteConfig.giving.shortName}</span>
        </div>
        <p className="mt-6 text-sm leading-7 text-ink/65">{product.description}</p>
        <p className="mt-4 text-sm text-ink/65"><span className="font-semibold text-ink">Fabric:</span> {product.fabric}</p>

        <div className="mt-8">
          <fieldset>
            <legend className="flex w-full justify-between text-xs font-bold uppercase tracking-[0.14em]"><span>Color</span><span className="normal-case tracking-normal text-ink/55">{color}</span></legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map((item) => (
                <button key={item.name} onClick={() => setColor(item.name)} className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${color === item.name ? "border-ink" : "border-transparent hover:border-ink/30"}`} aria-label={`Show ${item.name}`} aria-pressed={color === item.name}>
                  <span className="h-7 w-7 rounded-full border border-ink/10" style={{ backgroundColor: item.hex }}>{color === item.name && <Check className="m-auto h-full w-3.5 text-white drop-shadow" />}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-7">
            <legend className="flex w-full justify-between text-xs font-bold uppercase tracking-[0.14em]"><span>Size</span><a href="/size-guide" className="normal-case tracking-normal text-ink/55 underline underline-offset-2 hover:text-ink">Size guide</a></legend>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
              {product.sizes.map((item) => (
                <button key={item} onClick={() => setSize(item)} className={`min-h-11 rounded-md border px-2 text-xs font-semibold uppercase transition ${size === item ? "border-ink bg-ink text-cream" : "border-ink/15 hover:border-ink/50"}`} aria-pressed={size === item}>{item}</button>
              ))}
            </div>
          </fieldset>
          <div className="mt-7 flex gap-3">
            <div className="flex items-center rounded-full border border-ink/15">
              <button className="p-3 pl-4" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={15} /></button>
              <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
              <button className="p-3 pr-4" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={15} /></button>
            </div>
            <button className="button-primary flex-1" onClick={() => addItem(product, size, color, quantity)}>Add to bag · {formatPrice(product.price * quantity)}</button>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 rounded-lg border border-ink/10 bg-white/40 p-4 text-center">
            {[[Truck, `Free shipping over ${formatPrice(siteConfig.freeShippingThreshold)}`], [RotateCcw, "30-day free exchanges"], [HeartHandshake, `${formatPrice(siteConfig.giving.amountPerTee)} to ${siteConfig.giving.shortName}`]].map(([Icon, label]) => {
              const Comp = Icon as typeof Truck;
              return <div key={label as string} className="flex flex-col items-center gap-2 text-[.68rem] leading-4 text-ink/70"><Comp size={17} strokeWidth={1.6} />{label as string}</div>;
            })}
          </div>
        </div>

        <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {[["Details", product.details], ["Fit", [product.fit]], ["Care", ["Machine wash cold with like colors. Tumble dry low.", "Pre-washed — engineered to hold its shape."]]].map(([title, content], index) => (
            <details key={title as string} className="group py-4" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold uppercase tracking-[.14em]">{title as string}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition group-open:rotate-180"><path d="m6 9 6 6 6-6" /></svg></summary>
              <div className="pt-4 text-sm leading-6 text-ink/60"><ul className="space-y-1">{(content as string[]).map((line) => <li key={line}>{line}</li>)}</ul></div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
