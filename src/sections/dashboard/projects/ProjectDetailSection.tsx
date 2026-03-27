import {
  ExternalLinkIcon,
  ArrowLeftIcon,
  PencilIcon,
  StarIcon,
  TrendingUpIcon,
  CodeIcon,
  ImagePlayIcon,
  SparklesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectGallery } from "@/components/dashboard/projects/ProjectGallery";
import { ProjectFeatures } from "@/components/dashboard/projects/ProjectFeatures";
import type { ProjectResponse } from "@/@types/entities/project.types";

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
  const toolCount = project.tools?.length ?? 0;
  const featureCount = project.features?.length ?? 0;
  const galleryCount = project.gallery?.length ?? 0;

  return (
    <TooltipProvider>
      <div className="w-full flex flex-col gap-6">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors w-fit cursor-pointer group"
        >
          <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Kembali
        </button>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
          {/* ── LEFT: main content ── */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* Header Card */}
            <Card className="border-border/60 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="size-14 rounded-xl border border-border/60 shrink-0">
                    <AvatarImage
                      src={project.image_url}
                      alt={project.title}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-xl bg-muted text-lg">
                      📁
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h1 className="text-base font-semibold leading-snug truncate">
                          {project.title}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          Detail project
                        </p>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1.5 shrink-0 h-8 text-xs cursor-pointer"
                            onClick={() => onEdit(project)}
                          >
                            <PencilIcon className="size-3" />
                            Edit
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>Edit project ini</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      {project.featured && (
                        <Badge className="text-xs font-medium h-5 px-2 bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20">
                          <StarIcon className="size-2.5 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {project.link_url && (
                        <Badge
                          variant="outline"
                          className="text-xs font-medium h-5 px-2"
                        >
                          <ExternalLinkIcon className="size-2.5 mr-1" />
                          Live
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hero image */}
            {project.image_url && (
              <div className="overflow-hidden rounded-xl border border-border/60 bg-muted aspect-video max-h-72">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Description */}
            {project.description && (
              <div className="flex flex-col gap-2.5">
                <p className="text-sm font-medium">Deskripsi</p>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            )}

            {/* Link */}
            {project.link_url && (
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Website
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="w-fit gap-1.5 h-8 text-xs"
                >
                  <a
                    href={project.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLinkIcon className="size-3" />
                    Visit Link
                  </a>
                </Button>
              </div>
            )}

            {/* Tools */}
            {toolCount > 0 && (
              <>
                <Separator />
                <div className="flex flex-col gap-2.5">
                  <p className="text-sm font-medium">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools!.map((tool) => (
                      <Badge
                        key={tool}
                        variant="secondary"
                        className="text-xs font-medium px-2.5 py-1"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Challenges & Solution */}
            {(project.challenges || project.solution) && (
              <>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.challenges && (
                    <Card className="border-border/60 shadow-sm">
                      <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Tantangan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-4 pb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {project.challenges}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                  {project.solution && (
                    <Card className="border-border/60 shadow-sm">
                      <CardHeader className="pb-2 pt-4 px-4">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Solusi
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-4 pb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {project.solution}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </>
            )}

            {/* Features */}
            {featureCount > 0 && (
              <>
                <Separator />
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium">Features</p>
                  <ProjectFeatures features={project.features!} />
                </div>
              </>
            )}

            {/* Gallery */}
            {galleryCount > 0 && (
              <>
                <Separator />
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium">Gallery</p>
                  <ProjectGallery items={project.gallery!} />
                </div>
              </>
            )}
          </div>

          {/* ── RIGHT: sidebar ── */}
          <div className="flex flex-col gap-4">
            {/* Stats Card */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <TrendingUpIcon className="size-3.5" />
                  Ringkasan
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 flex flex-col gap-3">
                <StatRow
                  label="Status"
                  value={
                    <Badge
                      className={
                        project.featured
                          ? "text-xs h-5 px-2 bg-amber-500/10 text-amber-600 border-amber-500/20"
                          : "text-xs h-5 px-2"
                      }
                      variant={project.featured ? "outline" : "secondary"}
                    >
                      {project.featured ? "Featured" : "Regular"}
                    </Badge>
                  }
                />
                <StatRow
                  label="Tech stack"
                  value={
                    toolCount > 0 ? (
                      <Badge
                        variant="secondary"
                        className="text-xs h-5 px-2 font-medium"
                      >
                        {toolCount} tools
                      </Badge>
                    ) : (
                      "—"
                    )
                  }
                />
                <StatRow
                  label="Features"
                  value={
                    featureCount > 0 ? (
                      <Badge
                        variant="secondary"
                        className="text-xs h-5 px-2 font-medium"
                      >
                        {featureCount} group
                      </Badge>
                    ) : (
                      "—"
                    )
                  }
                />
                <StatRow
                  label="Gallery"
                  value={
                    galleryCount > 0 ? (
                      <Badge
                        variant="secondary"
                        className="text-xs h-5 px-2 font-medium"
                      >
                        {galleryCount} gambar
                      </Badge>
                    ) : (
                      "—"
                    )
                  }
                />
                <StatRow
                  label="Link"
                  value={project.link_url ? "Tersedia" : "—"}
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            {toolCount > 0 && (
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-3 pt-4 px-4">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <CodeIcon className="size-3.5" />
                    Tech Stack
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools!.slice(0, 8).map((tool) => (
                      <Badge
                        key={tool}
                        variant="outline"
                        className="text-[10px] h-5 px-2 font-medium"
                      >
                        {tool}
                      </Badge>
                    ))}
                    {toolCount > 8 && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] h-5 px-2 font-medium"
                      >
                        +{toolCount - 8}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

/* ── Helpers ─────────────────────────────────────── */

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-muted-foreground shrink-0">{label}</span>
      <span className="text-xs font-medium text-right">{value}</span>
    </div>
  );
}
