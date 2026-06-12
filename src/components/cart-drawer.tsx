"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { siteConfig } from "@/lib/constants";
import { itemKey, useCart } from "./cart-provider";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, subtotal, updateQuantity, removeItem } = useCart();
  const remaining = Math.max(0, siteConfig.freeShippingThreshold - subtotal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]" onClick={() => setIsOpen(false)} aria-label="Close cart" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <div className="flex items-center gap-3"><ShoppingBag size={18} /><h2 className="text-sm font-bold uppercase tracking-[0.18em]">Your soft things</h2></div>
          <button className="rounded-full p-2 hover:bg-ink/5" onClick={() => setIsOpen(false)} aria-label="Close cart"><X size={20} /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-5 rounded-full bg-oatmeal/35 p-5"><ShoppingBag size={28} strokeWidth={1.5} /></div>
            <h3 className="font-display text-3xl">Your bag is taking it easy.</h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-ink/65">Fill it with the soft, shape-holding staples you&apos;ll reach for every day.</p>
            <Link href="/shop" className="button-primary mt-7" onClick={() => setIsOpen(false)}>Meet the four tees</Link>
          </div>
        ) : (
          <>
            <div className="border-b border-ink/10 bg-white/45 px-6 py-4">
              <p className="text-center text-xs font-semibold">{remaining > 0 ? `${formatPrice(remaining)} away from free shipping` : "You unlocked free shipping"}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-sage transition-all" style={{ width: `${Math.min(100, subtotal / siteConfig.freeShippingThreshold * 100)}%` }} /></div>
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              {items.map((item) => {
                const key = itemKey(item);
                return (
                  <div key={key} className="flex gap-4 border-b border-ink/10 py-5">
                    <Link href={`/products/${item.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-sm bg-oatmeal/30" onClick={() => setIsOpen(false)}>
                      <Image src={item.image} alt="" fill sizes="96px" className="object-cover" />
                      <span className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-full border border-white/80 shadow" style={{ backgroundColor: item.colorHex }} title={item.color} />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-4"><Link href={`/products/${item.slug}`} className="font-semibold hover:underline" onClick={() => setIsOpen(false)}>{item.name}</Link><span className="text-sm">{formatPrice(item.price * item.quantity)}</span></div>
                      <p className="mt-1 text-xs text-ink/55">{item.color} / {item.size}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-ink/15">
                          <button className="p-2" onClick={() => updateQuantity(key, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={12} /></button>
                          <span className="w-7 text-center text-xs font-semibold">{item.quantity}</span>
                          <button className="p-2" onClick={() => updateQuantity(key, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}><Plus size={12} /></button>
                        </div>
                        <button className="text-xs text-ink/50 underline hover:text-ink" onClick={() => removeItem(key)}>Remove</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-ink/10 bg-white/50 p-6">
              <div className="flex justify-between text-sm"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p className="mt-2 text-xs text-ink/55">Shipping and taxes calculated at checkout.</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-ink/55"><HeartHandshake size={13} /> This bag gives {formatPrice(items.reduce((sum, item) => sum + item.quantity, 0) * siteConfig.giving.amountPerTee)} to {siteConfig.giving.shortName}.</p>
              <Link href="/checkout" className="button-primary mt-5 w-full" onClick={() => setIsOpen(false)}>Secure checkout</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
