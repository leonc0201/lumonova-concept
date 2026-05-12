import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Nav } from "@/components/lumonova/Nav";
import { Footer } from "@/components/lumonova/Footer";
import { AmberButton } from "@/components/lumonova/AmberButton";
import { SectionHeading } from "@/components/lumonova/SectionHeading";
import { TrustRow } from "@/components/lumonova/TrustRow";

const HERO_USPS = [
  "Wi-Fi 2.4 GHz — direkte Verbindung, kein Hub",
  "Amazon Alexa & Google Home kompatibel",
  "16 Mio. Farben + Tunable White 1800K–6500K",
  "3 Jahre EU-Garantie · CE / WEEE / RoHS",
];

// Erstes Element = echtes Produktbild, restliche 7 = Konzept-Platzhalter
const HERO_IMAGES: Array<string | null> = [
  "/images-optimized/products/Lumonova_LM-A60SM_1.webp",
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

interface FeatureBlock {
  eyebrow: string;
  title: string;
  text: string;
  imageOnLeft: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

const FEATURES: FeatureBlock[] = [
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

interface SpecRow {
  label: string;
  value: string;
  accent?: boolean;
}

const SPECS: SpecRow[] = [
  { label: "Sockel", value: "E27" },
  { label: "Leistung", value: "9 W (ersetzt 60 W)" },
  { label: "Lichtstrom", value: "806 Lumen" },
  { label: "Farbtemperatur", value: "1800 K – 6500 K" },
  { label: "RGB", value: "16 Mio. Farben" },
  { label: "Protokoll", value: "Wi-Fi 2.4 GHz (Tuya)" },
  { label: "App", value: "Tuya Smart / Smart Life" },
  { label: "Kompatibilität", value: "Amazon Alexa, Google Home" },
  { label: "Lebensdauer", value: "25.000 h" },
  { label: "Maße", value: "Ø 60 × 110 mm" },
  { label: "Zertifikate", value: "CE, WEEE, RoHS" },
  { label: "Garantie", value: "3 Jahre EU", accent: true },
];

interface CompatCard {
  number: string;
  name: string;
  badgeSrc: string;
  badgeAlt: string;
}

const COMPAT_AVAILABLE: CompatCard[] = [
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
];

const COMPAT_COMING = ["Apple Home", "SmartThings"];

const TABS = [
  { id: "features", label: "Beschreibung" },
  { id: "specs", label: "Technische Daten" },
  { id: "reviews", label: "Rezensionen" },
];

const SCROLL_OFFSET = 120;

// Glow-Bühne mit allen Layern – wird im Hauptbild der Galerie wiederverwendet
function GlowStage({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, transparent 1px, transparent 32px)",
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(232,160,96,0.08)",
          filter: "blur(80px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(232,160,96,0.22)",
          filter: "blur(35px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          width: 180,
          height: 40,
          borderRadius: "50%",
          background: "rgba(232,160,96,0.18)",
          filter: "blur(20px)",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "1px solid rgba(232,160,96,0.35)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          width: 280,
          height: 280,
          borderRadius: "50%",
          border: "1px solid rgba(232,160,96,0.15)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          width: 360,
          height: 360,
          borderRadius: "50%",
          border: "1px solid rgba(232,160,96,0.06)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      {children}
    </>
  );
}

function HeroGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSrc = HERO_IMAGES[activeIndex];

  const goPrev = () =>
    setActiveIndex(
      (i) => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length
    );
  const goNext = () => setActiveIndex((i) => (i + 1) % HERO_IMAGES.length);

  return (
    <div>
      {/* Hauptbild-Bereich */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          background: "#0E0D0B",
          borderRadius: "1.5rem",
          minHeight: 520,
        }}
      >
        <GlowStage>
          {activeSrc ? (
            <img
              src={activeSrc}
              alt="LUMOnova LM-A60SM RGB Smart Bulb"
              className="relative object-contain"
              style={{
                height: "75%",
                zIndex: 10,
                filter: "drop-shadow(0 0 60px rgba(232,160,96,0.40))",
              }}
            />
          ) : (
            <p
              className="relative italic text-[14px]"
              style={{
                color: "rgba(242,242,242,0.20)",
                zIndex: 10,
                letterSpacing: "0.06em",
              }}
            >
              BILD {activeIndex + 1}
            </p>
          )}
        </GlowStage>

        {/* Pfeil links */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Vorheriges Bild"
          className="absolute rounded-full flex items-center justify-center transition-colors"
          style={{
            top: "50%",
            left: 16,
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(242,242,242,0.60)",
            zIndex: 20,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
          }
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 20 }}
            aria-hidden="true"
          >
            chevron_left
          </span>
        </button>

        {/* Pfeil rechts */}
        <button
          type="button"
          onClick={goNext}
          aria-label="Nächstes Bild"
          className="absolute rounded-full flex items-center justify-center transition-colors"
          style={{
            top: "50%",
            right: 16,
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(242,242,242,0.60)",
            zIndex: 20,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
          }
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 20 }}
            aria-hidden="true"
          >
            chevron_right
          </span>
        </button>
      </div>

      {/* Thumbnail-Leiste */}
      <div
        className="flex overflow-x-auto"
        style={{ gap: "0.5rem", marginTop: "0.75rem", paddingBottom: 4 }}
      >
        {HERO_IMAGES.map((src, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              type="button"
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Bild ${i + 1} anzeigen`}
              aria-current={isActive ? "true" : undefined}
              className="flex items-center justify-center cursor-pointer transition-all overflow-hidden"
              style={{
                width: 72,
                height: 72,
                flexShrink: 0,
                borderRadius: "0.5rem",
                background: "#1A1814",
                border: `1px solid ${
                  isActive ? "var(--color-amber)" : "rgba(255,255,255,0.08)"
                }`,
              }}
            >
              {src ? (
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span
                  className="uppercase"
                  style={{
                    fontSize: 9,
                    color: "rgba(242,242,242,0.20)",
                    letterSpacing: "0.06em",
                  }}
                >
                  Bild {i + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

function SubNav() {
  const [activeTab, setActiveTab] = useState<string>("features");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          )[0];
        if (visible) setActiveTab(visible.target.id);
      },
      { rootMargin: "-130px 0px -50% 0px", threshold: 0 }
    );

    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="sticky w-full"
      style={{
        top: 104,
        zIndex: 40,
        background: "rgba(14,12,10,0.95)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      aria-label="Produkt-Sub-Navigation"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ul
          className="flex items-center"
          style={{ height: 48, gap: "2rem" }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  className="cursor-pointer transition-all"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    color: isActive
                      ? "var(--color-amber)"
                      : "rgba(242,242,242,0.40)",
                    paddingBottom: 2,
                    borderBottom: `2px solid ${
                      isActive ? "var(--color-amber)" : "transparent"
                    }`,
                  }}
                  aria-current={isActive ? "true" : undefined}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

function FeatureImage({ src, alt }: { src?: string; alt?: string }) {
  return (
    <div
      className="bg-raised relative overflow-hidden"
      style={{ minHeight: 420 }}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? ""}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="text-[11px] italic text-center"
            style={{ color: "rgba(242,242,242,0.15)" }}
          >
            FEATURE-BILD / 1600 × 1200
          </p>
        </div>
      )}
    </div>
  );
}

function FeatureText({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div
      className="flex flex-col justify-center"
      style={{
        padding: "3rem",
        background: "rgba(232,160,96,0.06)",
        border: "1px solid rgba(232,160,96,0.12)",
      }}
    >
      <p
        className="text-[9px] font-bold uppercase mb-4 text-amber"
        style={{ letterSpacing: "var(--tracking-label)" }}
      >
        {eyebrow}
      </p>
      <h3
        className="font-bold mb-4 fg-primary"
        style={{ fontSize: 36, letterSpacing: "-0.01em", lineHeight: 1.15 }}
      >
        {title}
      </h3>
      <p
        className="text-[14px]"
        style={{ color: "rgba(242,242,242,0.45)", lineHeight: 1.7 }}
      >
        {text}
      </p>
    </div>
  );
}

function FeatureBlockTile({ block }: { block: FeatureBlock }) {
  const text = (
    <FeatureText
      eyebrow={block.eyebrow.toUpperCase()}
      title={block.title}
      text={block.text}
    />
  );
  const image = <FeatureImage src={block.imageSrc} alt={block.imageAlt} />;

  return (
    <div
      className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      style={{ minHeight: 420, marginBottom: "1rem" }}
    >
      {block.imageOnLeft ? (
        <>
          {image}
          {text}
        </>
      ) : (
        <>
          {text}
          {image}
        </>
      )}
    </div>
  );
}

function SpecTable() {
  return (
    <div role="table" className="w-full">
      {SPECS.map((spec, i) => (
        <div
          key={spec.label}
          role="row"
          className="grid grid-cols-[1fr_2fr] transition-colors hover:bg-[rgba(255,255,255,0.02)]"
          style={{
            padding: "1rem 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            borderTop: i === 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
          }}
        >
          <div
            role="rowheader"
            className="text-[14px]"
            style={{ color: "rgba(242,242,242,0.45)", fontWeight: 500 }}
          >
            {spec.label}
          </div>
          <div
            role="cell"
            className="text-[14px]"
            style={{
              color: spec.accent
                ? "var(--color-amber)"
                : "rgba(242,242,242,0.85)",
              fontWeight: spec.accent ? 700 : 400,
            }}
          >
            {spec.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function CompatCardTile({
  card,
  children,
}: {
  card: CompatCard;
  children?: ReactNode;
}) {
  return (
    <article
      className="bg-raised rounded-2xl"
      style={{
        padding: "2rem",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <p
        className="text-[11px] font-bold mb-4"
        style={{ color: "rgba(232,160,96,0.30)" }}
      >
        {card.number}
      </p>

      <div
        className="rounded-xl flex items-center justify-center"
        style={{
          background: "#FFFFFF",
          height: 80,
          padding: "1.5rem",
          margin: "1.5rem 0",
        }}
      >
        <img
          src={card.badgeSrc}
          alt={card.badgeAlt}
          className="max-h-12 w-auto object-contain"
          loading="lazy"
        />
      </div>

      <h3 className="text-[14px] font-bold fg-primary mb-1">{card.name}</h3>
      <p
        className="text-[12px]"
        style={{ color: "rgba(242,242,242,0.40)" }}
      >
        Verfügbar in:{" "}
        <span className="text-amber font-bold">SMART und SMART+</span>
      </p>
      {children}
    </article>
  );
}

const Product = () => {
  return (
    <div className="bg-base min-h-screen">
      <Nav />

      {/* SEKTION 1 — HERO (Galerie + Info-Spalte) */}
      <section className="bg-base">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[54fr_46fr] gap-8 items-start">
          {/* LINKE SEITE — Galerie */}
          <HeroGallery />

          {/* RECHTE SEITE — Info & CTA */}
          <div
            className="flex flex-col justify-center"
            style={{ padding: "2rem 1.5rem" }}
          >
            <nav aria-label="Brotkrumen">
              <p
                className="text-[10px] mb-8"
                style={{
                  color: "rgba(242,242,242,0.28)",
                  letterSpacing: "0.04em",
                }}
              >
                Produkte → Smart Bulbs → LM-A60SM RGB
              </p>
            </nav>

            <span
              className="inline-flex items-center self-start rounded-full text-[10px] font-bold uppercase mb-4"
              style={{
                background: "rgba(232,160,96,0.10)",
                border: "1px solid rgba(232,160,96,0.25)",
                color: "var(--color-amber)",
                padding: "4px 14px",
                letterSpacing: "var(--tracking-btn)",
              }}
            >
              SMART
            </span>

            <h1
              className="font-bold mb-2 fg-primary"
              style={{ fontSize: 42, letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              LM-A60SM RGB
            </h1>

            <p
              className="text-[13px] mb-8"
              style={{ color: "rgba(242,242,242,0.45)", lineHeight: 1.6 }}
            >
              Smart Bulb E27 · RGB+CCT · 806 lm · Kein Hub erforderlich
            </p>

            <ul className="flex flex-col gap-3 mb-10">
              {HERO_USPS.map((u) => (
                <li
                  key={u}
                  className="flex items-center gap-3 text-[12px]"
                  style={{ color: "rgba(242,242,242,0.55)" }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--color-amber)" }}
                  />
                  {u}
                </li>
              ))}
            </ul>

            <p
              className="font-bold mb-6 fg-primary"
              style={{ fontSize: 36, letterSpacing: "-0.01em" }}
            >
              €39,99
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.amazon.de"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LM-A60SM RGB bei Amazon ansehen (öffnet in neuem Tab)"
              >
                <AmberButton>Bei Amazon ansehen →</AmberButton>
              </a>
              <AmberButton
                variant="ghost"
                onClick={() => scrollToSection("specs")}
              >
                Technische Daten
              </AmberButton>
            </div>
          </div>
        </div>
      </section>

      {/* SEKTION 2 — EINLEITUNGS-HERO (Vollbild-Banner) */}
      <section
        className="relative overflow-hidden w-full"
        style={{ height: "70vh", minHeight: 480, maxHeight: 680 }}
      >
        {/* Hintergrundbild */}
        <img
          src="/images-optimized/hero/Farbvielfalt_3.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient oben */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: 180,
            background: "linear-gradient(to bottom, #141210 0%, transparent 100%)",
            zIndex: 2,
          }}
        />

        {/* Gradient unten */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: 180,
            background: "linear-gradient(to top, #141210 0%, transparent 100%)",
            zIndex: 2,
          }}
        />

        {/* Amber-Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(232,160,96,0.08) 0%, transparent 70%)",
            zIndex: 3,
          }}
        />

        {/* Text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ zIndex: 10, padding: "0 2rem" }}
        >
          <p
            className="font-bold uppercase mb-4"
            style={{
              fontSize: 9,
              color: "rgba(232,160,96,0.50)",
              letterSpacing: "0.22em",
            }}
          >
            LM-A60SM RGB
          </p>
          <h2
            className="font-bold fg-primary"
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              maxWidth: 700,
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
            }}
          >
            Licht, das sich Deinem Tag anpasst.
          </h2>
        </div>
      </section>

      {/* SEKTION 3 — STICKY SUB-NAVIGATION */}
      <SubNav />

      {/* SEKTION 4 — FEATURES */}
      <section
        id="features"
        className="bg-base"
        style={{ padding: "5rem 0", scrollMarginTop: SCROLL_OFFSET }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Features"
            title="Was diese Lampe kann."
            subtitle="Vier Kernfunktionen, die den Unterschied zwischen einer LED und einer LUMOnova ausmachen."
          />
          <div className="mt-12">
            {FEATURES.map((block) => (
              <FeatureBlockTile key={block.title} block={block} />
            ))}
          </div>
        </div>
      </section>

      {/* SEKTION 5 — SPECS */}
      <section
        id="specs"
        className="bg-mid"
        style={{ padding: "5rem 0", scrollMarginTop: SCROLL_OFFSET }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 items-start">
            <div className="lg:sticky" style={{ top: 168 }}>
              <SectionHeading
                eyebrow="Technische Daten"
                title="Alles, was zählt."
                withAccent
              />
            </div>
            <div>
              <SpecTable />
            </div>
          </div>
        </div>
      </section>

      {/* SEKTION 6 — KOMPATIBILITÄT */}
      <section className="bg-base" style={{ padding: "5rem 0" }}>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Kompatibilität"
            title="Vollständig integriert."
          />
          <div
            className="mt-12 grid grid-cols-1 md:grid-cols-3"
            style={{ gap: "1rem" }}
          >
            {COMPAT_AVAILABLE.map((card) => (
              <CompatCardTile key={card.number} card={card} />
            ))}
          </div>

          <div
            className="bg-raised rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4"
            style={{
              padding: "1rem 1.5rem",
              marginTop: "1rem",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <span
              className="text-[10px] font-bold uppercase flex-shrink-0"
              style={{
                color: "rgba(242,242,242,0.30)",
                letterSpacing: "0.12em",
              }}
            >
              In Vorbereitung:
            </span>
            <ul className="flex flex-wrap gap-2">
              {COMPAT_COMING.map((label) => (
                <li
                  key={label}
                  className="rounded-full uppercase font-bold select-none"
                  style={{
                    fontSize: 10,
                    padding: "4px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(242,242,242,0.35)",
                    letterSpacing: "var(--tracking-btn)",
                  }}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SEKTION 7 — REZENSIONEN */}
      <section
        id="reviews"
        className="bg-mid"
        style={{ padding: "4rem 0", scrollMarginTop: SCROLL_OFFSET }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Rezensionen"
            title="Was Kunden sagen."
          />
          <div
            className="rounded-2xl text-center"
            style={{
              background: "var(--color-raised)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "3rem",
              marginTop: "2rem",
            }}
          >
            <div
              className="flex justify-center items-center gap-1 mb-4"
              aria-hidden="true"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="material-symbols-outlined"
                  style={{ fontSize: 24, color: "rgba(232,160,96,0.30)" }}
                >
                  star
                </span>
              ))}
            </div>
            <p
              className="text-[14px] mb-2"
              style={{ color: "rgba(242,242,242,0.30)" }}
            >
              Sei der Erste, der dieses Produkt bewertet.
            </p>
            <p
              className="text-[11px]"
              style={{ color: "rgba(242,242,242,0.18)" }}
            >
              Rezensionen werden nach dem Launch hier erscheinen.
            </p>
          </div>
        </div>
      </section>

      {/* SEKTION 8 — TRUST */}
      <section className="bg-base py-20">
        <div className="mx-auto max-w-7xl px-6">
          <TrustRow />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Product;
