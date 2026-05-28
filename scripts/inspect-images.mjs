import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = "public/assets/image";
const files = fs.readdirSync(dir).sort();

for (const f of files) {
  const p = path.join(dir, f);
  if (!fs.statSync(p).isFile()) continue;
  if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
  try {
    const m = await sharp(p).metadata();
    const sz = fs.statSync(p).size;
    const kb = (sz / 1024).toFixed(0).padStart(6);
    const dim = `${m.width}x${m.height}`.padEnd(11);
    console.log(`${kb} KB  ${dim}  ${m.hasAlpha ? "alpha" : "opaq "}  ${f}`);
  } catch (e) {
    console.log("skip", f, e.message);
  }
}
