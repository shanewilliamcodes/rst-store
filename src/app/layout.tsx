import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";
import { siteConfig } from "@/lib/constants";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "RST | Really Soft Tees", template: "%s | RST" },
  description: siteConfig.description,
  keywords: ["premium soft tees", "family matching shirts", "oversized tees", "shrink resistant shirts", "family apparel", "mom tee", "dad tee"],
  openGraph: { title: "RST | Come home to comfort", description: siteConfig.description, type: "website", images: [{ url: "/images/hero-family.png", width: 1536, height: 1024 }] },
  twitter: { card: "summary_large_image", title: "RST | Really Soft Tees", description: siteConfig.description, images: ["/images/hero-family.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body><CartProvider><a href="#main-content" className="sr-only z-[100] bg-cream p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a><Header /><main id="main-content" className="min-h-[60vh]">{children}</main><Footer /><CartDrawer /></CartProvider><Analytics /></body>
    </html>
  );
}
