# RST Store — Critical Review

*Reviewed: live production at rst-store-two.vercel.app + full source audit. June 2026.*

## Verdict

A competent template wearing a brand like a borrowed jacket. The bones are fine —
the section rhythm is consistent, the palette is restrained, nothing is actively
ugly. That is also the problem: nothing is actively anything. Every page reads as
"tasteful defaults," and three details give the game away instantly: the fake
display typeface, the hand-drawn shirt illustration posing as a product preview,
and a buy flow that ends in a void because nothing actually prints or ships a
shirt. This is a storefront-shaped object, not a store.

## Typography — the biggest tell

- The "display serif" is **Georgia with negative letter-spacing**. Georgia is a
  1996 screen-body face; tracked tight at 96px it gets lumpy joints and dated
  numerals. Every headline on the site is quietly broadcasting "no font budget."
  A brand whose entire pitch is tactile quality cannot set its voice in a system
  fallback.
- The micro-label habit is out of control. Eyebrows, nav, buttons, footer
  headings, badges, chips — *everything* is 10–11px bold uppercase with .12–.18em
  tracking. When every element whispers in the same uppercase voice, hierarchy
  flattens; the eye has no second level to land on between 96px headline and 11px
  label. Body text at 13–14px/relaxed does all the work and gets none of the room.
- Letter-spacing values are scattered ad hoc across nine utilities
  (.12/.13/.14/.16/.18em…). That is not a system, it is a nervous tic.

## Color — restrained, but mushy

- The neutrals (cream/oatmeal/sand/taupe) are pleasant, but the site leans on
  arbitrary alpha washes — `bg-oatmeal/22`, `/25`, `/30`, `bg-white/35`, `/45`,
  `/50` — different opacities of the same beige on the same cream, chosen by
  feel, per component. Adjacent sections differ by 3% opacity, which reads as
  rendering error, not rhythm.
- The neon accents (the actual brand signature!) appear only inside icons and one
  2px border on the PDP. The one ownable color idea the brand has is invisible at
  the system level. Nothing interactive ever flashes neon. Cowardice.

## Imagery + the preview

- The product photography is good — warm, coherent, believable. But the
  hand-drawn SVG "color preview" sitting beside it is a catastrophe of context: a
  flat cartoon shirt with dashed stitch lines, drop-shadowed like 2011 clip art,
  directly under a photorealistic flat-lay. The juxtaposition makes the photos
  look honest and the preview look like a coupon. A preview must *raise*
  confidence at the exact moment of color choice; this one lowers it.
- The photos and the copy still quietly disagree (hem monogram in the mom/dad
  shots vs. "RST on the opposite sleeve" in the details list). A shopper who
  zooms will catch it.

## Interaction + flow

- The product card hover pill says **"Choose your soft."** Cute in the deck,
  useless on the shelf — it labels an action with a vibe. Buttons say what they do.
- On the PDP, **Details / Fit / Fabric are all collapsed by default.** You're
  selling premium fabric and hiding the fabric. The first accordion should be
  open; better, the fabric line shouldn't be in an accordion at all.
- The add-to-cart zone has no trust scaffolding — one centered line of 12px text
  about exchanges. Returns, shipping, and the giving promise should be a scannable
  row, not a whisper.
- The checkout handoff page ("Ready to come home?") is one heading, a paragraph,
  and a lock icon — a full page that exists to host one button. Either earn the
  page with an order recap that builds confidence, or skip straight to Stripe.
- Newsletter promises code **HOME15**; no such promotion exists anywhere in the
  system. That's a written check the store can't cash. Flagged for setup.

## The fatal flaw

There is no product behind the store. Checkout collects real money via Stripe
(once keys exist) and then… a row lands in a database. No printer, no warehouse,
no shirts. Everything above is cosmetics next to this: **a buy button must buy a
thing that ships.** The rebuild's first job is wiring real fulfillment, with the
preview, the cart, and the submitted order all driven by one source of truth.

## What survives

The brand idea (RST = family initials, quiet neon signatures), the photography,
the neutral palette as a base, the section architecture, the working cart/Stripe/
newsletter plumbing, and the giving program. Everything else is negotiable.
