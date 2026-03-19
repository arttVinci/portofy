import { CheckCircle2Icon } from "lucide-react";
import type { ProjectFeature } from "@/@types/entities/project";

interface ProjectFeaturesProps {
  features: ProjectFeature[];
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  if (!features.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, i) => (
        <div key={i} className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium mb-2">{feature.title}</p>
          <ul className="flex flex-col gap-1.5">
            {feature.items.map((item, j) => (
              <li
                key={j}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <CheckCircle2Icon className="size-3.5 shrink-0 mt-0.5 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
