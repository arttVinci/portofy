interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-12 rounded-full bg-[#00d4ff] ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
}
