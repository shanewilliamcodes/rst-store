// Polls a design URL until it serves the expected byte size (i.e. the new
// art has finished deploying), so Printful fetches the updated image.
const url = process.argv[2];
const expected = Number(process.argv[3]);
for (let i = 0; i < 40; i++) {
  try {
    const r = await fetch(url, { cache: "no-store" });
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length === expected) { console.log(`LIVE: ${url} (${buf.length} bytes)`); process.exit(0); }
    console.log(`  ...serving ${buf.length} bytes, want ${expected}`);
  } catch (e) { console.log("  ...retry: " + e.message); }
  await new Promise((r) => setTimeout(r, 5000));
}
console.log("timed out waiting for new art to go live");
process.exit(1);
