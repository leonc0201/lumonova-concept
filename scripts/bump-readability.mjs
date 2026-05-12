// One-shot: hebt Text-Opazitäten an, damit Body-Text WCAG AA erreicht.
// Ersetzt alle `rgba(242, 242, 242, X)`-Vorkommen (mit/ohne Leerzeichen)
// nach folgender Mapping-Tabelle. Werte ohne Mapping bleiben unangetastet.
//
// Lauf: `node scripts/bump-readability.mjs`

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const MAPPING = {
  "0.08": "0.08", // Ghost / Dekor — bleibt
  "0.10": "0.40",
  "0.15": "0.35",
  "0.18": "0.35",
  "0.20": "0.35",
  "0.22": "0.45",
  "0.25": "0.45",
  "0.28": "0.45",
  "0.30": "0.50",
  "0.40": "0.55",
  "0.45": "0.60",
  "0.55": "0.65",
};

const ROOT = "src";
let total = 0;
const summary = [];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|css)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const rgbaRegex = /rgba\(\s*242\s*,\s*242\s*,\s*242\s*,\s*(0\.\d+)\s*\)/g;

for (const path of walk(ROOT)) {
  let content = readFileSync(path, "utf8");
  let count = 0;
  content = content.replace(rgbaRegex, (match, alpha) => {
    const newAlpha = MAPPING[alpha];
    if (!newAlpha || newAlpha === alpha) return match;
    count++;
    return match.replace(alpha, newAlpha);
  });
  if (count > 0) {
    writeFileSync(path, content);
    summary.push(`  ${path}  +${count}`);
    total += count;
  }
}

console.log(summary.join("\n"));
console.log("");
console.log(`  ${total} Opazitaeten angehoben`);
