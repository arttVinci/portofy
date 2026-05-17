import type { ProjectResponse } from "@/@types";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: ProjectResponse[];
  username: string;
}

export function ProjectGrid({ projects, username }: ProjectGridProps) {
  if (!projects.length) return null;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} username={username} />
      ))}
    </div>
  );
}
