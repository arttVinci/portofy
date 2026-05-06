import {
  ExternalLinkIcon,
  StarIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ProjectResponse } from "@/@types/entities/project.types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectResponse;
  onEdit: (project: ProjectResponse) => void;
  onDelete: (id: string) => void;
  onViewDetail: (project: ProjectResponse) => void;
}

export function ProjectCard({
  project,
  onEdit,
  onDelete,
  onViewDetail,
}: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "group flex flex-col overflow-hidden transition-all",
        project.featured && "ring-1 ring-amber-400/40 dark:ring-amber-500/30",
      )}
    >
      {/* Thumbnail */}
      <div
        className="relative aspect-video cursor-pointer overflow-hidden bg-muted"
        onClick={() => onViewDetail(project)}
      >
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/30 text-sm">
            No image
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-medium text-amber-900">
            <StarIcon className="size-2.5" />
            Featured
          </span>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        {/* Title + desc */}
        <div className="flex-1">
          <button
            className="text-left text-sm font-medium hover:underline underline-offset-2"
            onClick={() => onViewDetail(project)}
          >
            {project.title}
          </button>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {project.link_url && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7"
                    asChild
                  >
                    <a
                      href={project.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLinkIcon className="size-3.5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Live Demo</TooltipContent>
              </Tooltip>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7"
                  onClick={() => onEdit(project)}
                >
                  <PencilIcon className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Edit</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onDelete(project.id)}
                >
                  <Trash2Icon className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Hapus</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
