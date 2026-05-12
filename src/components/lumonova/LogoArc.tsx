interface LogoArcProps {
  variant?: "divider" | "hero";
}

export function LogoArc({ variant = "divider" }: LogoArcProps) {
  if (variant === "hero") {
    return (
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          right: "-10%",
          top: "10%",
          width: "60%",
          opacity: 0.04,
          zIndex: 1,
        }}
        viewBox="0 0 1000 280"
        preserveAspectRatio="none"
      >
        <path
          d="M 20 260 Q 500 -40 980 260"
          stroke="#E8A060"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <div className="w-full pointer-events-none" aria-hidden="true">
      <svg
        className="block w-full"
        height="80"
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
      >
        <path
          d="M 20 70 Q 500 0 980 70"
          stroke="rgba(232,160,96,0.08)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
