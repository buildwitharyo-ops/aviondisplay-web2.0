import sharp from "sharp";
import fs from "node:fs";

// Aggressive PNG compression for product cutouts with alpha.
// Strategy: resize to 1240px (sufficient for retina at 620px display),
// then palette mode for big reduction. Banding is acceptable on simple gradients.

const TARGETS = [
  { file: "public/assets/image/AVION HOME.png", width: 1240 },
  { file: "public/assets/image/AVION AX SERIES.png", width: 1240 },
];

for (const { file, width } of TARGETS) {
  const before = fs.statSync(file).size;
  const buf = await sharp(file)
    .resize({ width, withoutEnlargement: true })
    .png({
      compressionLevel: 9,
      palette: true,
      quality: 80,
      effort: 10,
    })
    .toBuffer();
  fs.writeFileSync(file, buf);
  const after = fs.statSync(file).size;
  const pct = ((1 - after / before) * 100).toFixed(0);
  console.log(
    `${file.padEnd(48)}  ${(before / 1024).toFixed(0).padStart(5)} KB → ${(after / 1024).toFixed(0).padStart(5)} KB  (-${pct}%)`,
  );
}
