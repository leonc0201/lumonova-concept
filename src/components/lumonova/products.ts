export type Tier = "CLASSIC" | "CLASSIC+" | "SMART" | "SMART+";
export type Category = "Smart Bulbs" | "Filament" | "Panels" | "Ceiling Lights";

export interface SpecRow {
  label: string;
  value: string;
  accent?: boolean;
}

export interface FeatureBlock {
  eyebrow: string;
  title: string;
  text: string;
  imageOnLeft: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

export interface CompatCard {
  number: string;
  name: string;
  badgeSrc: string;
  badgeAlt: string;
}

export interface ProductCompatibility {
  available: CompatCard[];
  comingSoon: string[];
}

export interface IntroHero {
  eyebrow: string;
  headline: string;
  imageSrc: string;
}

export interface ProductCta {
  primaryLabel: string;
  primaryHref: string;
  primaryExternal?: boolean;
}

export interface Product {
  id: string;                  // URL-slug (= sku.toLowerCase()), wird in /product/:id verwendet
  sku: string;                 // Technische Artikelnummer (Display)
  name: string;                // Lesbarer Produktname
  tier: Tier;
  category: Category;
  price: number | null;        // null => "Preis auf Anfrage"
  shortDescription: string;    // Hero-Untertitel
  usps: string[];              // 4 Bulletpoints im Hero
  specs: SpecRow[];            // Specs-Tabelle
  features?: FeatureBlock[];   // 2–3 Feature-Blöcke (optional, derzeit Bulbs)
  compatibility?: ProductCompatibility; // nur bei Smart-Produkten
  introHero?: IntroHero;       // Lifestyle-Banner (optional)
  imageSrc?: string;           // Hauptbild für Karten + Galerie
  warranty: string;            // "3 Jahre EU-Garantie" / "2 Jahre Garantie"
  cta: ProductCta;             // CTA-Konfiguration
}

// ───────────────────────────────────────────────────────────
//  Gemeinsame Bausteine (Wiederverwendung über mehrere Produkte)
// ───────────────────────────────────────────────────────────

const BULB_USPS = [
  "Wi-Fi 2.4 GHz — direkte Verbindung, kein Hub",
  "Amazon Alexa & Google Home kompatibel",
  "16 Mio. Farben + Tunable White 1800K–6500K",
  "3 Jahre EU-Garantie · CE / WEEE / RoHS",
];

const BULB_FEATURES: FeatureBlock[] = [
  {
    eyebrow: "Farbe",
    title: "16 Millionen Farben.",
    text: "Vom satten Sonnenuntergang bis zum kühlen Tageslicht — der volle RGB-Farbraum, präzise gesteuert über App oder Sprache.",
    imageOnLeft: true,
    imageSrc: "/images-optimized/atmosphere/Farbvielfalt.webp",
    imageAlt: "Wohnraum mit RGB-Farbakzenten in unterschiedlichen Stimmungen",
  },
  {
    eyebrow: "Tunable White",
    title: "1800 K – 6500 K.",
    text: "Warmes Kerzenlicht am Abend, klares Arbeitslicht am Morgen. Die Farbtemperatur passt sich Deinem Tag an.",
    imageOnLeft: false,
    imageSrc: "/images-optimized/atmosphere/Romantik%20Dinner_edit.webp",
    imageAlt: "Romantisch warm beleuchtetes Dinner-Setting",
  },
  {
    eyebrow: "App & Sprachsteuerung",
    title: "Per App. Per Stimme.",
    text: "Steuere Dein Licht über die Tuya Smart App, Amazon Alexa oder Google Home — direkt per WLAN, ohne Hub oder Bridge.",
    imageOnLeft: true,
    imageSrc: "/images-optimized/atmosphere/Smart%20Control.webp",
    imageAlt: "Smart-Home-Steuerung per App und Sprache",
  },
];

const BULB_COMPATIBILITY: ProductCompatibility = {
  available: [
    {
      number: "01",
      name: "Google Home",
      badgeSrc: "/images-optimized/logo/works%20with%20Google%20Home.webp",
      badgeAlt: "Works with Google Home",
    },
    {
      number: "02",
      name: "Amazon Alexa",
      badgeSrc: "/images-optimized/logo/works%20with%20Alexa.webp",
      badgeAlt: "Works with Amazon Alexa",
    },
    {
      number: "03",
      name: "Tuya Smart App",
      badgeSrc: "/images-optimized/logo/Tuya%20Logo.webp",
      badgeAlt: "Tuya Smart",
    },
  ],
  comingSoon: ["Apple Home", "SmartThings"],
};

const BULB_INTRO_HERO: IntroHero = {
  eyebrow: "LUMOnova Smart Bulbs",
  headline: "Licht, das sich Deinem Tag anpasst.",
  imageSrc: "/images-optimized/hero/Farbvielfalt_3.webp",
};

const BULB_AMAZON_CTA: ProductCta = {
  primaryLabel: "Bei Amazon ansehen →",
  primaryHref: "https://www.amazon.de",
  primaryExternal: true,
};

// Spec-Bausteine für Bulbs — identische Werte außer Sockel, Leistung, Lichtstrom, Maße
function bulbSpecs(
  socket: string,
  power: string,
  lumens: string,
  dims: string
): SpecRow[] {
  return [
    { label: "Sockel", value: socket },
    { label: "Leistung", value: power },
    { label: "Lichtstrom", value: lumens },
    { label: "Farbtemperatur", value: "1800 K – 6500 K" },
    { label: "RGB", value: "16 Mio. Farben" },
    { label: "Protokoll", value: "Wi-Fi 2.4 GHz (Tuya)" },
    { label: "App", value: "Tuya Smart / Smart Life" },
    { label: "Kompatibilität", value: "Amazon Alexa, Google Home" },
    { label: "Lebensdauer", value: "25.000 h" },
    { label: "Maße", value: dims },
    { label: "Zertifikate", value: "CE, WEEE, RoHS" },
    { label: "Garantie", value: "3 Jahre EU", accent: true },
  ];
}

// Panel-Specs (alle gleich außer Maße)
function panelSpecs(dims: string): SpecRow[] {
  return [
    { label: "Abmessungen", value: dims },
    { label: "Leistung", value: "36 W" },
    { label: "Lichtstrom", value: "4.320 lm" },
    { label: "Effizienz", value: "120 lm/W" },
    { label: "Farbtemperatur", value: "3000 / 4000 / 6500 K (CCT-Switch)" },
    { label: "Farbwiedergabe", value: "CRI > 80" },
    { label: "Blendung", value: "UGR < 19" },
    { label: "Lebensdauer", value: "70.000 h (L80)" },
    { label: "Spannung", value: "200–240 V AC, 50/60 Hz" },
    { label: "Schutzart", value: "IP20" },
    { label: "Montage", value: "Einbau (Rasterdecke)" },
    { label: "Material", value: "Alu-Rahmen, SPCC, PMMA-Linse" },
    { label: "Zertifikate", value: "CE, RoHS" },
    { label: "Garantie", value: "2 Jahre", accent: true },
  ];
}

const PANEL_USPS = [
  "CCT-Switch — Warmweiß / Neutralweiß / Tageslicht (3000 / 4000 / 6500 K)",
  "4.320 Lumen — direktes, blendfreies Office-Licht (UGR < 19)",
  "70.000 h Lebensdauer (L80) bei 120 lm/W Effizienz",
  "2 Jahre Garantie · CE / RoHS · Einbau in Rasterdecke",
];

const PANEL_FEATURES: FeatureBlock[] = [
  {
    eyebrow: "Drei Lichtfarben",
    title: "Ein Panel. Drei Stimmungen.",
    text: "Schiebeschalter direkt am Panel: 3000 K für warme Räume, 4000 K für konzentriertes Arbeiten, 6500 K für Aufgaben mit hoher Sehleistung.",
    imageOnLeft: true,
    imageSrc: "/images-optimized/atmosphere/Smart%20Control.webp",
    imageAlt: "CCT-Switch am Panel — Warmweiß bis Tageslicht",
  },
  {
    eyebrow: "Office-Tauglich",
    title: "UGR < 19. CRI > 80.",
    text: "Die Werte, auf die Architekten und Planer achten: blendfreie Mikroprismatik-Linse für entspanntes Arbeiten, naturgetreue Farbwiedergabe für Meetings und Präsentationen.",
    imageOnLeft: false,
    imageAlt: "Büro mit blendfreier LED-Panel-Beleuchtung",
  },
];

const PANEL_REQUEST_CTA: ProductCta = {
  primaryLabel: "Anfrage stellen →",
  primaryHref:
    "mailto:support@lumonova.com?subject=Anfrage%20LUMOnova%20Panel",
  primaryExternal: false,
};

// ───────────────────────────────────────────────────────────
//  Produkt-Definitionen
// ───────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  // SMART BULBS ────────────────────────────────────────────
  {
    id: "lm-b-a60-sh",
    sku: "LM-B-A60-SH",
    name: "Smart Bulb A60 E27",
    tier: "SMART",
    category: "Smart Bulbs",
    price: 29.99,
    shortDescription: "E27 · RGB+CCT · 806 lm · Kein Hub erforderlich",
    usps: BULB_USPS,
    specs: bulbSpecs("E27", "9 W (ersetzt 60 W)", "806 lm", "Ø 60 × 110 mm"),
    features: BULB_FEATURES,
    compatibility: BULB_COMPATIBILITY,
    introHero: BULB_INTRO_HERO,
    imageSrc: "/images-optimized/products/Lumonova_LM-A60SM_1.webp",
    warranty: "3 Jahre EU-Garantie",
    cta: BULB_AMAZON_CTA,
  },
  {
    id: "lm-b-a70-sh",
    sku: "LM-B-A70-SH",
    name: "Smart Bulb A70 E27",
    tier: "SMART",
    category: "Smart Bulbs",
    price: 29.99,
    shortDescription: "E27 · RGB+CCT · 1.055 lm · Kein Hub erforderlich",
    usps: BULB_USPS,
    specs: bulbSpecs("E27", "11 W (ersetzt 75 W)", "1.055 lm", "Ø 70 × 130 mm"),
    features: BULB_FEATURES,
    compatibility: BULB_COMPATIBILITY,
    introHero: BULB_INTRO_HERO,
    imageSrc: "/images-optimized/products/Lumonova_LM-A70SM_1.webp",
    warranty: "3 Jahre EU-Garantie",
    cta: BULB_AMAZON_CTA,
  },
  {
    id: "lm-b-g45-e14-sh",
    sku: "LM-B-G45-E14-SH",
    name: "Smart Bulb G45 E14",
    tier: "SMART",
    category: "Smart Bulbs",
    price: 29.99,
    shortDescription: "E14 · Tropfen · RGB+CCT · 470 lm · Kein Hub erforderlich",
    usps: BULB_USPS,
    specs: bulbSpecs("E14", "5 W (ersetzt 40 W)", "470 lm", "Ø 45 × 78 mm"),
    features: BULB_FEATURES,
    compatibility: BULB_COMPATIBILITY,
    introHero: BULB_INTRO_HERO,
    imageSrc: "/images-optimized/products/Lumonova_LM-G45SM-14_1.webp",
    warranty: "3 Jahre EU-Garantie",
    cta: BULB_AMAZON_CTA,
  },
  {
    id: "lm-b-g45-e27-sh",
    sku: "LM-B-G45-E27-SH",
    name: "Smart Bulb G45 E27",
    tier: "SMART",
    category: "Smart Bulbs",
    price: 29.99,
    shortDescription: "E27 · Tropfen · RGB+CCT · 470 lm · Kein Hub erforderlich",
    usps: BULB_USPS,
    specs: bulbSpecs("E27", "5 W (ersetzt 40 W)", "470 lm", "Ø 45 × 78 mm"),
    features: BULB_FEATURES,
    compatibility: BULB_COMPATIBILITY,
    introHero: BULB_INTRO_HERO,
    imageSrc: "/images-optimized/products/Lumonova_LM-G45SM-27_1.webp",
    warranty: "3 Jahre EU-Garantie",
    cta: BULB_AMAZON_CTA,
  },
  {
    id: "lm-b-gu10-sh",
    sku: "LM-B-GU10-SH",
    name: "Smart Bulb GU10",
    tier: "SMART",
    category: "Smart Bulbs",
    price: 29.99,
    shortDescription: "GU10 · Spot · RGB+CCT · 350 lm · Kein Hub erforderlich",
    usps: BULB_USPS,
    specs: bulbSpecs("GU10", "5 W (ersetzt 35 W)", "350 lm", "Ø 50 × 54 mm"),
    features: BULB_FEATURES,
    compatibility: BULB_COMPATIBILITY,
    introHero: BULB_INTRO_HERO,
    imageSrc: "/images-optimized/products/Lumonova_LM-GU10SM_1.webp",
    warranty: "3 Jahre EU-Garantie",
    cta: BULB_AMAZON_CTA,
  },

  // CLASSIC PANELS ─────────────────────────────────────────
  {
    id: "lm-p62-36w-co",
    sku: "LM-P62-36W-CO",
    name: "LED Panel 62×62",
    tier: "CLASSIC",
    category: "Panels",
    price: null,
    shortDescription: "620 × 620 mm · 36 W · 4.320 lm · CCT-Switch 3000/4000/6500 K",
    usps: PANEL_USPS,
    specs: panelSpecs("620 × 620 × 32 mm"),
    features: PANEL_FEATURES,
    imageSrc: "/images-optimized/products/Lumonova_LM-P62-36W-CO_1.webp",
    warranty: "2 Jahre Garantie",
    cta: PANEL_REQUEST_CTA,
  },
  {
    id: "lm-p12030-36w-co",
    sku: "LM-P12030-36W-CO",
    name: "LED Panel 30×120",
    tier: "CLASSIC",
    category: "Panels",
    price: null,
    shortDescription: "295 × 1195 mm · 36 W · 4.320 lm · CCT-Switch 3000/4000/6500 K",
    usps: PANEL_USPS,
    specs: panelSpecs("295 × 1195 × 34 mm"),
    features: PANEL_FEATURES,
    imageSrc: "/images-optimized/products/Lumonova_LM-P12030-36W-CO_1.webp",
    warranty: "2 Jahre Garantie",
    cta: PANEL_REQUEST_CTA,
  },
];

// Lookup-Helper für die dynamische Produkt-Detailseite
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
