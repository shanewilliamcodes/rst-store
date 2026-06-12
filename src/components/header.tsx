"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { useCart } from "./cart-provider";

const links = [
  ["Home", "/"], ["Shop", "/shop"], ["About Us", "/about"], ["FAQ", "/faq"], ["Contact", "/contact"],
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  return (
    <>
      <div className="bg-ink px-4 py-2.5 text-center text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream">Free U.S. shipping on orders $75+</div>
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/95 backdrop-blur-md">
        <div className="page-shell flex h-[72px] items-center justify-between">
          <button className="p-2 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {links.map(([label, href]) => <Link key={label} href={href} className="nav-link">{label}</Link>)}
          </nav>
          <div className="flex items-center gap-1">
            <button className="relative rounded-full p-2.5 hover:bg-ink/5" onClick={() => setIsOpen(true)} aria-label={`Open cart with ${itemCount} items`}>
              <ShoppingBag size={20} strokeWidth={1.7} />
              {itemCount > 0 && <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-terra px-1 text-[0.62rem] font-bold text-white">{itemCount}</span>}
            </button>
          </div>
        </div>
      </header>
      {menuOpen && <div className="fixed inset-0 z-[80] bg-cream lg:hidden">
        <div className="flex h-[72px] items-center justify-between border-b border-ink/10 px-5"><Logo /><button className="p-2" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div>
        <nav className="flex flex-col px-6 py-8" aria-label="Mobile navigation">
          {links.map(([label, href]) => <Link key={label} href={href} className="border-b border-ink/10 py-4 font-display text-3xl" onClick={() => setMenuOpen(false)}>{label}</Link>)}
        </nav>
        <div className="mx-6 rounded-sm bg-sage/15 p-6"><p className="text-xs font-bold uppercase tracking-[0.18em]">RST · Really Soft Tees</p><p className="mt-3 font-display text-2xl">Four tees. Four hidden details. One soft family idea.</p></div>
      </div>}
    </>
  );
}
