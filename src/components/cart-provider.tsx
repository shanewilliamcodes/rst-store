"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  colorHex: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const itemKey = (item: Pick<CartItem, "productId" | "size" | "color">) => `${item.productId}:${item.size}:${item.color}`;
const STORAGE_KEY = "rst-cart-v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) setItems(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => ({
    items,
    isOpen,
    setIsOpen,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    addItem(product, size, color, quantity = 1) {
      const colorHex = product.colors.find((candidate) => candidate.name === color)?.hex ?? product.colors[0].hex;
      const next: CartItem = { productId: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, size, color, colorHex, quantity };
      setItems((current) => {
        const existing = current.find((item) => itemKey(item) === itemKey(next));
        if (!existing) return [...current, next];
        return current.map((item) => itemKey(item) === itemKey(next) ? { ...item, quantity: item.quantity + quantity } : item);
      });
      setIsOpen(true);
    },
    updateQuantity(key, quantity) {
      setItems((current) => quantity < 1 ? current.filter((item) => itemKey(item) !== key) : current.map((item) => itemKey(item) === key ? { ...item, quantity } : item));
    },
    removeItem(key) {
      setItems((current) => current.filter((item) => itemKey(item) !== key));
    },
    clearCart,
  }), [items, isOpen, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

export { itemKey };
