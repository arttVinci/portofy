import type { ProjectResponse } from "@/@types";

interface ProjectTechStackProps {
  items: ProjectResponse[];
  size?: "sm" | "md";
}

export function ProjectTechStack({ items }: ProjectTechStackProps) {
  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tool: any) => (
        <span
          key={tool.name}
          className="flex items-center gap-1.5 rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-medium"
          style={{ borderColor: tool.color + "40" }}
        >
          {tool.name}
        </span>
      ))}
    </div>
  );
}
