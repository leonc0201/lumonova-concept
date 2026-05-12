import { useState } from "react";

interface Category {
  name: string;
  description: string;
  icon: string;
  available: boolean;
}

const CATEGORIES: Category[] = [
  {
    name: "Smart Bulbs",
    description: "E27, E14, GU10 – RGB+CCT, Matter und klassisch",
    icon: "lightbulb",
    available: true,
  },
  {
    name: "Filament",
    description: "Vintage-Optik mit warmweißem LED-Filament",
    icon: "emoji_objects",
    available: false,
  },
  {
    name: "Panels",
    description: "LED-Backlit-Panels für Büro und Decke",
    icon: "grid_view",
    available: true,
  },
  {
    name: "Ceiling Lights",
    description: "Deckenleuchten mit Matter und Sensorik",
    icon: "wb_iridescent",
    available: false,
  },
];

function CategoryCard({ category }: { category: Category }) {
  const { name, description, icon, available } = category;
  const [hover, setHover] = useState(false);

  const iconGlow = available
    ? hover
      ? "drop-shadow(0 0 14px rgba(232,160,96,0.85))"
      : "drop-shadow(0 0 8px rgba(232,160,96,0.60))"
    : "none";

  return (
    <article
      className={`group flex flex-col p-8 transition-all duration-300 ${
        available ? "cursor-pointer hover:-translate-y-1" : ""
      }`}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${
          available && hover
            ? "rgba(232,160,96,0.25)"
            : "rgba(255,255,255,0.06)"
        }`,
        borderRadius: "1rem",
      }}
      onMouseEnter={() => available && setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-disabled={!available || undefined}
    >
      {/* Icon-Container (quadratisch, leicht gerundet) */}
      <span
        className="inline-flex items-center justify-center mb-6"
        style={{
          width: 64,
          height: 64,
          borderRadius: "0.75rem",
          background: "rgba(232,160,96,0.10)",
          opacity: available ? 1 : 0.3,
          transition: "background 0.3s",
        }}
        aria-hidden="true"
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 32,
            color: "var(--color-amber)",
            filter: iconGlow,
            transition: "filter 0.3s",
          }}
        >
          {icon}
        </span>
      </span>

      {/* Inhalt */}
      <h3
        className="text-[19px] font-bold mb-2"
        style={{ color: "rgba(242,242,242,0.90)" }}
      >
        {name}
      </h3>
      <p
        className="text-[14px] mb-6"
        style={{ color: "rgba(242,242,242,0.55)", lineHeight: 1.6 }}
      >
        {description}
      </p>

      {/* Status-Pill */}
      <div className="mt-auto">
        {available ? (
          <span
            className="inline-flex items-center gap-2 text-[12px] font-medium uppercase"
            style={{
              color: "rgba(232,160,96,0.80)",
              letterSpacing: "var(--tracking-label)",
            }}
          >
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-amber)" }}
            />
            Verfügbar
          </span>
        ) : (
          <span
            className="inline-flex items-center rounded-full"
            style={{
              fontSize: 11,
              padding: "3px 10px",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(242,242,242,0.50)",
              letterSpacing: "0.06em",
            }}
          >
            Demnächst
          </span>
        )}
      </div>
    </article>
  );
}

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {CATEGORIES.map((c) => (
        <CategoryCard key={c.name} category={c} />
      ))}
    </div>
  );
}
