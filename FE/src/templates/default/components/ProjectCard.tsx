import type { ProjectResponse } from "@/@types";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: ProjectResponse;
  username: string;
}

export function ProjectCard({ project, username }: ProjectCardProps) {
  return (
    <Link
      to={`/${username}/projects/${project.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-[#00d4ff]/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted/20">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/30">
            <ExternalLink size={32} />
          </div>
        )}

        {project.featured && (
          <span className="absolute top-3 right-3 rounded-full bg-[#00d4ff] px-2.5 py-0.5 text-xs font-bold text-black">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-[#00d4ff]">
          {project.title}
        </h3>

        {project.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        )}

        {project.tools?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tools.slice(0, 5).map((tool) => (
              <span
                key={tool}
                className="rounded-md bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 5 && (
              <span className="rounded-md bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground">
                +{project.tools.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
