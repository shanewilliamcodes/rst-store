export function EditorialLayout({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <article><header className="bg-oatmeal/22"><div className="page-shell py-16 sm:py-24"><p className="eyebrow text-ink/50">{eyebrow}</p><h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] sm:text-7xl">{title}</h1><p className="mt-6 max-w-2xl text-sm leading-7 text-ink/65 sm:text-base">{intro}</p></div></header><div className="page-shell max-w-4xl py-14 sm:py-20"><div className="prose-rst">{children}</div></div></article>;
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="border-b border-ink/10 py-8 first:pt-0 last:border-0"><h2 className="font-display text-3xl sm:text-4xl">{title}</h2><div className="mt-4 space-y-4 text-sm leading-7 text-ink/65">{children}</div></section>; }
