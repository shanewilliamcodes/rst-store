"use client";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/components/cart-provider";
export default function SuccessPage() { const { clearCart } = useCart(); useEffect(() => clearCart(), [clearCart]); return <div className="page-shell flex min-h-[65vh] flex-col items-center justify-center py-20 text-center"><CheckCircle2 size={44} strokeWidth={1.3} className="text-sage" /><p className="eyebrow mt-7 text-ink/50">Order confirmed</p><h1 className="mt-3 font-display text-5xl sm:text-7xl">Welcome home.</h1><p className="mt-5 max-w-lg text-sm leading-7 text-ink/60">Your soft things are officially on the way. A receipt and order details have been sent to your email. And because every tee gives, part of this order is headed to St. Jude Children&apos;s Research Hospital.</p><Link href="/shop" className="button-primary mt-8">Keep browsing</Link></div>; }
