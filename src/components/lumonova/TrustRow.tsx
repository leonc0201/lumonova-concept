interface TrustItem {
  icon: string;
  label: string;
  subtext: string;
}

const ITEMS: TrustItem[] = [
  {
    icon: "verified",
    label: "3 Jahre EU-Garantie",
    subtext: "Auf alle LUMOnova Produkte",
  },
  {
    icon: "support_agent",
    label: "Support aus Willich",
    subtext: "Mo–Fr per E-Mail und Telefon",
  },
  {
    icon: "task_alt",
    label: "CE / WEEE / RoHS",
    subtext: "Vollständig EU-zertifiziert",
  },
];

export function TrustRow() {
  return (
    <div className="bg-deepest w-full">
      <div className="mx-auto max-w-7xl">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
          role="list"
        >
          {ITEMS.map((item) => (
            <div
              key={item.label}
              role="listitem"
              className="bg-deepest flex items-start gap-4"
              style={{ padding: "32px 24px" }}
            >
              <span
                className="flex-shrink-0 inline-flex items-center justify-center rounded-full"
                style={{
                  width: 40,
                  height: 40,
                  border: "1px solid rgba(232,160,96,0.18)",
                  background: "rgba(232,160,96,0.04)",
                }}
                aria-hidden="true"
              >
                <span
                  className="material-symbols-outlined text-amber"
                  style={{ fontSize: 19 }}
                >
                  {item.icon}
                </span>
              </span>

              <div className="min-w-0">
                <p
                  className="text-[14px] font-bold"
                  style={{ color: "rgba(242,242,242,0.78)" }}
                >
                  {item.label}
                </p>
                <p
                  className="text-[12px] mt-1"
                  style={{
                    color: "rgba(242,242,242,0.55)",
                    lineHeight: 1.55,
                  }}
                >
                  {item.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
