import Link from "next/link";
import { formatPrice, type Product } from "@/lib/catalog";
import { TeeMockup } from "./tee-mockup";

export function ProductCard({ product }: { product: Product; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-oatmeal/25 p-4 sm:p-6">
        <TeeMockup color={product.colors[0].hex} accent={product.accent} detailType={product.detailType} snaps={product.snaps} className="h-full w-full transition duration-700 ease-out group-hover:scale-[1.04]" />
        {product.badge && <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em]">{product.badge}</span>}
        <span className="absolute bottom-3 left-3 right-3 translate-y-2 rounded-sm bg-cream/95 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">Choose your soft</span>
      </Link>
      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold"><Link href={`/products/${product.slug}`} className="hover:underline">{product.name}</Link></h3>
            <div className="mt-2 flex items-center gap-1.5">{product.colors.map((color) => <span key={color.name} className="h-3.5 w-3.5 rounded-full border border-ink/15" style={{ backgroundColor: color.hex }} title={color.name} />)}</div>
          </div>
          <div className="text-right text-sm"><span>{formatPrice(product.price)}</span>{product.compareAtPrice && <span className="ml-2 text-ink/40 line-through">{formatPrice(product.compareAtPrice)}</span>}</div>
        </div>
        <p className="mt-2 text-xs text-ink/55">{product.colors.length} colors</p>
      </div>
    </article>
  );
}
