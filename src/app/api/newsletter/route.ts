import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, newsletterSubscribers } from "@/lib/db";

const signupSchema = z.object({ email: z.email().max(254), source: z.string().max(50).default("website") });
export async function POST(request: Request) {
  try {
    const data = signupSchema.parse(await request.json());
    const db = getDb();
    if (!db) return NextResponse.json({ message: "Newsletter signup is being configured. Please try again soon." }, { status: 503 });
    await db.insert(newsletterSubscribers).values({ email: data.email.toLowerCase(), source: data.source }).onConflictDoNothing();
    return NextResponse.json({ message: "You’re in. Welcome to the RST family — we’ll be in touch." });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
    console.error("Newsletter signup failed", error);
    return NextResponse.json({ message: "We couldn’t save that email. Please try again." }, { status: 500 });
  }
}
