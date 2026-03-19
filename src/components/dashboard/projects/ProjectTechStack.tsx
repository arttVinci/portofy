import type { TechItem } from "@/@types/entities/project";

interface ProjectTechStackProps {
  items: TechItem[];
  size?: "sm" | "md";
}

export function ProjectTechStack({
  items,
  size = "md",
}: ProjectTechStackProps) {
  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <span
          key={tech.name}
          className="flex items-center gap-1.5 rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-medium"
          style={{ borderColor: tech.color + "40" }}
        >
          <span
            className="size-1.5 rounded-full shrink-0"
            style={{ background: tech.color }}
          />
          {tech.name}
        </span>
      ))}
    </div>
  );
}
