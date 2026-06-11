import type { Metadata } from "next";
import { CheckoutPanel } from "@/components/checkout-panel";
export const metadata: Metadata = { title: "Secure checkout", robots: { index: false, follow: false } };
export default function CheckoutPage() { return <CheckoutPanel />; }
