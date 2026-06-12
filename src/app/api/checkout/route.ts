import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { products } from "@/lib/catalog";
import { siteConfig } from "@/lib/constants";

export const runtime = "nodejs";
const requestSchema = z.object({ items: z.array(z.object({ productId: z.string(), size: z.string(), color: z.string(), quantity: z.number().int().min(1).max(10) })).min(1).max(30) });

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ message: "Secure checkout is not configured yet. Add STRIPE_SECRET_KEY to enable payments." }, { status: 503 });
    const { items } = requestSchema.parse(await request.json());
    const validated = items.map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      if (!product || !product.sizes.includes(item.size) || !product.colors.some((color) => color.name === item.color)) throw new Error("An item in your bag is no longer available.");
      return { ...item, product };
    });
    const subtotal = validated.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: validated.map(({ product, quantity, size, color }) => ({ quantity, price_data: { currency: "usd", unit_amount: product.price * 100, product_data: { name: product.name, description: `${color} / ${size}`, images: [`${siteConfig.url}${product.image}`], metadata: { productId: product.id, size, color } } } })),
      success_url: `${siteConfig.url}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteConfig.url}/checkout`,
      automatic_tax: { enabled: true },
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      shipping_options: subtotal >= siteConfig.freeShippingThreshold ? [{ shipping_rate_data: { type: "fixed_amount", display_name: "Free standard shipping", fixed_amount: { amount: 0, currency: "usd" }, delivery_estimate: { minimum: { unit: "business_day", value: 3 }, maximum: { unit: "business_day", value: 6 } } } }] : [{ shipping_rate_data: { type: "fixed_amount", display_name: "Standard shipping", fixed_amount: { amount: 695, currency: "usd" }, delivery_estimate: { minimum: { unit: "business_day", value: 3 }, maximum: { unit: "business_day", value: 6 } } } }],
      phone_number_collection: { enabled: false },
      customer_creation: "always",
      metadata: { cart: JSON.stringify(items) },
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: "Your bag contains invalid items." }, { status: 400 });
    console.error("Checkout creation failed", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to start checkout." }, { status: 500 });
  }
}
