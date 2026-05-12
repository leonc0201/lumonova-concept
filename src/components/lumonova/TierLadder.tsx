import { motion } from "framer-motion";

interface TierStory {
  number: string;
  name: string;
  text: string;
  imageSrc?: string;
  imageOnLeft: boolean;
  comingSoon?: boolean;
}

const TIERS: TierStory[] = [
  {
    number: "01",
    name: "CLASSIC",
    text: "Manche Räume brauchen einfach Licht. Einschrauben, einschalten, vergessen.",
    imageOnLeft: false,
  },
  {
    number: "02",
    name: "CLASSIC+",
    text: "Ein bisschen mehr als Standard, ohne den Aufwand dafür. Farbtemperatur per Schalter, Bewegungssensor im Flur. Kein Smartphone nötig.",
    imageOnLeft: true,
  },
  {
    number: "03",
    name: "SMART",
    text: "Für die, die ihr Licht kontrollieren wollen. Per App, per Stimme, per Zeitplan. Direkt über Wi-Fi, ohne Hub und ohne Extra-Gerät.",
    imageSrc: "/images-optimized/products/Lumonova_LM-A60SM_1.webp",
    imageOnLeft: false,
  },
  {
    number: "04",
    name: "SMART+",
    text: "Für echte Smart Home Nutzer. Matter bedeutet: alles funktioniert zusammen. Apple Home, SmartThings, auch ohne Internet. Kommt 2026.",
    imageSrc: "/images-optimized/products/Lumonova_LM-A70SM_1.webp",
    imageOnLeft: true,
    comingSoon: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function TierImagePlaceholder({ name }: { name: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{
        background: "var(--color-raised)",
        borderRadius: "1rem",
        border: "1px solid rgba(255,255,255,0.06)",
        minHeight: 240,
        padding: "2rem",
      }}
    >
      <p
        className="font-bold mb-2"
        style={{
          fontSize: 14,
          color: "rgba(242,242,242,0.45)",
          letterSpacing: "0.08em",
        }}
      >
        {name}
      </p>
      <p
        className="italic"
        style={{
          fontSize: 12,
          color: "rgba(242,242,242,0.30)",
        }}
      >
        Bild folgt
      </p>
    </div>
  );
}

function TierImage({ tier }: { tier: TierStory }) {
  if (!tier.imageSrc) {
    return <TierImagePlaceholder name={tier.name} />;
  }
  return (
    <div
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        background: "var(--color-mid)",
        borderRadius: "1rem",
        minHeight: 240,
        padding: "1.5rem",
      }}
    >
      <img
        src={tier.imageSrc}
        alt={`LUMOnova ${tier.name}`}
        className="object-contain"
        style={{
          maxHeight: 220,
          filter: "drop-shadow(0 0 32px rgba(232,160,96,0.20))",
        }}
        loading="lazy"
      />
    </div>
  );
}

function TierText({ tier }: { tier: TierStory }) {
  return (
    <div className="flex flex-col">
      <p
        className="font-bold uppercase mb-2"
        style={{
          fontSize: 10,
          color: "rgba(232,160,96,0.45)",
          letterSpacing: "0.16em",
        }}
      >
        {tier.number}
      </p>
      <h3
        className="font-bold fg-primary"
        style={{
          fontSize: 23,
          letterSpacing: "-0.01em",
          marginBottom: "1rem",
        }}
      >
        {tier.name}
      </h3>
      <p
        style={{
          fontSize: 16,
          color: "rgba(242,242,242,0.65)",
          lineHeight: 1.75,
          maxWidth: 380,
        }}
      >
        {tier.text}
      </p>
      {tier.comingSoon && (
        <span
          className="inline-flex items-center self-start rounded-full uppercase font-bold select-none"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "rgba(242,242,242,0.45)",
            fontSize: 11,
            padding: "4px 14px",
            letterSpacing: "var(--tracking-btn)",
            marginTop: "1rem",
          }}
        >
          Demnächst
        </span>
      )}
    </div>
  );
}

function TierBlock({ tier, isLast }: { tier: TierStory; isLast: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      style={{
        paddingTop: "3rem",
        paddingBottom: "3rem",
        borderBottom: isLast
          ? undefined
          : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 items-center"
        style={{ gap: "3rem", minHeight: 280 }}
      >
        {tier.imageOnLeft ? (
          <>
            <TierImage tier={tier} />
            <TierText tier={tier} />
          </>
        ) : (
          <>
            <TierText tier={tier} />
            <TierImage tier={tier} />
          </>
        )}
      </div>
    </motion.div>
  );
}

export function TierLadder() {
  return (
    <div>
      {TIERS.map((tier, i) => (
        <TierBlock
          key={tier.name}
          tier={tier}
          isLast={i === TIERS.length - 1}
        />
      ))}
    </div>
  );
}
