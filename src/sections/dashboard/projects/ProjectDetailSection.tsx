import {
  GithubIcon,
  ExternalLinkIcon,
  ArrowLeftIcon,
  PencilIcon,
  StarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectTechStack } from "@/components/dashboard/projects/ProjectTechStack";
import { ProjectGallery } from "@/components/dashboard/projects/ProjectGallery";
import { ProjectFeatures } from "@/components/dashboard/projects/ProjectFeatures";
import type { ProjectResponse } from "@/@types/entities/project";

interface ProjectDetailSectionProps {
  project: ProjectResponse;
  onBack: () => void;
  onEdit: (project: ProjectResponse) => void;
}

export function ProjectDetailSection({
  project,
  onBack,
  onEdit,
}: ProjectDetailSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Header nav */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={onBack}
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium truncate">{project.title}</p>
              {project.featured && (
                <span className="flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-950 px-2 py-0.5 text-[10px] font-medium text-amber-800 dark:text-amber-300 shrink-0">
                  <StarIcon className="size-2.5" /> Featured
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Detail project</p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 shrink-0"
          onClick={() => onEdit(project)}
        >
          <PencilIcon className="size-3.5" /> Edit
        </Button>
      </div>

      {/* Hero image */}
      {project.image && (
        <div className="overflow-hidden rounded-xl border bg-muted aspect-video max-h-72">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Title + description */}
      <div>
        <h1 className="text-xl font-semibold">{project.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tags + links */}
      <div className="flex flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        <div className="ml-auto flex items-center gap-2">
          {project.github_url && (
            <Button size="sm" variant="outline" asChild className="gap-1.5">
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="size-3.5" /> GitHub
              </a>
            </Button>
          )}
          {project.live_url && (
            <Button size="sm" asChild className="gap-1.5">
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="size-3.5" /> Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Tech stack */}
      {project.tech_stack.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Tech Stack</p>
          <ProjectTechStack items={project.tech_stack} />
        </div>
      )}

      {/* Challenges & Solution */}
      {(project.challenges || project.solution) && (
        <>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            {project.challenges && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tantangan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.challenges}
                  </p>
                </CardContent>
              </Card>
            )}
            {project.solution && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Solusi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.solution}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}

      {/* Features */}
      {project.features.length > 0 && (
        <>
          <Separator />
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Features</p>
            <ProjectFeatures features={project.features} />
          </div>
        </>
      )}

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <>
          <Separator />
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Gallery</p>
            <ProjectGallery items={project.gallery} />
          </div>
        </>
      )}
    </div>
  );
}
