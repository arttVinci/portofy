interface AboutSectionProps {
  about: string;
}

export function AboutSection({ about }: AboutSectionProps) {
  if (!about) return null;

  const paragraphs = about.split("\n").filter((p) => p.trim());

  return (
    <div className="max-w-3xl space-y-4">
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
