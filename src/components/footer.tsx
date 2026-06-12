import Link from "next/link";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter-form";

const shop = [["The Mom Tee", "/products/the-mom-tee"], ["The Dad Tee", "/products/the-dad-tee"], ["The Baby Tee", "/products/the-baby-tee"], ["The Little Tee", "/products/the-little-tee"]];
const help = [["Shipping + returns", "/shipping-returns"], ["Size guide", "/size-guide"], ["Care guide", "/care"], ["FAQ", "/faq"], ["Contact", "mailto:hello@reallysofttees.com"]];

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="page-shell grid gap-12 py-16 lg:grid-cols-[1.2fr_.7fr_.7fr] lg:py-20">
        <div><Logo light /><h2 className="mt-8 max-w-md font-display text-4xl leading-tight sm:text-5xl">The softest part of family life.</h2><p className="mt-4 max-w-md text-sm leading-6 text-cream/65">Join Really Soft Tees for first access to new drops and quiet notes from our family to yours.</p><NewsletterForm source="footer" dark /></div>
        <div><h3 className="footer-heading">Shop</h3><ul className="mt-5 space-y-3">{shop.map(([label, href]) => <li key={label}><Link className="footer-link" href={href}>{label}</Link></li>)}</ul></div>
        <div><h3 className="footer-heading">Here to help</h3><ul className="mt-5 space-y-3">{help.map(([label, href]) => <li key={label}><Link className="footer-link" href={href}>{label}</Link></li>)}</ul></div>
      </div>
      <div className="page-shell flex flex-col gap-3 border-t border-cream/15 py-6 text-[0.68rem] uppercase tracking-[0.12em] text-cream/45 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Really Soft Tees · Every tee gives $1 to St. Jude</p><div className="flex gap-5"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/accessibility">Accessibility</Link></div></div>
    </footer>
  );
}
