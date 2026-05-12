import { Link } from "react-router-dom";
import type { Tier } from "./products";

export type GlowMode = "off" | "subtle" | "default";

interface ProductCardProps {
  id: string;
  name: string;
  sku: string;
  tier: Tier;
  price: number | null;
  description?: string;
  imageSrc?: string;
  glow?: GlowMode;
}

const GLOW_CLASS: Record<GlowMode, string> = {
  off: "hidden",
  subtle:
    "absolute rounded-full bg-amber/[0.08] group-hover:bg-amber/[0.15] transition-colors duration-[250ms]",
  default:
    "absolute rounded-full bg-amber/[0.18] group-hover:bg-amber/[0.32] transition-colors duration-[250ms]",
};

const TIER_PILL: Record<
  Tier,
  { color: string; border: string }
> = {
  CLASSIC: {
    color: "rgba(232,160,96,0.55)",
    border: "1px solid rgba(232,160,96,0.15)",
  },
  "CLASSIC+": {
    color: "rgba(232,160,96,0.65)",
    border: "1px solid rgba(232,160,96,0.20)",
  },
  SMART: {
    color: "rgba(232,160,96,0.75)",
    border: "1px solid rgba(232,160,96,0.25)",
  },
  "SMART+": {
    color: "#E8A060",
    border: "1px solid rgba(232,160,96,0.40)",
  },
};

function formatPrice(price: number | null): string {
  if (price === null) return "Auf Anfrage";
  return `€${price.toFixed(2).replace(".", ",")}`;
}

export function ProductCard({
  id,
  name,
  sku,
  tier,
  price,
  imageSrc,
  glow = "default",
}: ProductCardProps) {
  const pill = TIER_PILL[tier];
  const priceIsRequest = price === null;
  const glowClass = GLOW_CLASS[glow];

  return (
    <Link
      to={`/product/${id}`}
      className="block"
      aria-label={`${name} – Details ansehen`}
    >
      <article
        className="group flex flex-col rounded-xl overflow-hidden cursor-pointer transition-colors duration-200 h-full"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "rgba(232,160,96,0.25)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")
        }
      >
        {/* Bild-Bereich */}
        <div
          className="relative bg-mid flex items-center justify-center"
          style={{ height: 220 }}
        >
          {/* Ambient Glow – Intensität ueber glow-Prop konfigurierbar */}
          {glow !== "off" && (
            <div
              className={glowClass}
              aria-hidden="true"
              style={{
                width: 150,
                height: 150,
                filter: "blur(32px)",
              }}
            />
          )}

          {/* Tier-Pill */}
          <span
            className="absolute top-3 left-3 rounded-full font-bold uppercase"
            style={{
              fontSize: 9,
              padding: "4px 10px",
              background: "rgba(14,12,10,0.90)",
              color: pill.color,
              border: pill.border,
              letterSpacing: "var(--tracking-btn)",
              zIndex: 2,
            }}
          >
            {tier}
          </span>

          {imageSrc ? (
            <img
              src={imageSrc}
              alt={name}
              className="relative object-contain"
              style={{
                maxHeight: 180,
                zIndex: 2,
                filter: "drop-shadow(0 0 30px rgba(232,160,96,0.25))",
              }}
              loading="lazy"
            />
          ) : (
            <span
              className="relative material-symbols-outlined text-amber"
              style={{
                fontSize: 80,
                zIndex: 2,
                filter: "drop-shadow(0 0 30px rgba(232,160,96,0.35))",
              }}
              aria-hidden="true"
            >
              lightbulb
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div>
            <h3
              className="text-[15px] font-bold"
              style={{ color: "rgba(242,242,242,0.85)" }}
            >
              {name}
            </h3>
            <p
              className="text-[11px] mt-1 uppercase"
              style={{
                color: "rgba(242,242,242,0.45)",
                letterSpacing: "0.06em",
              }}
            >
              {sku}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 mt-auto">
            <p
              className="font-bold"
              style={{
                fontSize: priceIsRequest ? 13 : 17,
                color: priceIsRequest
                  ? "rgba(242,242,242,0.65)"
                  : "#F2F2F2",
              }}
            >
              {formatPrice(price)}
            </p>
            <span
              className="inline-flex items-center gap-1 rounded-full font-bold uppercase text-amber transition-colors"
              style={{
                fontSize: 11,
                padding: "5px 12px",
                background: "rgba(232,160,96,0.08)",
                border: "1px solid rgba(232,160,96,0.18)",
                letterSpacing: "var(--tracking-btn)",
              }}
            >
              Ansehen
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 15 }}
                aria-hidden="true"
              >
                arrow_forward
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
