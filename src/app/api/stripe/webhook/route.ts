import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getDb, orders } from "@/lib/db";
import { getSyncVariantId } from "@/lib/fulfillment";
import { createPrintfulOrder, printfulEnabled } from "@/lib/printful";

export const runtime = "nodejs";

type CartLine = { productId: string; size: string; color: string; quantity: number };
type FulfillmentResult =
  | { status: "submitted"; printfulOrderId: number; confirmed: boolean }
  | { status: "skipped"; reason: string }
  | { status: "error"; message: string };

// Hands a paid Stripe session to Printful. The cart metadata carries the exact
// (productId, color, size) the shopper chose — the same tuple that drove their
// preview — and getSyncVariantId resolves it to the printable variant.
async function submitToPrintful(session: Stripe.Checkout.Session, cart: CartLine[]): Promise<FulfillmentResult> {
  if (!printfulEnabled()) return { status: "skipped", reason: "PRINTFUL_API_KEY not set — order needs manual fulfillment" };
  if (!cart.length) return { status: "skipped", reason: "no cart metadata on session" };

  const lines = cart.map((item) => ({ id: getSyncVariantId(item.productId, item.color, item.size), quantity: item.quantity, label: `${item.productId} ${item.color}/${item.size}` }));
  const unmapped = lines.filter((line) => !line.id);
  if (unmapped.length) return { status: "skipped", reason: `unmapped variants (run npm run printful:sync): ${unmapped.map((l) => l.label).join(", ")}` };

  const shipping = (session as unknown as { shipping_details?: { name?: string | null; address?: Stripe.Address | null } }).shipping_details;
  const address = shipping?.address ?? session.customer_details?.address;
  if (!address?.line1 || !address.city || !address.postal_code || !address.country) return { status: "skipped", reason: "session has no usable shipping address" };

  const confirm = process.env.PRINTFUL_AUTO_CONFIRM === "true";
  const order = await createPrintfulOrder({
    externalId: session.id,
    recipient: {
      name: shipping?.name ?? session.customer_details?.name ?? "RST Customer",
      address1: address.line1,
      address2: address.line2 ?? undefined,
      city: address.city,
      state_code: address.state ?? undefined,
      country_code: address.country,
      zip: address.postal_code,
      email: session.customer_details?.email ?? undefined,
    },
    items: lines.map((line) => ({ sync_variant_id: line.id as number, quantity: line.quantity })),
    confirm,
  });
  return { status: "submitted", printfulOrderId: order.id, confirmed: confirm };
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({ message: "Webhook not configured" }, { status: 503 });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(await request.text(), request.headers.get("stripe-signature") ?? "", process.env.STRIPE_WEBHOOK_SECRET); }
  catch { return NextResponse.json({ message: "Invalid signature" }, { status: 400 }); }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    let cart: CartLine[] = [];
    try { cart = session.metadata?.cart ? JSON.parse(session.metadata.cart) : []; } catch { cart = []; }

    let fulfillment: FulfillmentResult;
    try { fulfillment = await submitToPrintful(session, cart); }
    catch (error) { fulfillment = { status: "error", message: error instanceof Error ? error.message : "unknown" }; }
    if (fulfillment.status !== "submitted") console.warn("Printful fulfillment not submitted:", fulfillment);

    const db = getDb();
    if (db) await db.insert(orders).values({
      stripeSessionId: session.id,
      stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
      customerEmail: session.customer_details?.email ?? null,
      status: session.payment_status,
      amountTotal: session.amount_total ?? 0,
      currency: session.currency ?? "usd",
      items: { cart, fulfillment },
    }).onConflictDoNothing();
  }
  return NextResponse.json({ received: true });
}
