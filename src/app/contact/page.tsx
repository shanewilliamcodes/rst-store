import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, Package } from "lucide-react";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with the family behind RST Really Soft Tees." };

export default function ContactPage() {
  return (
    <div className="page-shell py-16 sm:py-24">
      <p className="eyebrow text-ink/50">RST · Really Soft Tees</p>
      <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight sm:text-7xl">A real family is on the other side.</h1>
      <p className="mt-6 max-w-xl text-sm leading-7 text-ink/65">Questions about fit, an order, or one of the tiny hidden details? Write to us. We read every note.</p>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          [Mail, "General hello", "hello@reallysofttees.com", "mailto:hello@reallysofttees.com"],
          [Package, "Order help", "orders@reallysofttees.com", "mailto:orders@reallysofttees.com"],
          [MessageCircle, "Common questions", "Visit our FAQ", "/faq"],
        ].map(([Icon, title, label, href]) => {
          const Comp = Icon as typeof Mail;
          return <Link key={title as string} href={href as string} className="rounded-sm border border-ink/10 bg-white/35 p-7 transition hover:-translate-y-1 hover:shadow-lg"><Comp size={22} strokeWidth={1.5} /><h2 className="mt-8 font-display text-3xl">{title as string}</h2><p className="mt-2 text-sm text-ink/60">{label as string}</p></Link>;
        })}
      </div>
    </div>
  );
}
