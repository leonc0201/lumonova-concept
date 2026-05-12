import type { ButtonHTMLAttributes, ReactNode } from "react";

interface AmberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: ReactNode;
}

export function AmberButton({
  variant = "primary",
  children,
  className = "",
  ...rest
}: AmberButtonProps) {
  if (variant === "ghost") {
    return (
      <button
        type="button"
        {...rest}
        className={`group inline-flex items-center gap-2 rounded-full px-7 py-3 text-[12px] font-semibold uppercase transition-all duration-200 ${className}`}
        style={{
          color: "rgba(242,242,242,0.80)",
          border: "1px solid rgba(255,255,255,0.20)",
          letterSpacing: "0.06em",
          background: "transparent",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <span>{children}</span>
        <span
          className="material-symbols-outlined transition-transform group-hover:translate-x-1"
          style={{ fontSize: 17 }}
          aria-hidden="true"
        >
          arrow_forward
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex items-center justify-center rounded-full px-10 py-3 text-[12px] font-bold uppercase text-white transition-all duration-200 hover:scale-105 ${className}`}
      style={{
        background: "var(--color-amber)",
        letterSpacing: "var(--tracking-btn)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--color-amber-dark)";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(232,160,96,0.30)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--color-amber)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </button>
  );
}
