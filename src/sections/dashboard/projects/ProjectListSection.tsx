import { useState, useMemo } from "react";
import type { ProjectResponse } from "@/@types/entities/project";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/dashboard/projects/ProjectCard";
import { Search, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FilterTab = "all" | "featured" | "regular";
type ViewMode = "grid" | "list";

interface ProjectListSectionProps {
  projects: ProjectResponse[];
  onEdit: (project: ProjectResponse) => void;
  onDelete: (project: ProjectResponse) => void;
}

export default function ProjectListSection({
  projects,
  onEdit,
  onDelete,
}: ProjectListSectionProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTab>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // ── Filtered & searched projects ───────────────────────

  const filtered = useMemo(() => {
    let result = projects;

    // Filter by tab
    if (filter === "featured") {
      result = result.filter((p) => p.featured);
    } else if (filter === "regular") {
      result = result.filter((p) => !p.featured);
    }

    // Search by title or tags
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.tech_stack.some((t) => t.name.toLowerCase().includes(q))
      );
    }

    return result;
  }, [projects, filter, search]);

  // ── Counts ─────────────────────────────────────────────

  const counts = useMemo(
    () => ({
      all: projects.length,
      featured: projects.filter((p) => p.featured).length,
      regular: projects.filter((p) => !p.featured).length,
    }),
    [projects]
  );

  return (
    <div className="flex flex-col gap-4">
      {/* ── Toolbar ────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Filter tabs */}
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as FilterTab)}
          >
            <TabsList>
              <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
              <TabsTrigger value="featured">
                Featured ({counts.featured})
              </TabsTrigger>
              <TabsTrigger value="regular">
                Regular ({counts.regular})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* View toggle */}
          <div className="hidden items-center gap-1 rounded-lg border p-1 sm:flex">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="size-7"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Grid View</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="size-7"
                  onClick={() => setViewMode("list")}
                >
                  <List className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>List View</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* ── Project Grid / List ────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
          <p className="text-lg font-medium text-muted-foreground">
            {search ? "No projects found" : "No projects yet"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground/70">
            {search
              ? "Try a different search term or filter."
              : "Click \"Add Project\" to create your first project."}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
