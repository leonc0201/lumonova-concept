# LUMOnova Konzept — Migration zu Shopify

> **Für Daniel und seinen Claude/AI-Assistenten.** Diese Notiz fasst zusammen, was dieses Repo ist, wie es aufgebaut ist und was bei der Übertragung in einen Shopify-Theme (Liquid) zu beachten ist.

---

## 1. Was ist dieses Projekt?

Konzept-Frontend für die LUMOnova-Marke (Smart Lighting, C&L Handels GmbH Willich). **Kein Shop-Backend**, keine echten Bestellungen — nur Design + Struktur + Inhalte. Aktuell live unter:

**https://lumonova-concept.vercel.app/**

Stand: erste Kunden-Review-Phase. Mehrere Sektionen sind absichtlich noch Platzhalter (siehe §8).

---

## 2. Stack

- **React 19** + **TypeScript** + **Vite 8** — Build-System
- **Tailwind CSS v4** mit `@tailwindcss/vite` Plugin
- **react-router-dom 7** — Client-Side-Routing, **keine** Server-Side-Rendering
- **framer-motion 12** — Scroll-Animationen
- **Sharp** — Build-Zeit-Bildoptimierung (PNG → WebP)

**Für die Shopify-Migration relevant:** Das ist eine SPA (Single Page Application). Komponenten sind React + JSX, kein HTML. Alles wird per JS gerendert. Daniel muss das in **Liquid Templates + Shopify Sections** umbauen, **nicht** 1:1 als HTML übernehmen.

---

## 3. Datei-Map

| Pfad | Was | Wichtigkeit |
|---|---|---|
| `src/pages/` | 4 Seiten (Index, Product, Collection, Impressum, Datenschutz) | ⭐⭐⭐ |
| `src/components/lumonova/` | 13 Komponenten (Nav, Footer, ProductCard, …) | ⭐⭐⭐ |
| `src/components/lumonova/products.ts` | **Datenmodell — der Kern.** Produktdaten, Specs, Categories | ⭐⭐⭐ |
| `src/index.css` | Tailwind-Tokens + Custom Utilities (Farben, Spacing) | ⭐⭐⭐ |
| `src/App.tsx` | Routing-Definitionen | ⭐⭐ |
| `public/images-optimized/` | Optimierte WebP-Bilder (1.5 MB total) | ⭐⭐ |
| `scripts/optimize-images.mjs` | Sharp-Script zum Bilder-Komprimieren | ⭐ |
| `vercel.json` | SPA-Rewrite für Vercel | ignore |
| `package.json`, `tsconfig*.json`, `vite.config.ts`, `eslint.config.js` | Build-Config | ignore |

---

## 4. Seiten der Webseite

### `/` — Homepage ([`src/pages/Index.tsx`](src/pages/Index.tsx))

Reihenfolge der Sektionen (von oben nach unten):

| # | Section | Komponente | Shopify-Section-Vorschlag |
|---|---|---|---|
| 1 | Hero (Vollbild mit Hintergrund-Bild, Headline, USP-Linie, CTAs) | inline in Index.tsx | Custom Section "Hero" |
| 2 | USP-Bar (3 Texte mit Trennstrichen, dunkler Balken) | inline | Custom Section "Marquee/USP-Strip" |
| 3 | Categories (4 Produktfamilien-Kacheln) | `CategoryGrid` | Featured Collections oder Custom |
| 4 | Tier-Story (4 Tier-Blöcke alternierend Text/Bild) | `TierLadder` | Custom Section "Editorial-Blocks" |
| 5 | Tier-Cards (4 Karten mit Preisbereich + Features) | `TierGrid` | Custom Section "Pricing-Cards" |
| 6 | Atmosphere (3 Lifestyle-Bilder) | `AtmosphereGrid` | Image-with-Text-Section |
| 7 | Logo-Arc Divider | `LogoArc` | dekoratives SVG zwischen Sections |
| 8 | Featured Products (4 Produktkarten) | `ProductCard` × 4 | **Shopify Featured Collection** |
| 9 | Compatibility (3 Karten + "In Vorbereitung"-Bar) | `CompatibilityGrid` | Custom Section "Compatibility" |
| 10 | Trust Row (3 Icon-Kacheln, dunkler Banner) | `TrustRow` | Custom Section "Trust-Signals" |
| 11 | Footer | `Footer` | Standard Shopify Footer (anpassen) |

### `/product/:id` — Produktdetailseite ([`src/pages/Product.tsx`](src/pages/Product.tsx))

Dynamisch — liest `id` aus URL, sucht in `PRODUCTS`-Array.

Sektionen pro Produkt:
1. Hero (Galerie links 54%, Info-Spalte rechts 46% mit Tier-Pill, Name, USPs, Preis, CTAs)
2. Einleitungs-Hero (Vollbild-Banner mit Lifestyle-Foto + Headline) — **nur wenn `introHero` in Daten gesetzt**
3. Sub-Navigation (sticky Tabs)
4. Features (2–3 alternierende Bild/Text-Blöcke) — **nur wenn `features` Array vorhanden**
5. Specs-Tabelle (zweispaltig: Heading links sticky, Tabelle rechts)
6. Kompatibilität (3 Karten + In-Vorbereitung-Bar) — **nur wenn `compatibility` vorhanden** → also nur bei Smart-Produkten, nicht bei Panels
7. Trust Row
8. Footer

**Shopify-Übersetzung:** Wahrscheinlich eine `product.liquid`-Template mit Liquid-Conditionals (`{% if product.metafields.compatibility %}`). Specs als Metafield-Set.

### `/collection` — Kollektionsseite ([`src/pages/Collection.tsx`](src/pages/Collection.tsx))

- Filter: Kategorie (Chips) + Tier (Chips) + Sortierung (Select)
- Grid: alle Produkte aus `PRODUCTS`-Array, gefiltert
- Empty-State falls Filter null Treffer
- **Shopify-Äquivalent:** `collection.liquid` mit dem Standard-Shopify-Filter-System (Smart Collections + Tag-Filter). Die React-Filter-Logik ist nicht 1:1 übersetzbar — Shopify macht das serverseitig.

### `/impressum` und `/datenschutz`

Reine Static-Content-Pages mit Boilerplate. **Shopify-Äquivalent:** Standard Shopify Pages (`pages/impressum.liquid`).

---

## 5. Datenmodell (der wichtigste Teil)

Datei: [`src/components/lumonova/products.ts`](src/components/lumonova/products.ts)

```typescript
interface Product {
  id: string;              // URL-Slug, lowercase SKU
  sku: string;             // Technische Artikelnummer (Display)
  name: string;            // Lesbarer Produktname
  tier: "CLASSIC" | "CLASSIC+" | "SMART" | "SMART+";
  category: "Smart Bulbs" | "Filament" | "Panels" | "Ceiling Lights";
  price: number | null;    // null = "Auf Anfrage"
  shortDescription: string;
  usps: string[];          // 4 Bulletpoints im Hero
  specs: SpecRow[];        // Specs-Tabelle
  features?: FeatureBlock[];
  compatibility?: ProductCompatibility;
  introHero?: IntroHero;
  imageSrc?: string;
  warranty: string;
  cta: ProductCta;
}
```

**Aktueller Bestand:** 7 Produkte — 5 Smart Bulbs (alle SMART-Tier) + 2 Classic Panels.

**Shopify-Mapping:**

| Feld in `products.ts` | Shopify-Pendant |
|---|---|
| `id` / `sku` | `product.handle` / `product.sku` |
| `name` | `product.title` |
| `tier` | Tag oder Metafield |
| `category` | Collection (Smart Collection by Tag) |
| `price` (oder null) | `product.price` + Hide-Price-Logik für `null` |
| `shortDescription` | `product.description` (Anfang) oder eigenes Metafield |
| `usps` | Metafield (List, max 4) |
| `specs` | **Metafield Set** — wahrscheinlich am cleansten als Liquid-Objekt-Liste |
| `features` | Metafield Set mit Bild + Text-Blöcken |
| `compatibility` | Metafield Set (Subobjekt) |
| `imageSrc` | `product.featured_image` + zusätzliche Bilder als `product.images` |
| `cta` | Metafield mit URL + Label |

**Wichtig:** Die SKU-Konvention ist:
- `LM-B-{form}-{socket?}-SH` für Smart Bulbs (z.B. `LM-B-A60-SH`, `LM-B-G45-E14-SH`)
- `LM-P{size}-{watt}W-CO` für Classic Panels (z.B. `LM-P62-36W-CO`)
- `SH` = Smart Home, `CO` = Classic & Office

---

## 6. Brand-Regeln (nicht-verhandelbar)

Diese Punkte sind durch Leon mehrfach bestätigt — wenn Daniel beim Übersetzen freie Formulierungen ergänzt, **diese Regeln einhalten**:

1. **"3 Jahre EU-Garantie"** — niemals "5 Jahre" oder "2 Jahre" (außer bei Panels: dort gilt 2 Jahre)
2. **Apple Home / SmartThings nur bei SMART+** — bei CLASSIC/CLASSIC+/SMART **nicht erwähnen**
3. **Kein "HomeKit"** als Begriff — korrekt: "Apple Home"
4. **Kein "Thread" als Protokoll** — korrekt: "Matter over Wi-Fi"
5. **Kein "Made in Europe"** — wenn Europa-Bezug, dann subtil ("Smart Lighting aus Europa", in der USP-Linie)
6. **Standort:** Willich (NRW). Nicht Hamburg, nicht Berlin.
7. **Amber (`#E8A060`) ist die einzige Akzentfarbe.** Grün (`#4CAF8A`) ausschließlich für Checkmarks oder im Logo-Untertitel.
8. **Tier-Namen exakt:** `CLASSIC`, `CLASSIC+`, `SMART`, `SMART+`. Keine alternativen Namen wie "Basic", "Pro" etc.

---

## 7. Design-System / CSS

Alle Design-Tokens sind in [`src/index.css`](src/index.css) zentral:

```css
@theme {
  /* Hintergrund-Töne (dunkel zu hell innerhalb Dark Mode) */
  --color-deepest: #0a0908;
  --color-mid: #0e0d0b;
  --color-base: #141210;
  --color-raised: #1a1814;
  --color-hover: #201e1b;

  /* Akzent */
  --color-amber: #e8a060;
  --color-amber-dark: #c9893d;

  /* Tracking */
  --tracking-logo: 0.20em;
  --tracking-label: 0.18em;
  --tracking-btn: 0.10em;
  --tracking-eyebrow: 0.22em;
}
```

**Wichtig:** Custom-Utilities (in `index.css`):
- `fg-primary` (100%), `fg-high` (82%), `fg-mid` (60%), `fg-low` (45%), `fg-minimal` (35%), `fg-ghost` (8%) — Text-Opazitäts-Hierarchie. Werte sind absolut, **bitte einhalten** für Lesbarkeit (WCAG AA).
- `surface-soft` — Standard-Karten-Look (solid `bg-raised`, 1px Border `rgba(255,255,255,0.08)`, rounded)
- `hero-grid`, `no-scrollbar` — punktuelle Utilities

**Schriften:** Inter (regular/medium/bold) + Material Symbols Outlined (für Icons). Beide werden aus Google Fonts geladen.

---

## 8. Was ist Platzhalter und sollte NICHT 1:1 übernommen werden

Diese Elemente sind absichtlich noch nicht final:

1. **CategoryGrid:** 3 von 4 Kategorien sind "Demnächst" (Filament, Panels-Kachel-Optik ist verfügbar, Ceiling Lights "Demnächst"). Bei Shopify entsprechend nur echte Collections anzeigen.
2. **Mega-Menü "In Vorbereitung":** Apple Home + SmartThings stehen als "Demnächst"-Pills. Bleibt so bis SMART+ ready.
3. **TierLadder Bilder für CLASSIC/CLASSIC+:** sind aktuell Platzhalter mit "Bild folgt"-Text. Wenn echte Bilder da sind, einbinden.
4. **AGB + Widerruf im Footer:** Aktuell nicht klickbar mit "folgt zum Launch"-Tooltip. Bei Shopify echte Pages anlegen.
5. **Hero-Galerie:** Aktuell 1 echtes Produktbild + 7 Platzhalter-Slots "BILD 1–8". Wenn mehr Produktfotos vorhanden, ersetzen.
6. **Impressum/Datenschutz:** Boilerplate-Texte mit "Konzept-Phase"-Hinweis. Vor Live-Gang juristisch prüfen lassen.
7. **CTA "Bei Amazon ansehen"** auf Smart-Bulb-Produktseiten: Aktuell führt zu `amazon.de` Homepage — bei Shopify entweder echte Amazon-Produkt-Links oder durch "In den Warenkorb" ersetzen.
8. **CTA "Anfrage stellen"** bei Panels: Aktuell `mailto:support@lumo-nova.de` — bei Shopify kann das ein Anfrage-Formular werden.
9. **Reviews-Sektion:** wurde **bewusst entfernt**, weil ohne echte Reviews unglaubwürdig. Erst rein wenn echte Reviews da sind.

---

## 9. Empfohlene Reihenfolge für Daniel

1. **Live-URL anschauen:** https://lumonova-concept.vercel.app/ — durchscrollen, alle drei Pages besuchen, in DevTools Werte inspizieren wenn nötig
2. **Datenmodell verstehen:** [`src/components/lumonova/products.ts`](src/components/lumonova/products.ts) komplett lesen — daraus ergibt sich die ganze Shopify-Produkt-Struktur (Metafields, Tags)
3. **Design-Tokens übernehmen:** [`src/index.css`](src/index.css) `@theme`-Block in dein Shopify-Theme `assets/base.css` oder `theme.scss` als CSS-Variablen übernehmen
4. **Anfangen mit:** **Produktdetailseite** (`/product/:id`) — wenn die steht, hast du 80% der Sektionen schon abgedeckt (Hero, Features, Specs, Compatibility, Trust)
5. **Dann:** Collection, Homepage, statische Pages

---

## 10. Fragen an Leon

Wenn Du beim Übersetzen auf etwas stößt was unklar ist (welche Daten kommen aus Shopify-DB vs. statisch, ob ein Element noch geändert werden soll, etc.), **frag Leon direkt**. Dieses Doc beschreibt den aktuellen Konzept-Stand, nicht alle final Entscheidungen.
