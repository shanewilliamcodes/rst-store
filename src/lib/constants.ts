export const siteConfig = {
  name: "RST",
  legalName: "Really Soft Tees",
  description: "RST Really Soft Tees makes premium family tees with exceptionally soft fabric, a subtle neon signature on the chest, and RST embroidered on the sleeve. Every tee gives $1 to St. Jude.",
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
