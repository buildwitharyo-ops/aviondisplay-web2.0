import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = "public/assets/image";

// Per-file rules. Defaults below.
const RULES = {
  "og-home.jpg": { width: 1200, height: 630, fit: "cover", format: "jpeg", quality: 82 },
  "NEW-AVION.png": { width: 480, format: "png", palette: true },
  "tech blue background.jpg": { width: 2560, format: "jpeg", quality: 75 },
};

const DEFAULTS = {
  maxWidth: 1920,
  jpegQuality: 80,
  pngCompression: 9,
};

function pickRule(file) {
  if (RULES[file]) return { ...RULES[file] };
  return null;
}

const files = fs.readdirSync(dir).sort();
let totalBefore = 0;
let totalAfter = 0;

for (const f of files) {
  const p = path.join(dir, f);
  if (!fs.statSync(p).isFile()) continue;
  if (!/\.(jpe?g|png)$/i.test(f)) continue;

  const before = fs.statSync(p).size;
  totalBefore += before;
  const meta = await sharp(p).metadata();
  const inputExt = path.extname(f).toLowerCase();
  const rule = pickRule(f);

  let pipeline = sharp(p, { failOn: "none" });

  // Resize
  let targetWidth = meta.width;
  let targetHeight = null;
  if (rule?.width) targetWidth = rule.width;
  else if (meta.width > DEFAULTS.maxWidth) targetWidth = DEFAULTS.maxWidth;
  if (rule?.height) targetHeight = rule.height;

  if (targetWidth !== meta.width || targetHeight) {
    pipeline = pipeline.resize({
      width: targetWidth,
      height: targetHeight ?? undefined,
      fit: rule?.fit ?? "inside",
      withoutEnlargement: true,
    });
  }

  // Determine output format
  let outFormat = rule?.format;
  if (!outFormat) {
    // Default: keep original container. If PNG opaque and >500KB, still PNG (we don't rename — codebase references the filename).
    outFormat = inputExt === ".png" ? "png" : "jpeg";
  }

  if (outFormat === "jpeg") {
    pipeline = pipeline.jpeg({
      quality: rule?.quality ?? DEFAULTS.jpegQuality,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:2:0",
    });
  } else if (outFormat === "png") {
    pipeline = pipeline.png({
      compressionLevel: DEFAULTS.pngCompression,
      palette: rule?.palette ?? meta.hasAlpha === false ? false : !!rule?.palette,
      quality: rule?.quality,
    });
  }

  pipeline = pipeline.withMetadata({ exif: {}, icc: undefined, iptc: undefined });

  const buf = await pipeline.toBuffer();
  fs.writeFileSync(p, buf);
  const after = fs.statSync(p).size;
  totalAfter += after;
  const pct = ((1 - after / before) * 100).toFixed(0);
  console.log(
    `${f.padEnd(36)}  ${(before / 1024).toFixed(0).padStart(5)} KB → ${(after / 1024).toFixed(0).padStart(5)} KB  (-${pct}%)`,
  );
}

console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)} MB → ${(totalAfter / 1024 / 1024).toFixed(1)} MB  ` +
    `(saved ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)} MB, ${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`,
);
