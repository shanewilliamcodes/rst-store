import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`inline-flex items-baseline gap-2 ${light ? "text-cream" : "text-ink"}`} aria-label="RST home">
      <span className="font-display text-[2rem] font-semibold leading-none tracking-[-0.06em]">RST</span>
      <span className="hidden text-[0.6rem] font-bold uppercase tracking-[0.24em] sm:block">Really Soft Tees</span>
    </Link>
  );
}
