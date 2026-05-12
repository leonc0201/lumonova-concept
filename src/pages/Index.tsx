import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Nav } from "@/components/lumonova/Nav";
import { Footer } from "@/components/lumonova/Footer";
import { AmberButton } from "@/components/lumonova/AmberButton";
import { TierGrid } from "@/components/lumonova/TierGrid";
import { TierLadder } from "@/components/lumonova/TierLadder";
import { CategoryGrid } from "@/components/lumonova/CategoryGrid";
import { AtmosphereGrid } from "@/components/lumonova/AtmosphereGrid";
import { CompatibilityGrid } from "@/components/lumonova/CompatibilityGrid";
import { TrustRow } from "@/components/lumonova/TrustRow";
import { SectionHeading } from "@/components/lumonova/SectionHeading";
import { ProductCard } from "@/components/lumonova/ProductCard";
import { LogoArc } from "@/components/lumonova/LogoArc";
import { ScrollReveal } from "@/components/lumonova/ScrollReveal";
import { PRODUCTS } from "@/components/lumonova/products";

const productCardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

const usps = [
  "Matter over Wi-Fi",
  "Kein Hub erforderlich",
  "3 Jahre EU-Garantie",
];

// Subtiler Ambient-Glow an Sektionsgrenzen.
// Wird zwischen zwei Sektionen platziert und ragt nach oben in die
// vorherige Sektion hinein – die nachfolgende Sektion liegt durch die
// natürliche DOM-Stack-Order davor und verdeckt die untere Hälfte sauber.
function SectionBlob() {
  return (
    <div
      className="relative pointer-events-none"
      style={{ height: 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 200,
          background: "rgba(232,160,96,0.04)",
          filter: "blur(80px)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

const Index = () => {
  return (
    <div className="bg-base min-h-screen">
      <Nav />

      {/* HERO */}
      <section
        className="relative bg-base overflow-hidden flex items-center"
        style={{ minHeight: "100vh" }}
      >
        {/* Vollflächiges Hintergrundbild */}
        <img
          src="/images-optimized/atmosphere/Hero%20Brand%20169.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dunkler Gradient von links */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to right, rgba(14,12,10,0.95) 0%, rgba(14,12,10,0.75) 50%, rgba(14,12,10,0.20) 100%)",
          }}
        />
        {/* Dezentes Grid-Muster */}
        <div className="absolute inset-0 hero-grid opacity-60 pointer-events-none" />
        {/* Dekorativer Logo-Bogen */}
        <LogoArc variant="hero" />

        {/* Inhalt */}
        <div
          className="relative mx-auto max-w-7xl px-6 py-32 lg:py-44 w-full"
          style={{ zIndex: 10 }}
        >
          <div className="max-w-2xl">
            <span className="block h-[2px] w-12 bg-amber mb-8" />
            <p
              className="text-[13px] uppercase text-amber mb-6"
              style={{ letterSpacing: "var(--tracking-label)" }}
            >
              Smart Lighting
            </p>
            <h1 className="text-[64px] sm:text-[84px] lg:text-[104px] font-bold leading-[0.95] tracking-tight">
              <span className="block fg-primary">Kein Hub.</span>
              <span className="block text-amber">Kein Lock-in.</span>
              <span className="block font-light fg-minimal">Einfach smart.</span>
            </h1>
            <p className="mt-10 max-w-md text-[16px] leading-relaxed fg-mid">
              LUMOnova ist Beleuchtung, die zu Dir kommt – nicht zu einem Ökosystem.
              Vier Tiers, vier Produktfamilien, ein Anspruch: Licht, das funktioniert.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link to="/collection">
                <AmberButton>Kollektion ansehen</AmberButton>
              </Link>
              <Link to="/product">
                <AmberButton variant="ghost">SMART+ entdecken</AmberButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* USP BAR – jetzt bg-base, integriert sich nahtlos mit Hero und Categories */}
      <section className="bg-base py-6">
        <div className="mx-auto max-w-7xl px-6">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {usps.map((u) => (
              <li
                key={u}
                className="rounded-xl text-center transition-colors duration-200"
                style={{
                  background: "rgba(232,160,96,0.06)",
                  border: "1px solid rgba(232,160,96,0.12)",
                  padding: "1.5rem 1rem",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(232,160,96,0.10)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(232,160,96,0.06)")
                }
              >
                <p
                  className="text-[12px] uppercase fg-mid"
                  style={{ letterSpacing: "var(--tracking-label)" }}
                >
                  {u}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-base py-16">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Sortiment"
              title="Vier Produktfamilien."
              subtitle="Wir starten mit Smart Bulbs. Filament, Panels und Ceiling Lights folgen – alle mit derselben Tier-Logik und denselben Smart-Standards."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-14">
            <CategoryGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* Wechsel 1: bg-base → bg-mid */}
      <SectionBlob />

      {/* TIERS */}
      <section className="bg-mid py-16">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Vier Tiers"
              title="Vom puren Licht bis zum vollwertigen Smart Home."
              subtitle="Jeder Tier ist eigenständig – kein Upgrade-Zwang, keine versteckten Kosten. Du wählst, wie smart Dein Licht sein soll."
            />
          </ScrollReveal>
          <div className="mt-12">
            <TierLadder />
          </div>
          <div className="mt-12">
            <TierGrid />
          </div>
        </div>
      </section>

      {/* ATMOSPHERE – jetzt bg-mid, gleicher Ton wie Tiers + Featured */}
      <section className="bg-mid py-16">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Atmosphäre"
              title="Licht macht den Raum."
              subtitle="Vom warmen Wohnzimmer bis zur stimmungsvollen RGB-Wand – ein paar Beispiele, wie LUMOnova Räume verändert."
            />
          </ScrollReveal>
          <ScrollReveal direction="fade" className="mt-14">
            <AtmosphereGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* Kapitel-Marker (Logo-Bogen) – wirkt jetzt als Trenner innerhalb gleicher Farbe */}
      <div className="bg-mid">
        <LogoArc variant="divider" />
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="bg-mid py-16">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Im Fokus"
              title="Die LM-Serie."
              subtitle="Vom kompakten Tropfen bis zur leistungsstarken A70 – Matter-Modelle (SMART+) decken zusätzlich Apple Home und SmartThings ab."
            />
          </ScrollReveal>
          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <motion.div key={p.id} custom={i} variants={productCardVariant}>
                <ProductCard {...p} glow="subtle" />
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-8 flex justify-end">
            <Link
              to="/collection"
              className="inline-flex items-center gap-1 text-[12px] uppercase text-amber"
              style={{ letterSpacing: "var(--tracking-btn)" }}
            >
              Alle Produkte
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 17 }}
                aria-hidden="true"
              >
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Wechsel 2: bg-mid → bg-base */}
      <SectionBlob />

      {/* COMPATIBILITY */}
      <section className="bg-base py-16">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Kompatibilität"
              title="Funktioniert mit dem, was Du bereits nutzt."
              subtitle="Amazon Alexa und Google Home arbeiten ab dem SMART-Tier nativ. Apple Home und Samsung SmartThings sind dem SMART+-Tier vorbehalten – über Matter, kein Hub erforderlich."
            />
          </ScrollReveal>
          <ScrollReveal direction="fade" className="mt-14">
            <CompatibilityGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* TRUST – Full-width Banner mit grossen Zahlen, eigener bg-deepest */}
      <ScrollReveal direction="fade">
        <TrustRow />
      </ScrollReveal>

      {/* Wechsel 3: bg-base → bg-deepest (Footer) */}
      <SectionBlob />

      <Footer />
    </div>
  );
};

export default Index;
