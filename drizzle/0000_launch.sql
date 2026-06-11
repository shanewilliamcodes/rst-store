CREATE TABLE IF NOT EXISTS "newsletter_subscribers" (
  "id" serial PRIMARY KEY,
  "email" text NOT NULL,
  "source" text NOT NULL DEFAULT 'website',
  "created_at" timestamp with time zone NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "newsletter_email_idx" ON "newsletter_subscribers" ("email");

CREATE TABLE IF NOT EXISTS "orders" (
  "id" serial PRIMARY KEY,
  "stripe_session_id" text NOT NULL UNIQUE,
  "stripe_payment_intent_id" text,
  "customer_email" text,
  "status" text NOT NULL,
  "amount_total" integer NOT NULL,
  "currency" text NOT NULL DEFAULT 'usd',
  "items" jsonb NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now()
);
