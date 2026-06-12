"use client";

import Link from "next/link";
import { ArrowLeft, HeartHandshake, LoaderCircle, Lock } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/lib/catalog";
import { siteConfig } from "@/lib/constants";
import { useCart } from "./cart-provider";
import { TeeMockup } from "./tee-mockup";

export function CheckoutPanel() {
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function checkout() {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: items.map(({ productId, size, color, quantity }) => ({ productId, size, color, quantity })) }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Checkout is unavailable.");
      window.location.href = result.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout is unavailable.");
      setLoading(false);
    }
  }
  if (!items.length) return <div className="mx-auto max-w-xl px-6 py-24 text-center"><h1 className="font-display text-5xl">Your bag is empty.</h1><p className="mt-4 text-ink/60">There&apos;s still plenty of softness to find.</p><Link href="/shop" className="button-primary mt-8">Shop the collection</Link></div>;
  return (
    <div className="page-shell grid gap-12 py-10 lg:grid-cols-[1fr_.75fr] lg:py-16">
      <section><Link href="/shop" className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]"><ArrowLeft size={15} /> Continue shopping</Link><h1 className="font-display text-5xl sm:text-6xl">Ready to come home?</h1><p className="mt-4 max-w-lg text-sm leading-6 text-ink/60">You&apos;ll complete payment through Stripe&apos;s encrypted checkout. Apple Pay, Google Pay, cards, and Link are supported when available.</p><div className="mt-10 rounded-sm border border-ink/10 bg-white/45 p-5"><div className="flex items-center gap-3"><Lock size={18} /><div><p className="text-sm font-semibold">Secure checkout</p><p className="text-xs text-ink/55">Payment details never touch our servers.</p></div></div></div></section>
      <aside className="rounded-sm bg-oatmeal/22 p-5 sm:p-7"><h2 className="text-xs font-bold uppercase tracking-[0.16em]">Order summary</h2><div className="mt-5 divide-y divide-ink/10">{items.map((item) => <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 py-4"><div className="flex h-20 w-16 shrink-0 items-center justify-center overflow-hidden bg-cream p-1"><TeeMockup color={item.colorHex} accent={item.accent} detailType={item.detailType} snaps={item.snaps} className="h-full w-full" /></div><div className="flex-1"><div className="flex justify-between gap-3 text-sm"><span className="font-semibold">{item.name} × {item.quantity}</span><span>{formatPrice(item.price * item.quantity)}</span></div><p className="mt-1 text-xs text-ink/55">{item.color} / {item.size}</p></div></div>)}</div><div className="mt-5 space-y-3 border-t border-ink/15 pt-5 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between"><span>Shipping</span><span>{subtotal >= siteConfig.freeShippingThreshold ? "Free" : "Calculated"}</span></div><div className="flex justify-between border-t border-ink/15 pt-4 text-base font-bold"><span>Total</span><span>{formatPrice(subtotal)} USD</span></div></div><p className="mt-4 flex items-center gap-1.5 text-xs text-ink/55"><HeartHandshake size={13} /> This order gives {formatPrice(items.reduce((sum, item) => sum + item.quantity, 0) * siteConfig.giving.amountPerTee)} to {siteConfig.giving.shortName}.</p><button className="button-primary mt-6 w-full" disabled={loading} onClick={checkout}>{loading ? <><LoaderCircle className="animate-spin" size={17} /> Opening secure checkout</> : "Continue to payment"}</button>{error && <p className="mt-4 text-sm text-red-700" role="alert">{error}</p>}</aside>
    </div>
  );
}
