import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/catalog";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-lg bg-oatmeal/25">
        <Image src={product.image} alt={`${product.name} with its embroidered RST signature detail`} fill priority={priority} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]" style={{ objectPosition: product.imagePosition ?? "center" }} />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/15 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        {product.badge && <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em]">{product.badge}</span>}
        <span className="absolute bottom-3 left-3 right-3 translate-y-2 rounded-full bg-cream/95 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">See colors + fit</span>
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
