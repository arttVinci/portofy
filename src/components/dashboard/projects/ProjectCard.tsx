import type { ProjectResponse } from "@/@types/entities/project";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MoreVertical,
  Pencil,
  Trash2,
  ExternalLink,
  Github,
  Star,
  ImageIcon,
} from "lucide-react";

interface ProjectCardProps {
  project: ProjectResponse;
  onEdit: (project: ProjectResponse) => void;
  onDelete: (project: ProjectResponse) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <Card className="group relative transition-shadow hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-muted">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageIcon className="size-10 opacity-40" />
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-2 left-2">
            <Badge className="gap-1 bg-amber-500/90 text-white hover:bg-amber-500">
              <Star className="size-3 fill-current" />
              Featured
            </Badge>
          </div>
        )}

        {/* Action dropdown */}
        <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="size-8 bg-background/80 backdrop-blur-sm"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>
              {project.live_url && (
                <DropdownMenuItem asChild>
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 size-4" />
                    Live Preview
                  </a>
                </DropdownMenuItem>
              )}
              {project.github_url && (
                <DropdownMenuItem asChild>
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 size-4" />
                    GitHub
                  </a>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(project)}
              >
                <Trash2 className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-base">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        {/* Tech stack */}
        {project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 4).map((tech) => (
              <Tooltip key={tech.name}>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="text-xs font-normal">
                    {tech.name}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>{tech.name}</TooltipContent>
              </Tooltip>
            ))}
            {project.tech_stack.length > 4 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{project.tech_stack.length - 4}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      {/* Footer with tags */}
      <CardFooter className="gap-2 border-t-0 bg-transparent pt-0">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs text-muted-foreground"
          >
            #{tag}
          </span>
        ))}

        {/* Quick links */}
        <div className="ml-auto flex gap-1">
          {project.github_url && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-7" asChild>
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="size-3.5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>GitHub</TooltipContent>
            </Tooltip>
          )}
          {project.live_url && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-7" asChild>
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Live Preview</TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
