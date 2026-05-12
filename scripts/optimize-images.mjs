// One-shot Bildoptimierung:
//   public/images/**.{png,jpg,jpeg,webp}
//   -> public/images-optimized/**.webp
//
//   - Skaliert auf max 1920px (nur runter, nie hoch)
//   - WebP Quality 85
//   - Behält Verzeichnisstruktur und Dateinamen (nur Extension wird .webp)
//
// Lauf: `node scripts/optimize-images.mjs`

import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import sharp from "sharp";

const SRC = "public/images";
const DST = "public/images-optimized";
const MAX_WIDTH = 1920;
const QUALITY = 85;
const SUPPORTED = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

function formatBytes(b) {
  const mb = b / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(2)} MB` : `${(b / 1024).toFixed(1)} KB`;
}

async function main() {
  let totalSrc = 0;
  let totalDst = 0;
  let count = 0;
  const skipped = [];

  for await (const srcPath of walk(SRC)) {
    const ext = extname(srcPath).toLowerCase();
    if (!SUPPORTED.has(ext)) {
      skipped.push(srcPath);
      continue;
    }

    const relPath = relative(SRC, srcPath);
    const dstPath = join(DST, relPath).replace(/\.[^.]+$/, ".webp");

    await mkdir(dirname(dstPath), { recursive: true });

    await sharp(srcPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(dstPath);

    const srcSize = (await stat(srcPath)).size;
    const dstSize = (await stat(dstPath)).size;
    totalSrc += srcSize;
    totalDst += dstSize;
    count++;

    const pct = ((1 - dstSize / srcSize) * 100).toFixed(0);
    console.log(
      `  ${relPath}  ${formatBytes(srcSize)} -> ${formatBytes(
        dstSize
      )}  (-${pct}%)`
    );
  }

  console.log("");
  console.log(`  ${count} Dateien konvertiert`);
  console.log(`  Original  : ${formatBytes(totalSrc)}`);
  console.log(`  Optimiert : ${formatBytes(totalDst)}`);
  console.log(
    `  Ersparnis : -${((1 - totalDst / totalSrc) * 100).toFixed(1)}%`
  );
  if (skipped.length > 0) {
    console.log(`  Übersprungen (nicht unterstützt): ${skipped.length}`);
    for (const s of skipped) console.log(`    - ${s}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
