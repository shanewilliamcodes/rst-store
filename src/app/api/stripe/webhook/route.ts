import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getDb, orders } from "@/lib/db";

export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({ message: "Webhook not configured" }, { status: 503 });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(await request.text(), request.headers.get("stripe-signature") ?? "", process.env.STRIPE_WEBHOOK_SECRET); }
  catch { return NextResponse.json({ message: "Invalid signature" }, { status: 400 }); }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const db = getDb();
    if (db) await db.insert(orders).values({ stripeSessionId: session.id, stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null, customerEmail: session.customer_details?.email ?? null, status: session.payment_status, amountTotal: session.amount_total ?? 0, currency: session.currency ?? "usd", items: session.metadata?.cart ? JSON.parse(session.metadata.cart) : [] }).onConflictDoNothing();
  }
  return NextResponse.json({ received: true });
}
