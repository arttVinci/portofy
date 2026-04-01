import { Link } from "react-router-dom";
import {
  RocketIcon,
  TrophyIcon,
  ChevronRightIcon,
  SparklesIcon,
  ImageIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectResponse } from "@/@types/entities/project.types";
import type { AchievementResponse } from "@/@types/entities/achievement.types";

interface PortfolioHighlightsProps {
  projects: ProjectResponse[];
  achievements: AchievementResponse[];
}

type HighlightItem = {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  type: "project" | "achievement";
  url: string;
  meta?: string;
};

function buildHighlights(
  projects: ProjectResponse[],
  achievements: AchievementResponse[],
): HighlightItem[] {
  const items: HighlightItem[] = [];

  // Featured projects first, then recent
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const sortedProjects = [...featured, ...rest];

  for (const p of sortedProjects.slice(0, 2)) {
    items.push({
      id: p.id,
      title: p.title,
      description: p.description,
      image_url: p.image_url,
      type: "project",
      url: "/app/projects",
      meta: p.featured ? "Featured" : undefined,
    });
  }

  // Top achievements
  for (const a of achievements.slice(0, 1)) {
    items.push({
      id: a.id,
      title: a.title,
      image_url: a.image_url,
      type: "achievement",
      url: "/app/achievements",
      meta: a.organization,
    });
  }

  return items.slice(0, 3);
}

export function PortfolioHighlights({
  projects,
  achievements,
}: PortfolioHighlightsProps) {
  const highlights = buildHighlights(projects, achievements);
  const hasData = highlights.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <SparklesIcon className="size-4 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">
            Portfolio Highlights
          </CardTitle>
        </div>
        <CardDescription className="text-xs">
          Proyek & pencapaian terbaik kamu
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
            <Link to="/app/projects">
              Lihat Semua
              <ChevronRightIcon className="size-3" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="pt-0">
        {hasData ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className={cn(
                  "group flex flex-col rounded-lg border bg-muted/20 overflow-hidden",
                  "transition-all hover:bg-muted/40 hover:border-border/80 hover:-translate-y-0.5 hover:shadow-sm",
                )}
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-muted/40 relative overflow-hidden">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground/30">
                      <ImageIcon className="size-8" />
                    </div>
                  )}

                  {/* Type badge */}
                  <div className="absolute top-2 left-2">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[10px] gap-1 backdrop-blur-sm",
                        item.type === "project"
                          ? "bg-blue-100/90 text-blue-700 dark:bg-blue-950/90 dark:text-blue-300"
                          : "bg-amber-100/90 text-amber-700 dark:bg-amber-950/90 dark:text-amber-300",
                      )}
                    >
                      {item.type === "project" ? (
                        <RocketIcon className="size-2.5" />
                      ) : (
                        <TrophyIcon className="size-2.5" />
                      )}
                      {item.type === "project" ? "Project" : "Achievement"}
                    </Badge>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs font-medium leading-tight line-clamp-1 group-hover:text-foreground transition-colors">
                    {item.title}
                  </p>
                  {item.meta && (
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {item.meta}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center">
            <SparklesIcon className="size-8 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">
              Belum ada highlight
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Tambahkan project atau achievement pertamamu
            </p>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" asChild className="text-xs">
                <Link to="/app/projects">Tambah Project</Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="text-xs">
                <Link to="/app/achievements">Tambah Achievement</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
