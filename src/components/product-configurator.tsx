"use client";

import { useState } from "react";
import { Check, HeartHandshake, Minus, Plus } from "lucide-react";
import { formatPrice, type Product } from "@/lib/catalog";
import { siteConfig } from "@/lib/constants";
import { SignatureIcon } from "./signature-icon";
import { TeeMockup } from "./tee-mockup";
import { useCart } from "./cart-provider";

export function ProductPreview({ product, color }: { product: Product; color: string }) {
  const selected = product.colors.find((item) => item.name === color) ?? product.colors[0];
  return (
    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-oatmeal/25 p-6 sm:p-10">
      <TeeMockup key={selected.hex} color={selected.hex} accent={product.accent} detailType={product.detailType} snaps={product.snaps} className="h-full w-full animate-[fadeIn_.35s_ease]" />
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-cream/90 px-4 py-1.5 text-[.62rem] font-bold uppercase tracking-[.14em] text-ink/70">{product.shortName} · {selected.name}</span>
    </div>
  );
}

export function ProductConfigurator({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2 lg:sticky lg:top-28 lg:self-start">
          <ProductPreview product={product} color={color} />
          <p className="mt-3 text-center text-xs text-ink/50">Live preview — switch colors to see your exact tee.</p>
        </div>
        <div className="flex aspect-square items-center justify-center bg-oatmeal/22 p-8">
          <div className="text-center">
            <SignatureIcon type={product.detailType} color={product.accent} className="mx-auto h-9 w-9" />
            <p className="mt-5 font-display text-3xl">The signature.</p>
            <p className="mt-3 text-xs leading-5 text-ink/55">{product.signatureDetail}</p>
          </div>
        </div>
        <div className="flex aspect-square items-center justify-center bg-sage/15 p-8">
          <div className="text-center">
            <HeartHandshake size={30} strokeWidth={1.4} className="mx-auto" />
            <p className="mt-5 font-display text-3xl">Every tee gives.</p>
            <p className="mt-3 text-xs leading-5 text-ink/55">{formatPrice(siteConfig.giving.amountPerTee)} from every tee goes to {siteConfig.giving.name}.</p>
          </div>
        </div>
      </div>

      <section className="lg:self-start">
        <p className="eyebrow text-ink/50">RST · Really Soft Tees</p>
        <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">{product.name}</h1>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg">{formatPrice(product.price)}</span>
          <span className="flex items-center gap-1.5 text-xs text-ink/60"><HeartHandshake size={13} /> {formatPrice(siteConfig.giving.amountPerTee)} to {siteConfig.giving.shortName}</span>
        </div>
        <p className="mt-6 text-sm leading-7 text-ink/65">{product.description}</p>
        <div className="mt-6 border-l-2 pl-4" style={{ borderColor: product.accent }}>
          <p className="text-[.65rem] font-bold uppercase tracking-[.16em]">The signature detail</p>
          <p className="mt-2 text-sm text-ink/60">{product.signatureDetail} RST lives quietly on the opposite sleeve.</p>
        </div>

        <div className="mt-8">
          <fieldset>
            <legend className="flex w-full justify-between text-xs font-bold uppercase tracking-[0.14em]"><span>Color</span><span className="normal-case tracking-normal text-ink/55">{color}</span></legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map((item) => (
                <button key={item.name} onClick={() => setColor(item.name)} className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${color === item.name ? "border-ink" : "border-transparent"}`} aria-label={`Preview ${item.name}`} aria-pressed={color === item.name}>
                  <span className="h-7 w-7 rounded-full border border-ink/10" style={{ backgroundColor: item.hex }}>{color === item.name && <Check className="m-auto h-full w-3.5 text-white drop-shadow" />}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-7">
            <legend className="flex w-full justify-between text-xs font-bold uppercase tracking-[0.14em]"><span>Size</span><a href="/size-guide" className="normal-case tracking-normal text-ink/55 underline">Size guide</a></legend>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
              {product.sizes.map((item) => (
                <button key={item} onClick={() => setSize(item)} className={`min-h-11 border px-2 text-xs font-semibold transition ${size === item ? "border-ink bg-ink text-cream" : "border-ink/15 hover:border-ink/50"}`} aria-pressed={size === item}>{item}</button>
              ))}
            </div>
          </fieldset>
          <div className="mt-7 flex gap-3">
            <div className="flex items-center border border-ink/15">
              <button className="p-3" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={15} /></button>
              <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
              <button className="p-3" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={15} /></button>
            </div>
            <button className="button-primary flex-1" onClick={() => addItem(product, size, color, quantity)}>Add to bag</button>
          </div>
          <p className="mt-4 text-center text-xs text-ink/55">Free exchanges within 30 days. Free shipping over {formatPrice(siteConfig.freeShippingThreshold)}.</p>
        </div>

        <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {[["Details", product.details], ["Fit", [product.fit]], ["Fabric + care", [product.fabric, "Machine wash cold with like colors. Tumble dry low."]]].map(([title, content]) => (
            <details key={title as string} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold uppercase tracking-[.14em]">{title as string}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition group-open:rotate-180"><path d="m6 9 6 6 6-6" /></svg></summary>
              <div className="pt-4 text-sm leading-6 text-ink/60"><ul className="space-y-1">{(content as string[]).map((line) => <li key={line}>{line}</li>)}</ul></div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
