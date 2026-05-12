interface TrustStat {
  value: string;
  label: string;
  subtext: string;
}

const STATS: TrustStat[] = [
  {
    value: "70.000 h",
    label: "Lebensdauer",
    subtext: "L80-Norm",
  },
  {
    value: "3 Jahre",
    label: "EU-Garantie",
    subtext: "Alle Produkte",
  },
  {
    value: "IP20",
    label: "Schutzklasse",
    subtext: "Panels & mehr",
  },
];

export function TrustRow() {
  return (
    <div className="bg-deepest w-full">
      <div className="mx-auto max-w-7xl">
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          role="list"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              role="listitem"
              className="text-center md:text-left"
              style={{
                padding: "3rem 2rem",
                borderLeft:
                  i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <p
                className="font-bold text-amber"
                style={{
                  fontSize: "clamp(48px, 6vw, 72px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  marginBottom: "1rem",
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-[14px] font-bold fg-primary"
                style={{ marginBottom: "0.25rem" }}
              >
                {stat.label}
              </p>
              <p
                className="text-[13px]"
                style={{ color: "rgba(242,242,242,0.55)" }}
              >
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
