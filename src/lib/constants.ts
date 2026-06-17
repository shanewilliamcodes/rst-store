export const siteConfig = {
  name: "RST",
  legalName: "Really Soft Tees",
  description: "RST Really Soft Tees makes premium, garment-dyed family tees with exceptionally soft fabric and the RST monogram embroidered tone-on-tone on the chest. Every tee gives $1 to St. Jude.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@reallysofttees.com",
  instagram: "https://instagram.com/reallysofttees",
  freeShippingThreshold: 60,
  giving: {
    name: "St. Jude Children's Research Hospital",
    shortName: "St. Jude",
    amountPerTee: 1,
    url: "https://www.stjude.org",
  },
};
