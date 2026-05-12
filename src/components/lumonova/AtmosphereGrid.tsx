interface Scene {
  label: string;
  imageSrc?: string;
}

const SCENES: Scene[] = [
  {
    label: "Familienmoment – Warmweiß",
    imageSrc: "/images-optimized/atmosphere/Familienmoment.webp",
  },
  {
    label: "Romantisches Dinner – Warmes Licht",
    imageSrc: "/images-optimized/atmosphere/Romantik%20Dinner_edit.webp",
  },
  {
    label: "Schlafzimmer – Entspannung",
    imageSrc: "/images-optimized/atmosphere/Schlafzimmer%20Entspannung.webp",
  },
];

function SceneTile({ scene, large = false }: { scene: Scene; large?: boolean }) {
  return (
    <figure
      className="relative bg-mid overflow-hidden h-full rounded-2xl"
      style={{
        minHeight: large ? 480 : 220,
        boxShadow: "inset 0 0 60px rgba(10,9,8,0.6)",
      }}
    >
      {/* Subtiler Amber-Glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          style={{
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "rgba(232,160,96,0.04)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {scene.imageSrc ? (
        <img
          src={scene.imageSrc}
          alt={scene.label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="text-[12px] italic text-center"
            style={{ color: "rgba(242,242,242,0.15)" }}
          >
            {scene.label}
          </p>
        </div>
      )}

      {/* Caption-Overlay unten */}
      {scene.imageSrc && (
        <figcaption
          className="absolute left-0 right-0 bottom-0 px-4 py-3 text-[12px]"
          style={{
            color: "rgba(242,242,242,0.85)",
            background:
              "linear-gradient(to top, rgba(10,9,8,0.85), rgba(10,9,8,0))",
            letterSpacing: "0.04em",
          }}
        >
          {scene.label}
        </figcaption>
      )}
    </figure>
  );
}

export function AtmosphereGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-3 rounded-2xl overflow-hidden">
      {/* Große Kachel (2/3 Breite, 2 Reihen hoch auf lg) */}
      <div className="lg:col-span-2 lg:row-span-2">
        <SceneTile scene={SCENES[0]} large />
      </div>

      {/* Zwei kleine Kacheln rechts */}
      <div>
        <SceneTile scene={SCENES[1]} />
      </div>
      <div>
        <SceneTile scene={SCENES[2]} />
      </div>
    </div>
  );
}
