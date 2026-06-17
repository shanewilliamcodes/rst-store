import sharp from "sharp";

// High-res "RST" monogram print file (transparent bg). Black artwork — Printful
// digitizes the shape; the thread color is set on the product (tonal gray).
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000" viewBox="0 0 2000 2000">
  <rect width="2000" height="2000" fill="none"/>
  <text x="1000" y="1000" text-anchor="middle" dominant-baseline="central"
        font-family="Georgia, 'Times New Roman', 'DejaVu Serif', serif"
        font-size="760" font-weight="600" letter-spacing="40" fill="#15140f">RST</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("design-files/rst-monogram.png");
const meta = await sharp("design-files/rst-monogram.png").metadata();
console.log(`Wrote design-files/rst-monogram.png (${meta.width}x${meta.height})`);
