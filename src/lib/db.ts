import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { integer, jsonb, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    source: text("source").notNull().default("website"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("newsletter_email_idx").on(table.email)],
);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  stripeSessionId: text("stripe_session_id").notNull().unique(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  customerEmail: text("customer_email"),
  status: text("status").notNull(),
  amountTotal: integer("amount_total").notNull(),
  currency: text("currency").notNull().default("usd"),
  items: jsonb("items").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export function getDb() {
  if (!process.env.DATABASE_URL) return null;
  return drizzle(neon(process.env.DATABASE_URL));
}
