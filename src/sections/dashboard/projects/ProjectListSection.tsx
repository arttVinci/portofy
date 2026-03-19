import { useState } from "react";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ProjectCard } from "@/components/dashboard/projects/ProjectCard";
import type { ProjectResponse } from "@/@types/entities/project";

interface ProjectListSectionProps {
  projects: ProjectResponse[];
  onAdd: () => void;
  onEdit: (project: ProjectResponse) => void;
  onDelete: (id: string) => void;
  onViewDetail: (project: ProjectResponse) => void;
}

export function ProjectListSection({
  projects,
  onAdd,
  onEdit,
  onDelete,
  onViewDetail,
}: ProjectListSectionProps) {
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // All unique tags across projects
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  const filtered = projects.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchTag = !filterTag || p.tags.includes(filterTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Cari project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
        <Button size="sm" onClick={onAdd} className="gap-1.5 shrink-0">
          <PlusIcon className="size-3.5" />
          Tambah Project
        </Button>
      </div>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant={filterTag === null ? "default" : "outline"}
            className="cursor-pointer text-xs"
            onClick={() => setFilterTag(null)}
          >
            Semua
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={filterTag === tag ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() => setFilterTag(tag === filterTag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={(id) => setDeleteId(id)}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            {search || filterTag
              ? "Tidak ada project yang cocok"
              : "Belum ada project"}
          </p>
          {!search && !filterTag && (
            <Button
              size="sm"
              variant="outline"
              className="mt-3 gap-1.5"
              onClick={onAdd}
            >
              <PlusIcon className="size-3.5" />
              Tambah Project Pertama
            </Button>
          )}
        </div>
      )}

      {/* Delete confirm dialog */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus project ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Project akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteId) onDelete(deleteId);
                setDeleteId(null);
              }}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
