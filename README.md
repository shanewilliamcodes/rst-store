# RST — Really Soft Tees

Production-ready ecommerce storefront for RST, a premium family lifestyle apparel brand built around durable softness and the promise: **Come home to comfort.**

## Stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4
- Stripe Checkout with server-side catalog and price validation
- Neon Postgres + Drizzle ORM for newsletter subscribers and completed orders
- Vercel Analytics, dynamic sitemap, robots, metadata, product JSON-LD

## Local setup

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Add a Stripe secret key and Postgres connection string to `.env.local`. Apply `drizzle/0000_launch.sql` to the database, or run `npm run db:push`.

For local Stripe webhook testing:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the emitted `whsec_...` value to `STRIPE_WEBHOOK_SECRET`.

## Production launch

1. Create a Neon Postgres database and apply the schema.
2. Create or select the Stripe account, activate payment methods, and add live credentials.
3. Deploy to Vercel and add all values from `.env.example`.
4. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain.
5. Register `/api/stripe/webhook` in Stripe for `checkout.session.completed`.
6. Replace policy contact addresses if the final operating entity uses different mailboxes.

Run `npm run check` before deployment.
