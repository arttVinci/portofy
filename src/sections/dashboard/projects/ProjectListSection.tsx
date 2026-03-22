import { useState } from "react";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import type { ProjectResponse } from "@/@types";
import TemplateCard from "@/components/dashboard/projects/TemplateCard";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/ui/EmptySearch";

interface ProjectListSectionProps {
  projects: ProjectResponse[];
  onAdd: () => void;
  onEdit: (project: ProjectResponse) => void;
  onDelete: (id: string) => void;
  onViewDetail: (project: ProjectResponse) => void;
  isLoading?: boolean;
}

export function ProjectListSection({
  projects,
  onAdd,
  onEdit,
  onDelete,
  onViewDetail,
  isLoading,
}: ProjectListSectionProps) {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = projects.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5">
      {/* ── Toolbar ── */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Cari project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
        </div>
        <Button
          size="sm"
          onClick={onAdd}
          className="gap-1.5 ml-auto shrink-0 cursor-pointer"
        >
          <PlusIcon className="size-3.5" />
          Tambah Project
        </Button>
      </div>

      {/* ── Project count ── */}
      <p className="text-xs text-muted-foreground">
        {`Total : ${projects.length} project`}
      </p>

      {/* ── Grid ── */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm"
            >
              <Skeleton className="aspect-video w-full rounded-lg" />
              <div className="space-y-2 mt-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((project, index) => (
            <TemplateCard
              i={index}
              key={project.id}
              project={project}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              onEdit={onEdit}
              onDelete={(id) => setDeleteId(id)}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={search ? "Pencarian tidak ditemukan" : "Belum ada project"}
          description={
            search
              ? `Tidak ada hasil untuk "${search}"`
              : "Kamu belum menambahkan project sama sekali"
          }
          actionText={search ? "Hapus Pencarian" : "Tambah Project Pertama"}
          onAction={search ? () => setSearch("") : onAdd}
        />
      )}

      {/* ── Delete confirm ── */}
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
