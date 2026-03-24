import { useState } from "react";
import { PlusIcon, SearchIcon, PencilIcon, Trash2Icon, EyeIcon } from "lucide-react";
import { motion } from "framer-motion";
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
import { Skeleton } from "@/components/ui/skeleton";
import type { ExperienceResponse } from "@/@types";

interface ExperienceListSectionProps {
  experiences: ExperienceResponse[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (experience: ExperienceResponse) => void;
  onDelete: (id: string) => void;
  onViewDetail: (experience: ExperienceResponse) => void;
}

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", {
    month: "short",
    year: "numeric",
  });
}

function TimelineSkeleton() {
  return (
    <div className="relative flex gap-6 pb-10">
      <div className="flex flex-col items-center">
        <Skeleton className="size-10 rounded-full shrink-0" />
        <Skeleton className="w-0.5 flex-1 mt-2" />
      </div>
      <div className="flex-1 pb-2">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-5 w-48 mb-1" />
        <Skeleton className="h-4 w-36 mb-1" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function ExperienceListSection({
  experiences,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
  onViewDetail,
}: ExperienceListSectionProps) {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = experiences.filter(
    (e) =>
      !search ||
      e.position.toLowerCase().includes(search.toLowerCase()) ||
      e.company_name.toLowerCase().includes(search.toLowerCase()),
  );

  // Sort by start_date descending (newest first)
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Cari experience..."
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
          Tambah Experience
        </Button>
      </div>

      {/* Count */}
      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {search
            ? `${filtered.length} dari ${experiences.length} experience`
            : `${experiences.length} experience`}
        </p>
      )}

      {/* Timeline */}
      {isLoading ? (
        <div className="pl-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <TimelineSkeleton key={i} />
          ))}
        </div>
      ) : sorted.length > 0 ? (
        <div className="relative pl-2">
          {sorted.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: smooth, delay: index * 0.08 }}
              className="relative flex gap-5 pb-8 last:pb-0 group"
            >
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center">
                {/* Dot */}
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/20 bg-background shadow-sm group-hover:border-primary/50 transition-colors">
                  {exp.image_url ? (
                    <img
                      src={exp.image_url}
                      alt={exp.company_name}
                      className="size-7 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-base select-none">💼</span>
                  )}
                </div>
                {/* Connector line */}
                {index < sorted.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-1">
                {/* Date badge */}
                <p className="text-[11px] font-medium text-muted-foreground mb-1.5">
                  {formatDate(exp.start_date)}
                  {" — "}
                  {exp.end_date ? formatDate(exp.end_date) : "Sekarang"}
                </p>

                {/* Card-like content */}
                <div className="rounded-xl border bg-card p-4 shadow-sm transition-all group-hover:shadow-md group-hover:border-primary/20">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-foreground truncate">
                        {exp.position}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {exp.company_name}
                      </p>
                      {exp.location && (
                        <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                          📍 {exp.location}
                        </p>
                      )}

                      {/* Badges */}
                      {(exp.employment_type || exp.location_type) && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exp.employment_type && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              {exp.employment_type}
                            </Badge>
                          )}
                          {exp.location_type && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                              {exp.location_type}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onViewDetail(exp)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                        title="Lihat detail"
                      >
                        <EyeIcon className="size-3.5 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => onEdit(exp)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <PencilIcon className="size-3.5 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => setDeleteId(exp.id)}
                        className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2Icon className="size-3.5 text-destructive/70" />
                      </button>
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            {search
              ? "Tidak ada experience yang cocok"
              : "Belum ada experience"}
          </p>
          {!search && (
            <Button
              size="sm"
              variant="outline"
              className="mt-3 gap-1.5 cursor-pointer"
              onClick={onAdd}
            >
              <PlusIcon className="size-3.5" />
              Tambah Experience Pertama
            </Button>
          )}
        </div>
      )}

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus experience ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
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
