interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  withAccent?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  withAccent = false,
}: SectionHeadingProps) {
  return (
    <div className="text-left">
      {withAccent && (
        <span
          aria-hidden="true"
          className="block bg-amber mb-6"
          style={{ height: 2, width: 36 }}
        />
      )}
      <p
        className="text-[9px] font-bold uppercase mb-2.5"
        style={{
          color: "rgba(232,160,96,0.55)",
          letterSpacing: "var(--tracking-eyebrow)",
        }}
      >
        {eyebrow}
      </p>
      <h2
        className="fg-primary text-[28px] font-bold leading-[1.1] tracking-tight mb-1"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="fg-low text-[13px] max-w-[520px] leading-relaxed mt-3">
          {subtitle}
        </p>
      )}
    </div>
  );
}
