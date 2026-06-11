import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/catalog";
import { siteConfig } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/about", "/our-softness", "/shipping-returns", "/size-guide", "/care", "/faq", "/privacy", "/terms", "/accessibility"];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: route === "" || route === "/shop" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : route === "/shop" ? .9 : .6 })),
    ...products.map((product) => ({ url: `${siteConfig.url}/products/${product.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: .8 })),
    ...collections.map((collection) => ({ url: `${siteConfig.url}/collections/${collection.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: .75 })),
  ];
}
