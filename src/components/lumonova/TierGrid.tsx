import { motion } from "framer-motion";
import type { Tier } from "./products";

interface TierData {
  step: string;
  name: Tier;
  range: string;
  features: string[];
  recommended?: boolean;
  comingSoon?: boolean;
}

const TIERS: TierData[] = [
  {
    step: "Stufe 01",
    name: "CLASSIC",
    range: "€20–€60",
    features: [
      "Warmweißes Licht (2700K)",
      "Stufenlos dimmbar",
      "25.000h Lebensdauer",
      "IP44 / IP65 Schutz",
    ],
  },
  {
    step: "Stufe 02",
    name: "CLASSIC+",
    range: "€35–€80",
    features: [
      "CCT-Schalter (2700K–6500K)",
      "Bewegungssensor optional",
      "Kein App-Setup nötig",
      "IP65 Schutz",
    ],
  },
  {
    step: "Stufe 03",
    name: "SMART",
    range: "€35–€80",
    features: [
      "Wi-Fi 2.4 GHz, kein Hub",
      "Amazon Alexa & Google Home",
      "App-Steuerung (Tuya Smart)",
      "RGB + CCT Vollspektrum",
    ],
    recommended: true,
  },
  {
    step: "Stufe 04",
    name: "SMART+",
    range: "€55–€120",
    features: [
      "Matter over Wi-Fi (kein Hub)",
      "Apple Home, Alexa, Google, SmartThings",
      "Lokale Steuerung ohne Internet",
      "3 Jahre EU-Garantie",
    ],
    comingSoon: true,
  },
];

function TierCard({ tier }: { tier: TierData }) {
  const isRecommended = !!tier.recommended;
  const isComingSoon = !!tier.comingSoon;

  return (
    <article
      className="relative group flex flex-col rounded-2xl p-12 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      style={
        isRecommended
          ? {
              background:
                "linear-gradient(to bottom, rgba(232,160,96,0.10), transparent)",
              border: "1px solid rgba(232,160,96,0.20)",
              boxShadow: "0 20px 50px rgba(232,160,96,0.10)",
            }
          : {
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }
      }
      onMouseEnter={(e) => {
        if (!isRecommended)
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        if (!isRecommended)
          e.currentTarget.style.background = "rgba(255,255,255,0.02)";
      }}
    >
      {/* Oben */}
      <div className="flex-1">
        <p
          className="fg-low text-[9px] font-bold uppercase mb-2"
          style={{ letterSpacing: "var(--tracking-label)" }}
        >
          {tier.step}
        </p>
        <h3 className="fg-primary text-[28px] font-bold tracking-tight">
          {tier.name}
        </h3>
        <p className="text-amber text-[22px] font-bold mt-1">{tier.range}</p>

        <ul className="flex flex-col gap-6 mt-12">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span
                className="material-symbols-outlined flex-shrink-0"
                style={{
                  fontSize: 18,
                  color: isRecommended
                    ? "var(--color-amber)"
                    : "rgba(232,160,96,0.60)",
                }}
                aria-hidden="true"
              >
                check_circle
              </span>
              <span className="fg-mid text-[14px] leading-snug">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Unten – Button oder Demnächst-Pill */}
      {isComingSoon ? (
        <div className="mt-10 flex justify-center">
          <span
            className="inline-flex items-center rounded-full uppercase select-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(242,242,242,0.35)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "var(--tracking-btn)",
              padding: "6px 16px",
            }}
          >
            Demnächst
          </span>
        </div>
      ) : (
        <button
          type="button"
          className="mt-10 w-full rounded-lg py-4 text-[11px] font-bold uppercase transition-all"
          style={
            isRecommended
              ? {
                  background: "var(--color-amber)",
                  color: "#fff",
                  letterSpacing: "var(--tracking-btn)",
                  border: "1px solid transparent",
                }
              : {
                  background: "transparent",
                  color: "rgba(242,242,242,1)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  letterSpacing: "var(--tracking-btn)",
                }
          }
          onMouseEnter={(e) => {
            if (isRecommended) {
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(232,160,96,0.35)";
            } else {
              e.currentTarget.style.background = "var(--color-amber)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "transparent";
            }
          }}
          onMouseLeave={(e) => {
            if (isRecommended) {
              e.currentTarget.style.boxShadow = "none";
            } else {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(242,242,242,1)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
            }
          }}
        >
          Mehr erfahren
        </button>
      )}
    </article>
  );
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

export function TierGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {TIERS.map((t, i) => (
        <motion.div key={t.name} custom={i} variants={cardVariant}>
          <TierCard tier={t} />
        </motion.div>
      ))}
    </motion.div>
  );
}
