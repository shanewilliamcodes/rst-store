import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${light ? "text-cream" : "text-ink"}`} aria-label="RST Really Soft Tees home">
      <span className="font-display text-[2rem] font-semibold leading-none tracking-[-0.06em]">RST</span>
      <span className="border-l border-current/25 pl-2.5 text-[0.5rem] font-bold uppercase leading-[1.25] tracking-[0.18em] sm:text-[0.58rem]">Really Soft<br />Tees</span>
    </Link>
  );
}
