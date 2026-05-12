import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Nav } from "@/components/lumonova/Nav";
import { Footer } from "@/components/lumonova/Footer";
import { AmberButton } from "@/components/lumonova/AmberButton";
import { SectionHeading } from "@/components/lumonova/SectionHeading";
import { ProductCard } from "@/components/lumonova/ProductCard";
import { PRODUCTS } from "@/components/lumonova/products";

const ALL_CATEGORIES = "Alle";
const ALL_TIERS = "Alle Tiers";

interface ChipOption {
  value: string;
  icon?: string;
}

const CATEGORIES: ChipOption[] = [
  { value: ALL_CATEGORIES, icon: "grid_view" },
  { value: "Smart Bulbs", icon: "lightbulb" },
  { value: "Filament", icon: "emoji_objects" },
  { value: "Panels", icon: "grid_on" },
  { value: "Ceiling Lights", icon: "light_mode" },
];

const TIERS: ChipOption[] = [
  { value: ALL_TIERS },
  { value: "CLASSIC" },
  { value: "CLASSIC+" },
  { value: "SMART" },
  { value: "SMART+" },
];

const SORT_OPTIONS = [
  { value: "recommended", label: "Empfohlen" },
  { value: "price-asc", label: "Preis: aufsteigend" },
  { value: "price-desc", label: "Preis: absteigend" },
];

interface FilterChipProps {
  active: boolean;
  icon?: string;
  onClick: () => void;
  children: ReactNode;
}

function FilterChip({ active, icon, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="inline-flex items-center rounded-full transition-all whitespace-nowrap"
      style={{
        background: active
          ? "rgba(232,160,96,0.12)"
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${
          active ? "rgba(232,160,96,0.30)" : "rgba(255,255,255,0.08)"
        }`,
        color: active ? "var(--color-amber)" : "rgba(242,242,242,0.50)",
        padding: "6px 16px",
        fontSize: 13,
        fontWeight: active ? 600 : 500,
        scrollSnapAlign: "start",
        boxShadow: active ? "0 0 14px rgba(232,160,96,0.18)" : "none",
      }}
    >
      {icon && (
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 17,
            marginRight: 6,
            verticalAlign: "middle",
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}

interface ChipRowProps {
  label: string;
  options: ChipOption[];
  active: string;
  onChange: (value: string) => void;
}

function ChipRow({ label, options, active, onChange }: ChipRowProps) {
  return (
    <div>
      <p
        className="text-[10px] font-bold uppercase mb-3"
        style={{
          color: "rgba(242,242,242,0.30)",
          letterSpacing: "0.16em",
        }}
      >
        {label}
      </p>
      <div
        className="flex gap-2 overflow-x-auto no-scrollbar"
        style={{
          paddingBottom: 4,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {options.map((opt) => (
          <FilterChip
            key={opt.value}
            active={active === opt.value}
            icon={opt.icon}
            onClick={() => onChange(opt.value)}
          >
            {opt.value}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES);
  const [activeTier, setActiveTier] = useState<string>(ALL_TIERS);
  const [sort, setSort] = useState<string>("recommended");

  const filtered = useMemo(() => {
    const base = PRODUCTS.filter((p) => {
      const catMatch =
        activeCategory === ALL_CATEGORIES || p.category === activeCategory;
      const tierMatch = activeTier === ALL_TIERS || p.tier === activeTier;
      return catMatch && tierMatch;
    });

    // null-Preise ("Auf Anfrage") werden beim Preis-Sort immer ans Ende gestellt
    const priceValue = (p: { price: number | null }) =>
      p.price === null ? Number.POSITIVE_INFINITY : p.price;

    if (sort === "price-asc") {
      return [...base].sort((a, b) => priceValue(a) - priceValue(b));
    }
    if (sort === "price-desc") {
      return [...base].sort((a, b) => priceValue(b) - priceValue(a));
    }
    return base;
  }, [activeCategory, activeTier, sort]);

  const resetFilters = () => {
    setActiveCategory(ALL_CATEGORIES);
    setActiveTier(ALL_TIERS);
  };

  return (
    <div className="bg-base min-h-screen">
      <Nav />

      {/* ZONE 1 + 2 — Header, Filter, Grid (zusammengeführt, kein harter Schnitt) */}
      <section className="bg-base" style={{ padding: "5rem 0" }}>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Sortiment"
            title="Alle Produkte."
            subtitle="Vier Tiers. Eine Marke. Licht für jeden Anspruch."
            withAccent
          />

          {/* Filter */}
          <div className="flex flex-col gap-4" style={{ marginTop: "2.5rem" }}>
            <ChipRow
              label="Kategorie"
              options={CATEGORIES}
              active={activeCategory}
              onChange={setActiveCategory}
            />
            <ChipRow
              label="Tier"
              options={TIERS}
              active={activeTier}
              onChange={setActiveTier}
            />
          </div>

          {/* Toolbar – Trennlinie entfernt, kompakter Abstand */}
          <div
            className="flex items-center justify-between gap-4 flex-wrap"
            style={{ marginTop: "1.5rem", marginBottom: "2rem" }}
          >
            <p
              className="text-[13px] font-medium"
              style={{ color: "rgba(242,242,242,0.30)" }}
              aria-live="polite"
            >
              {filtered.length}{" "}
              {filtered.length === 1 ? "Produkt" : "Produkte"}
            </p>

            <label
              className="flex items-center gap-2 text-[13px]"
              style={{ color: "rgba(242,242,242,0.50)" }}
            >
              <span>Sortierung:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "6px 12px",
                  fontSize: 13,
                  color: "rgba(242,242,242,0.50)",
                }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    style={{ background: "#141210" }}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Grid oder Empty State */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          ) : (
            <div
              className="text-center"
              style={{ padding: "5rem 0" }}
              role="status"
            >
              <span
                className="material-symbols-outlined block mb-4"
                style={{
                  fontSize: 48,
                  color: "rgba(242,242,242,0.15)",
                }}
                aria-hidden="true"
              >
                search_off
              </span>
              <p
                className="text-[17px] font-bold mb-2"
                style={{ color: "rgba(242,242,242,0.40)" }}
              >
                Keine Produkte gefunden.
              </p>
              <p
                className="text-[14px] mb-6"
                style={{ color: "rgba(242,242,242,0.25)" }}
              >
                Versuche einen anderen Filter.
              </p>
              <AmberButton variant="ghost" onClick={resetFilters}>
                Filter zurücksetzen
              </AmberButton>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collection;
