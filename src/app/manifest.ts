import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "RST | Really Soft Tees", short_name: "RST", description: "Premium family apparel made for coming home.", start_url: "/", display: "standalone", background_color: "#f6f1e8", theme_color: "#272924" }; }
