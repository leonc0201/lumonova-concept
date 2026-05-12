import { Link } from "react-router-dom";

const productLinks = ["CLASSIC", "CLASSIC+", "SMART", "SMART+"];
const legalLinks = ["Impressum", "Datenschutz", "AGB", "Widerruf"];

export function Footer() {
  return (
    <footer
      className="bg-deepest border-t"
      style={{ borderColor: "rgba(255,255,255,0.04)" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-11 pt-14 pb-6">
        {/* Oberer Block */}
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
          {/* Logo + Tagline */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="block mb-4" aria-label="LUMOnova – Startseite">
              <img
                src="/images-optimized/logo/LUMOnova_Logo_White.webp"
                alt="LUMOnova"
                className="h-12 w-auto"
              />
            </Link>
            <p
              className="text-[13px] max-w-[260px]"
              style={{ color: "rgba(242,242,242,0.15)", lineHeight: 1.6 }}
            >
              European Smart Lighting. No Hub. No Lock-in.
            </p>
          </div>

          {/* Produkte */}
          <div>
            <h3
              className="text-[10px] font-bold uppercase mb-4"
              style={{
                color: "rgba(232,160,96,0.35)",
                letterSpacing: "var(--tracking-label)",
              }}
            >
              Produkte
            </h3>
            <ul className="flex flex-col gap-3">
              {productLinks.map((p) => (
                <li key={p}>
                  <a
                    href="#"
                    className="text-[12px] transition-colors"
                    style={{ color: "rgba(242,242,242,0.22)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "rgba(242,242,242,0.60)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(242,242,242,0.22)")
                    }
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3
              className="text-[10px] font-bold uppercase mb-4"
              style={{
                color: "rgba(232,160,96,0.35)",
                letterSpacing: "var(--tracking-label)",
              }}
            >
              Rechtliches
            </h3>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[12px] transition-colors"
                    style={{ color: "rgba(242,242,242,0.22)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "rgba(242,242,242,0.60)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(242,242,242,0.22)")
                    }
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3
              className="text-[10px] font-bold uppercase mb-4"
              style={{
                color: "rgba(232,160,96,0.35)",
                letterSpacing: "var(--tracking-label)",
              }}
            >
              Kontakt
            </h3>
            <ul
              className="flex flex-col gap-3 text-[12px]"
              style={{ color: "rgba(242,242,242,0.22)" }}
            >
              <li>
                <a
                  href="mailto:support@lumOnova.com"
                  className="transition-colors hover:text-amber"
                >
                  support@lumOnova.com
                </a>
              </li>
              <li>lumo-nova.de</li>
              <li>Willich, DE</li>
            </ul>
          </div>
        </div>

        {/* Unterer Block */}
        <div
          className="mt-12 pt-6 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
        >
          <p
            className="text-[11px]"
            style={{ color: "rgba(242,242,242,0.10)" }}
          >
            © 2026 C&amp;L Handels GmbH, Willich, Deutschland
          </p>
          <ul className="flex items-center gap-2">
            {["CE", "WEEE", "RoHS"].map((c) => (
              <li
                key={c}
                className="text-[10px] font-medium uppercase px-2 py-1"
                style={{
                  color: "rgba(242,242,242,0.18)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  letterSpacing: "0.10em",
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
