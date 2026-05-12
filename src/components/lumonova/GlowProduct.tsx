interface GlowProductProps {
  intensity?: "low" | "mid" | "high";
  size?: number;
  imageSrc?: string;
  alt?: string;
}

const PRESETS = {
  low: { bg: 0.04, core: 0.12, ring1: 0.18, ring2: 0.08, ring3: 0.04, shadow: 0.20 },
  mid: { bg: 0.08, core: 0.25, ring1: 0.35, ring2: 0.16, ring3: 0.08, shadow: 0.35 },
  high: { bg: 0.14, core: 0.38, ring1: 0.55, ring2: 0.26, ring3: 0.12, shadow: 0.50 },
};

export function GlowProduct({
  intensity = "mid",
  size = 360,
  imageSrc,
  alt = "",
}: GlowProductProps) {
  const o = PRESETS[intensity];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden={imageSrc ? undefined : true}
    >
      {/* 1 – Hintergrund-Atmosphäre */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 1.6,
          height: size * 1.6,
          background: `rgba(232,160,96,${o.bg})`,
          filter: "blur(80px)",
        }}
      />

      {/* 2 – Mittlerer Halo */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          background: `rgba(232,160,96,${o.core})`,
          filter: "blur(28px)",
        }}
      />

      {/* 3a – Ring 1 (innerster) */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          border: `1px solid rgba(232,160,96,${o.ring1})`,
        }}
      />
      {/* 3b – Ring 2 */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.95,
          height: size * 0.95,
          border: `1px solid rgba(232,160,96,${o.ring2})`,
        }}
      />
      {/* 3c – Ring 3 (äußerster) */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 1.2,
          height: size * 1.2,
          border: `1px solid rgba(232,160,96,${o.ring3})`,
        }}
      />

      {/* 4 – Produktbild bzw. Platzhalter */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className="relative object-contain"
          style={{
            width: size,
            height: size,
            zIndex: 10,
            filter: `drop-shadow(0 0 40px rgba(232,160,96,${o.shadow}))`,
          }}
        />
      ) : (
        <div
          className="relative flex items-center justify-center"
          style={{
            width: size * 0.55,
            height: size * 0.55,
            zIndex: 10,
            filter: `drop-shadow(0 0 40px rgba(232,160,96,${o.shadow}))`,
          }}
        >
          <span
            className="material-symbols-outlined text-amber"
            style={{ fontSize: size * 0.42 }}
            aria-hidden="true"
          >
            lightbulb
          </span>
        </div>
      )}
    </div>
  );
}
