export type Tier = "CLASSIC" | "CLASSIC+" | "SMART" | "SMART+";
export type Category = "Smart Bulbs" | "Filament" | "Panels" | "Ceiling Lights";

export interface Product {
  id: string;
  name: string;
  sku: string;
  tier: Tier;
  category: Category;
  price: number;
  description: string;
  imageSrc?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "lm-a60sm",
    name: "Smart Bulb E27",
    sku: "LM-A60SM",
    tier: "SMART",
    category: "Smart Bulbs",
    price: 29.99,
    description: "E27 · Standard-Birne · RGB+CCT · Wi-Fi · Alexa & Google",
    imageSrc: "/images-optimized/products/Lumonova_LM-A60SM_1.webp",
  },
  {
    id: "lm-a70sm",
    name: "Smart Bulb E27 XL",
    sku: "LM-A70SM",
    tier: "SMART",
    category: "Smart Bulbs",
    price: 29.99,
    description: "E27 · Große Birne · RGB+CCT · Wi-Fi · Alexa & Google",
    imageSrc: "/images-optimized/products/Lumonova_LM-A70SM_1.webp",
  },
  {
    id: "lm-g45sm-14",
    name: "Smart Bulb E14",
    sku: "LM-G45SM-14",
    tier: "SMART",
    category: "Smart Bulbs",
    price: 29.99,
    description: "E14 · Tropfenform · RGB+CCT · Wi-Fi · Alexa & Google",
    imageSrc: "/images-optimized/products/Lumonova_LM-G45SM-14_1.webp",
  },
  {
    id: "lm-gu10sm",
    name: "Smart Spot GU10",
    sku: "LM-GU10SM",
    tier: "SMART",
    category: "Smart Bulbs",
    price: 29.99,
    description: "GU10 · Spot · RGB+CCT · Wi-Fi · Alexa & Google",
    imageSrc: "/images-optimized/products/Lumonova_LM-GU10SM_1.webp",
  },
];
