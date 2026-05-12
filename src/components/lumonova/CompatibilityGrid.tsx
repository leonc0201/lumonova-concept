interface AvailableItem {
  number: string;
  name: string;
  badgeSrc: string;
  badgeAlt: string;
  availability: string;
}

const AVAILABLE: AvailableItem[] = [
  {
    number: "01",
    name: "Google Home",
    badgeSrc: "/images-optimized/logo/works%20with%20Google%20Home.webp",
    badgeAlt: "Works with Google Home",
    availability: "SMART und SMART+",
  },
  {
    number: "02",
    name: "Amazon Alexa",
    badgeSrc: "/images-optimized/logo/works%20with%20Alexa.webp",
    badgeAlt: "Works with Amazon Alexa",
    availability: "SMART und SMART+",
  },
  {
    number: "03",
    name: "Tuya Smart",
    badgeSrc: "/images-optimized/logo/Tuya%20Logo.webp",
    badgeAlt: "Tuya Smart",
    availability: "SMART (App-Steuerung)",
  },
];

const COMING_SOON = ["Apple Home", "SmartThings"];

function CompatCard({ item }: { item: AvailableItem }) {
  return (
    <article
      className="rounded-2xl p-6 flex flex-col"
      style={{
        background: "var(--color-raised)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span
        className="text-[11px] font-bold mb-4"
        style={{
          color: "rgba(232,160,96,0.45)",
          letterSpacing: "var(--tracking-label)",
        }}
      >
        {item.number}
      </span>

      {/* Großer weißer Badge-Bereich */}
      <div
        className="rounded-xl flex items-center justify-center"
        style={{
          background: "#FFFFFF",
          minHeight: 140,
          padding: 24,
        }}
      >
        <img
          src={item.badgeSrc}
          alt={item.badgeAlt}
          className="max-h-16 w-auto object-contain"
          loading="lazy"
        />
      </div>

      <h3 className="fg-high text-[17px] font-bold mt-5">{item.name}</h3>
      <p className="text-[12px] mt-1" style={{ color: "rgba(242,242,242,0.55)" }}>
        Verfügbar in:{" "}
        <span className="text-amber font-medium">{item.availability}</span>
      </p>
    </article>
  );
}

export function CompatibilityGrid() {
  return (
    <div>
      {/* Verfügbare Plattformen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {AVAILABLE.map((item) => (
          <CompatCard key={item.number} item={item} />
        ))}
      </div>

      {/* In Vorbereitung */}
      <div
        className="mt-8 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
        style={{
          background: "var(--color-raised)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          className="text-[11px] font-bold uppercase flex-shrink-0"
          style={{
            color: "rgba(242,242,242,0.60)",
            letterSpacing: "var(--tracking-label)",
          }}
        >
          In Vorbereitung:
        </span>
        <ul className="flex flex-wrap gap-2">
          {COMING_SOON.map((label) => (
            <li
              key={label}
              className="rounded-full px-4 py-1.5 text-[11px] font-bold uppercase"
              style={{
                color: "var(--color-amber)",
                background: "rgba(232,160,96,0.06)",
                border: "1px solid rgba(232,160,96,0.25)",
                letterSpacing: "var(--tracking-btn)",
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
