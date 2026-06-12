"use client";

import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { useCart } from "./cart-provider";

export function AddToCart({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  return (
    <div className="mt-8">
      <fieldset><legend className="flex w-full justify-between text-xs font-bold uppercase tracking-[0.14em]"><span>Color</span><span className="normal-case tracking-normal text-ink/55">{color}</span></legend><div className="mt-3 flex flex-wrap gap-3">{product.colors.map((item) => <button key={item.name} onClick={() => setColor(item.name)} className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${color === item.name ? "border-ink" : "border-transparent"}`} aria-label={item.name} aria-pressed={color === item.name}><span className="h-7 w-7 rounded-full border border-ink/10" style={{ backgroundColor: item.hex }}>{color === item.name && <Check className="m-auto h-full w-3.5 text-white drop-shadow" />}</span></button>)}</div></fieldset>
      <fieldset className="mt-7"><legend className="flex w-full justify-between text-xs font-bold uppercase tracking-[0.14em]"><span>Size</span><a href="/size-guide" className="normal-case tracking-normal text-ink/55 underline">Size guide</a></legend><div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">{product.sizes.map((item) => <button key={item} onClick={() => setSize(item)} className={`min-h-11 border px-2 text-xs font-semibold transition ${size === item ? "border-ink bg-ink text-cream" : "border-ink/15 hover:border-ink/50"}`} aria-pressed={size === item}>{item}</button>)}</div></fieldset>
      <div className="mt-7 flex gap-3"><div className="flex items-center border border-ink/15"><button className="p-3" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={15} /></button><span className="w-8 text-center text-sm font-semibold">{quantity}</span><button className="p-3" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={15} /></button></div><button className="button-primary flex-1" onClick={() => addItem(product, size, color, quantity)}>Add to bag</button></div>
      <p className="mt-4 text-center text-xs text-ink/55">Free exchanges within 30 days. Free shipping over $75.</p>
    </div>
  );
}
