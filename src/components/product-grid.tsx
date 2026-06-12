"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";
import { ProductCard } from "./product-card";

export function ProductGrid({ initialProducts, showFilters = true }: { initialProducts: Product[]; showFilters?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const categories = ["All", ...Array.from(new Set(initialProducts.map((p) => p.category)))];
  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    const result = initialProducts.filter((product) => (category === "All" || product.category === category) && (!normalized || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(normalized)));
    return [...result].sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : 0);
  }, [initialProducts, query, category, sort]);

  return (
    <div>
      {showFilters && <div className="mb-8 flex flex-col gap-4 border-y border-ink/10 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs"><Search className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/45" size={18} /><label htmlFor="product-search" className="sr-only">Search products</label><input id="product-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search soft things" className="w-full border-b border-ink/25 bg-transparent py-2 pl-7 pr-8 text-sm outline-none focus:border-ink" />{query && <button onClick={() => setQuery("")} className="absolute right-0 top-1/2 -translate-y-1/2" aria-label="Clear search"><X size={15} /></button>}</div>
        <button className="flex items-center justify-between gap-3 border border-ink/15 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] sm:hidden" onClick={() => setFiltersOpen(!filtersOpen)}><span>Filter + sort</span><SlidersHorizontal size={16} /></button>
        <div className={`${filtersOpen ? "flex" : "hidden"} flex-col gap-3 sm:flex sm:flex-row`}>
          <label className="sr-only" htmlFor="category">Category</label><select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="border border-ink/15 bg-transparent px-4 py-3 text-xs font-semibold outline-none">{categories.map((item) => <option key={item}>{item}</option>)}</select>
          <label className="sr-only" htmlFor="sort">Sort products</label><select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="border border-ink/15 bg-transparent px-4 py-3 text-xs font-semibold outline-none"><option value="featured">Featured</option><option value="rating">Highest rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select>
        </div>
      </div>}
      <p className="mb-5 text-xs text-ink/50">{filtered.length} {filtered.length === 1 ? "style" : "styles"}</p>
      {filtered.length ? <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} />)}</div> : <div className="rounded-sm bg-oatmeal/20 px-6 py-20 text-center"><h3 className="font-display text-3xl">Nothing quite matches that.</h3><button className="mt-4 text-sm underline" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>}
    </div>
  );
}
