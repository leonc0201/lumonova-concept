// One-shot: erhöht alle Body-Font-Sizes (≤ 22 px) um +1 px.
//   - text-[Npx]      in Tailwind-Klassen
//   - fontSize: N     in inline-styles (nur Number-Literale)
//   - font-size: Npx  in CSS-Files
// Headlines (>22 px) bleiben unverändert.
//
// Lauf: `node scripts/bump-text-size.mjs`

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const THRESHOLD = 22;
const ROOT = "src";

let totalReplacements = 0;
const fileSummary = [];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|css)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function bumpFile(path) {
  let content = readFileSync(path, "utf8");
  let count = 0;

  content = content.replace(/text-\[(\d+)px\]/g, (m, n) => {
    const num = parseInt(n, 10);
    if (num > THRESHOLD) return m;
    count++;
    return `text-[${num + 1}px]`;
  });

  content = content.replace(/fontSize:\s*(\d+)(?!\d|\.|px)/g, (m, n) => {
    const num = parseInt(n, 10);
    if (num > THRESHOLD) return m;
    count++;
    return m.replace(n, String(num + 1));
  });

  content = content.replace(/font-size:\s*(\d+)px/g, (m, n) => {
    const num = parseInt(n, 10);
    if (num > THRESHOLD) return m;
    count++;
    return `font-size: ${num + 1}px`;
  });

  if (count > 0) {
    writeFileSync(path, content);
    fileSummary.push(`  ${path}  +${count}`);
    totalReplacements += count;
  }
}

for (const f of walk(ROOT)) bumpFile(f);

console.log(fileSummary.join("\n"));
console.log("");
console.log(`  ${totalReplacements} Werte um +1px erhoeht (Schwelle <= ${THRESHOLD}px)`);
