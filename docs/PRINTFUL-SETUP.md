# Printful + Payments Setup — Shane's Checklist

Everything code-side is built and deployed. These are the account/key steps only
you can do. Total time: ~1–2 hours, mostly in the Printful dashboard.

## Why Printful

One API covers both photorealistic per-color mockups **and** fulfillment, and
Printful prints in-house — so the preview a shopper sees comes from the same
system that prints the shirt. Printify is cheaper per unit but brokers to
third-party print shops (quality varies by routing) and its mockups come from a
separate pipeline. For a premium brand where preview-matches-product is the whole
trust story, Printful is the right call.

## 1. Printful account + products (~1 hour)

1. Create an account at printful.com (free).
2. Create a store: **Stores → Add store → API**.
3. Upload the embroidery design files (the neon heart / mustache / bottle /
   blocks, plus the RST sleeve text). Printful digitizes embroidery files on
   first use (one-time, a few dollars each, takes ~1 business day).
4. Add 4 products (suggested garments — final call is yours):
   - **The Mom Tee / The Dad Tee** → Bella+Canvas 3001 or Comfort Colors 1717
   - **The Little Tee** → Rabbit Skins 3321 (toddler) or Bella+Canvas 3001Y (youth)
   - **The Baby Tee** → Rabbit Skins 4424 (infant, side-snap styles vary)
   Place the signature on the **left chest** and RST on the **right sleeve**.
   Pick garment colors closest to: Cream, Oatmeal, Sand, Taupe, Heather Gray,
   Washed Black (skip any color a garment doesn't offer).
5. **Name them exactly:** `The Mom Tee`, `The Dad Tee`, `The Baby Tee`,
   `The Little Tee` — the sync script matches by name.
6. Add a billing method in Printful (**Billing → Payment methods**) — Printful
   charges this card per order; your Stripe revenue is separate.

## 2. API key (~2 min)

Printful **Settings → API → Create token** (orders + products scopes), then:
- Local: copy `.env.example` to `.env.local`, paste into `PRINTFUL_API_KEY=`
- Vercel: project **rst-store → Settings → Environment Variables** → add
  `PRINTFUL_API_KEY` (and keep `PRINTFUL_AUTO_CONFIRM=false` for now — paid
  orders arrive as drafts you approve in the Printful dashboard).

## 3. Pull the real data into the site (~2 min)

```
cd C:\Users\shane\Projects\rst-store
npm run printful:sync      # maps every color/size to a Printful variant
npm run printful:mockups   # downloads photorealistic per-color previews
git add -A; git commit -m "Connect Printful catalog + mockups"; git push
vercel deploy --prod --yes
```
After this, the color preview on every product page shows Printful's real
mockup for the exact color selected, and paid orders auto-create Printful
orders.

> If the sync warns about unmatched colors, open `scripts/printful-sync.mjs`
> and adjust the `COLOR_ALIASES` table (left = Printful's color name).

## 4. Stripe (when ready to take real money) (~15 min)

1. stripe.com → activate account → **Developers → API keys** → copy the secret
   key → Vercel env `STRIPE_SECRET_KEY`.
2. **Developers → Webhooks → Add endpoint**:
   `https://rst-store-two.vercel.app/api/stripe/webhook`, event
   `checkout.session.completed` → copy signing secret → Vercel env
   `STRIPE_WEBHOOK_SECRET`.
3. Create the welcome promo: **Products → Coupons** → 15% off once → promotion
   code `HOME15` (the newsletter already promises this code).

## 5. Database (5 min, optional but recommended)

Neon.tech free tier → create project → copy connection string → Vercel env
`DATABASE_URL` → run `npm run db:push` locally once. Stores newsletter signups
and order records (incl. Printful submission status per order).

## How an order flows once everything is connected

shopper picks color/size → preview shows that variant's real mockup → cart and
Stripe carry the same (product, color, size) tuple → payment webhook resolves it
through `src/lib/fulfillment.ts` (the single source of truth) → Printful order
created as draft → you approve → Printful prints + ships → done.

## Important honesty notes

- Until step 2–3 are done, product pages show studio photography with an honest
  "photo shows Cream" chip — never a fake render.
- Until step 4, the checkout button returns "Secure checkout is not configured
  yet" — it never silently swallows an order.
- St. Jude giving is a promise on the site; set a recurring reminder to donate
  $1/tee sold (stjude.org/donate). Keep receipts.
