import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PRODUCTS } from "./products";

const otherLinks = [
  { to: "/ueber-uns", label: "Über Uns" },
  { to: "/support", label: "Support" },
];

interface MegaCategory {
  icon: string;
  name: string;
  desc: string;
  available: boolean;
  href?: string;
}

const MEGA_CATEGORIES: MegaCategory[] = [
  {
    icon: "lightbulb",
    name: "Smart Bulbs",
    desc: "E27, E14, GU10",
    available: true,
    href: "/collection?category=Smart+Bulbs",
  },
  {
    icon: "emoji_objects",
    name: "Filament",
    desc: "Vintage-Optik",
    available: false,
  },
  {
    icon: "grid_on",
    name: "Panels",
    desc: "Büro & Decke",
    available: true,
    href: "/collection?category=Panels",
  },
  {
    icon: "light_mode",
    name: "Ceiling Lights",
    desc: "Mit Smart-Modul",
    available: false,
  },
];

interface MegaTierItem {
  number: string;
  name: string;
  desc: string;
  available: boolean;
  highlighted?: boolean;
  href?: string;
}

const MEGA_TIERS: MegaTierItem[] = [
  {
    number: "01",
    name: "CLASSIC",
    desc: "Klassisch & langlebig",
    available: true,
    href: "/collection?tier=CLASSIC",
  },
  {
    number: "02",
    name: "CLASSIC+",
    desc: "Mit Sensor oder CCT",
    available: true,
    href: "/collection?tier=CLASSIC%2B",
  },
  {
    number: "03",
    name: "SMART",
    desc: "Alexa & Google Home",
    available: true,
    highlighted: true,
    href: "/collection?tier=SMART",
  },
  {
    number: "04",
    name: "SMART+",
    desc: "Matter · Apple Home",
    available: false,
  },
];

interface MegaQuickLink {
  icon: string;
  label: string;
  to: string;
}

const MEGA_QUICK_LINKS: MegaQuickLink[] = [
  { icon: "star", label: "Bestseller", to: "/collection" },
  { icon: "info", label: "Smart Home Guide", to: "/smart-home" },
  { icon: "help_outline", label: "Support", to: "/support" },
  { icon: "verified", label: "3 Jahre Garantie", to: "/impressum" },
];

const COL_LABEL_STYLE = {
  color: "rgba(232,160,96,0.50)",
  letterSpacing: "0.16em",
} as const;

function MegaCategoryTile({
  cat,
  onLinkClick,
}: {
  cat: MegaCategory;
  onLinkClick: () => void;
}) {
  const content = (
    <div
      className="flex items-center gap-3.5"
      style={{ padding: "0.75rem", borderRadius: "0.75rem" }}
    >
      <span
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: cat.available
            ? "rgba(232,160,96,0.08)"
            : "rgba(255,255,255,0.04)",
          border: `1px solid ${
            cat.available
              ? "rgba(232,160,96,0.15)"
              : "rgba(255,255,255,0.08)"
          }`,
        }}
        aria-hidden="true"
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 18,
            color: cat.available
              ? "var(--color-amber)"
              : "rgba(242,242,242,0.20)",
          }}
        >
          {cat.icon}
        </span>
      </span>

      <div className="min-w-0 flex-1">
        <p
          className="text-[13px] font-bold flex items-center flex-wrap"
          style={{
            color: "rgba(242,242,242,0.85)",
            marginBottom: 2,
          }}
        >
          {cat.name}
          {!cat.available && (
            <span
              className="rounded-full uppercase font-bold"
              style={{
                fontSize: 9,
                color: "rgba(242,242,242,0.25)",
                background: "rgba(255,255,255,0.06)",
                padding: "2px 7px",
                letterSpacing: "0.08em",
                marginLeft: 6,
              }}
            >
              Demnächst
            </span>
          )}
        </p>
        <p
          className="text-[11px]"
          style={{ color: "rgba(242,242,242,0.35)" }}
        >
          {cat.desc}
        </p>
      </div>
    </div>
  );

  if (cat.available && cat.href) {
    return (
      <Link
        to={cat.href}
        onClick={onLinkClick}
        className="rounded-xl transition-colors hover:bg-[rgba(255,255,255,0.04)]"
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className="rounded-xl"
      style={{ cursor: "default", opacity: 0.4 }}
      aria-disabled="true"
    >
      {content}
    </div>
  );
}

function MegaTierRow({
  tier,
  onLinkClick,
}: {
  tier: MegaTierItem;
  onLinkClick: () => void;
}) {
  const isSmart = tier.highlighted;

  const content = (
    <div
      className="flex items-center gap-4"
      style={{
        padding: "0.75rem",
        borderRadius: "0.75rem",
        border: isSmart ? "1px solid rgba(232,160,96,0.10)" : undefined,
      }}
    >
      <span
        className="flex items-center justify-center flex-shrink-0 font-bold"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: tier.available
            ? "rgba(232,160,96,0.08)"
            : "rgba(255,255,255,0.04)",
          border: `1px solid ${
            tier.available
              ? "rgba(232,160,96,0.20)"
              : "rgba(255,255,255,0.08)"
          }`,
          fontSize: 11,
          color: tier.available
            ? "var(--color-amber)"
            : "rgba(242,242,242,0.25)",
        }}
        aria-hidden="true"
      >
        {tier.number}
      </span>

      <div className="min-w-0 flex-1">
        <p
          className="text-[13px] font-bold flex items-center flex-wrap"
          style={{
            color: "rgba(242,242,242,0.85)",
            marginBottom: 2,
          }}
        >
          {tier.name}
          {!tier.available && (
            <span
              className="rounded-full uppercase font-bold"
              style={{
                fontSize: 9,
                color: "rgba(242,242,242,0.25)",
                background: "rgba(255,255,255,0.06)",
                padding: "2px 7px",
                letterSpacing: "0.08em",
                marginLeft: 6,
              }}
            >
              Demnächst
            </span>
          )}
        </p>
        <p
          className="text-[11px]"
          style={{ color: "rgba(242,242,242,0.35)" }}
        >
          {tier.desc}
        </p>
      </div>
    </div>
  );

  if (tier.available && tier.href) {
    const hoverBg = isSmart
      ? "hover:bg-[rgba(232,160,96,0.06)]"
      : "hover:bg-[rgba(255,255,255,0.04)]";
    return (
      <Link
        to={tier.href}
        onClick={onLinkClick}
        className={`block rounded-xl transition-colors ${hoverBg}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className="rounded-xl"
      style={{ cursor: "default", opacity: 0.4 }}
      aria-disabled="true"
    >
      {content}
    </div>
  );
}

function MegaPanelContent({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] gap-12 items-start">
        {/* Spalte 1 – Kategorien */}
        <div>
          <p
            className="text-[9px] font-bold uppercase mb-5"
            style={COL_LABEL_STYLE}
          >
            Kategorien
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: "0.375rem" }}
          >
            {MEGA_CATEGORIES.map((cat) => (
              <MegaCategoryTile
                key={cat.name}
                cat={cat}
                onLinkClick={onLinkClick}
              />
            ))}
          </div>
        </div>

        {/* Spalte 2 – Tiers */}
        <div>
          <p
            className="text-[9px] font-bold uppercase mb-5"
            style={COL_LABEL_STYLE}
          >
            Produktlinien
          </p>
          <div className="flex flex-col" style={{ gap: "0.375rem" }}>
            {MEGA_TIERS.map((tier) => (
              <MegaTierRow
                key={tier.name}
                tier={tier}
                onLinkClick={onLinkClick}
              />
            ))}
          </div>
        </div>

        {/* Spalte 3 – Schnellzugriff */}
        <div
          className="lg:pl-8"
          style={{
            borderLeft: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            className="text-[9px] font-bold uppercase mb-5"
            style={COL_LABEL_STYLE}
          >
            Mehr
          </p>
          <ul className="flex flex-col" style={{ gap: "0.25rem" }}>
            {MEGA_QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={onLinkClick}
                  className="flex items-center gap-2 rounded-lg transition-colors hover:bg-[rgba(255,255,255,0.03)] group"
                  style={{
                    padding: "0.5rem 0.75rem",
                    fontSize: 13,
                    color: "rgba(242,242,242,0.45)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(242,242,242,0.80)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(242,242,242,0.45)")
                  }
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: 14,
                      color: "rgba(232,160,96,0.50)",
                    }}
                    aria-hidden="true"
                  >
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer-Leiste */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        style={{
          marginTop: "1.5rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Link
          to="/collection"
          onClick={onLinkClick}
          className="flex items-center transition-colors"
          style={{
            fontSize: 12,
            color: "rgba(242,242,242,0.40)",
            fontWeight: 500,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(242,242,242,0.70)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(242,242,242,0.40)")
          }
        >
          Alle Produkte ansehen
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 14,
              color: "var(--color-amber)",
              marginLeft: 6,
            }}
            aria-hidden="true"
          >
            arrow_forward
          </span>
        </Link>

        <p
          className="text-[12px]"
          style={{ color: "rgba(242,242,242,0.20)" }}
        >
          {PRODUCTS.length} Produkte verfügbar
        </p>
      </div>
    </>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  const closeTimeoutRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const openMegaImmediately = () => {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMegaOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setMegaOpen(false);
      closeTimeoutRef.current = null;
    }, 150);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const closeAll = () => {
    setMegaOpen(false);
    setMobileOpen(false);
    cancelClose();
  };

  // Click-outside (für Mobile, wo Mega click-getriggert ist)
  useEffect(() => {
    if (!megaOpen) return;
    function handler(e: MouseEvent) {
      const target = e.target as Node;
      if (!headerRef.current?.contains(target)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50"
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      {/* Announcement Bar */}
      <div
        className="bg-deepest border-b"
        style={{ borderColor: "rgba(232,160,96,0.10)" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-2 text-center">
          <p
            className="text-[11px]"
            style={{
              color: "rgba(232,160,96,0.65)",
              letterSpacing: "0.06em",
            }}
          >
            Matter over Wi-Fi · 3 Jahre EU-Garantie
          </p>
        </div>
      </div>

      {/* Haupt-Nav */}
      <nav
        className="border-b backdrop-blur"
        style={{
          background: "rgba(14,12,10,0.97)",
          borderColor: "rgba(255,255,255,0.04)",
        }}
      >
        <div className="mx-auto max-w-7xl h-[72px] px-6 lg:px-10 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center pl-4"
            aria-label="LUMOnova – Startseite"
          >
            <img
              src="/images-optimized/logo/LUMOnova_Logo_White.webp"
              alt="LUMOnova"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop-Links */}
          <ul className="hidden lg:flex items-center gap-9">
            <li onMouseEnter={openMegaImmediately}>
              <button
                type="button"
                onClick={() => setMegaOpen((o) => !o)}
                aria-haspopup="true"
                aria-expanded={megaOpen}
                className="flex items-center gap-1 text-[12px] transition-colors cursor-pointer"
                style={{
                  color: megaOpen
                    ? "var(--color-amber)"
                    : "rgba(242,242,242,0.45)",
                }}
              >
                Produkte
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 16,
                    transform: megaOpen
                      ? "rotate(180deg)"
                      : "rotate(0)",
                    transition: "transform 0.2s",
                  }}
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </button>
            </li>

            {otherLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `text-[12px] transition-colors ${
                      isActive ? "text-amber" : "fg-mid hover:text-amber"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Rechts */}
          <div className="flex items-center gap-5">
            <div
              className="hidden sm:flex items-center gap-2 text-[11px]"
              style={{ letterSpacing: "0.10em" }}
              aria-label="Sprache"
            >
              <span className="text-amber">DE</span>
              <span className="fg-ghost">|</span>
              <button
                type="button"
                className="fg-mid hover:fg-high transition-colors"
              >
                EN
              </button>
            </div>

            {/* Mobile-Burger */}
            <button
              type="button"
              className="lg:hidden w-[38px] h-[38px] flex items-center justify-center"
              aria-label="Menü öffnen"
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((o) => !o);
                setMegaOpen(false);
              }}
            >
              <span
                className="material-symbols-outlined fg-high"
                style={{ fontSize: 24 }}
                aria-hidden="true"
              >
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile-Hauptmenü */}
        {mobileOpen && (
          <div
            className="lg:hidden bg-deepest border-t"
            style={{ borderColor: "rgba(255,255,255,0.04)" }}
          >
            <ul className="px-6 py-4 flex flex-col gap-3">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setMegaOpen(true);
                  }}
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                  className="flex items-center gap-1 py-2 text-[13px] fg-mid"
                >
                  Produkte
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: 16,
                      transform: megaOpen
                        ? "rotate(180deg)"
                        : "rotate(0)",
                      transition: "transform 0.2s",
                    }}
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </button>
              </li>
              {otherLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 text-[13px] ${
                        isActive ? "text-amber" : "fg-mid"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* MEGA-MENÜ – fixed, full-width, Desktop + Mobile */}
      <div
        role="menu"
        aria-hidden={!megaOpen}
        style={{
          position: "fixed",
          top: 104,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 50,
          background: "rgba(20,18,16,0.97)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(232,160,96,0.10)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
          padding: "2rem 0 2.5rem",
          opacity: megaOpen ? 1 : 0,
          transform: megaOpen ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: megaOpen ? "auto" : "none",
          transition: "opacity 0.20s ease, transform 0.20s ease",
          maxHeight: "calc(100vh - 104px)",
          overflowY: "auto",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <MegaPanelContent onLinkClick={closeAll} />
        </div>
      </div>
    </header>
  );
}
