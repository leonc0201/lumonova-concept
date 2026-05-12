import { motion } from "framer-motion";

interface LadderItem {
  number: string;
  name: string;
  description: string;
}

const LADDER: LadderItem[] = [
  { number: "01", name: "CLASSIC", description: "Reines Licht." },
  { number: "02", name: "CLASSIC+", description: "Dimmbar. Analog." },
  { number: "03", name: "SMART", description: "App. Stimme. Farbe." },
  { number: "04", name: "SMART+", description: "Matter. Apple Home." },
];

// Sequenz-Timing nach Spec:
//   0.0s  linke Spalte fade-up
//   0.3s  Linie zieht sich auf
//   0.4s  Kreis 01, +0.2s pro weiterem Kreis (-> 0.6 / 0.8 / 1.0s)
//   +0.15s nach jedem Kreis: Text darunter
const textColumnVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const lineVariant = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: "easeInOut" as const, delay: 0.3 },
  },
};

const circleDelay = (i: number) => 0.4 + i * 0.2;
const captionDelay = (i: number) => circleDelay(i) + 0.15;

export function TierLadder() {
  return (
    <motion.div
      className="rounded-2xl p-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Linke Spalte */}
      <motion.div variants={textColumnVariant}>
        <p
          className="text-[9px] font-bold uppercase text-amber mb-4"
          style={{ letterSpacing: "var(--tracking-label)" }}
        >
          So funktionieren die Tiers
        </p>
        <p
          className="text-[14px] fg-mid"
          style={{ lineHeight: 1.7 }}
        >
          Jeder Tier ist eigenständig nutzbar und baut funktional auf dem
          vorherigen auf — von purem Licht (CLASSIC) bis zur vollwertigen
          Apple-Home-Integration (SMART+).
        </p>
      </motion.div>

      {/* Rechte Spalte – Tier-Leiter */}
      <div className="relative">
        {/* Verbindungslinie – animiert von links nach rechts */}
        <motion.div
          aria-hidden="true"
          className="absolute hidden sm:block"
          style={{
            top: 24,
            left: "12.5%",
            right: "12.5%",
            height: 1,
            background: "rgba(232,160,96,0.20)",
            transformOrigin: "left center",
          }}
          variants={lineVariant}
        />

        <ol
          className="relative grid grid-cols-2 sm:grid-cols-4 gap-y-8"
          aria-label="Tier-Stufen"
        >
          {LADDER.map((item, i) => (
            <li
              key={item.name}
              className="flex flex-col items-center text-center"
            >
              <motion.span
                className="inline-flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid rgba(232,160,96,0.40)",
                  background: "rgba(232,160,96,0.08)",
                  position: "relative",
                  zIndex: 1,
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut" as const,
                    delay: circleDelay(i),
                  },
                }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <span className="text-[16px] font-bold text-amber">
                  {item.number}
                </span>
              </motion.span>

              <motion.p
                className="mt-4 text-[13px] font-bold fg-primary uppercase"
                style={{ letterSpacing: "0.08em" }}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut" as const,
                    delay: captionDelay(i),
                  },
                }}
                viewport={{ once: true, margin: "-80px" }}
              >
                {item.name}
              </motion.p>
              <motion.p
                className="mt-1 text-[11px]"
                style={{ color: "rgba(242,242,242,0.35)" }}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut" as const,
                    delay: captionDelay(i),
                  },
                }}
                viewport={{ once: true, margin: "-80px" }}
              >
                {item.description}
              </motion.p>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
