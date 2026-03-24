import { useState } from "react";
import {
  PlusIcon,
  SearchIcon,
  PencilIcon,
  Trash2Icon,
  EyeIcon,
} from "lucide-react";
import { motion } from "framer-motion";
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
import { Skeleton } from "@/components/ui/skeleton";
import type { EducationResponse } from "@/@types";

interface EducationListSectionProps {
  educations: EducationResponse[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (education: EducationResponse) => void;
  onDelete: (id: string) => void;
  onViewDetail: (education: EducationResponse) => void;
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

export function EducationListSection({
  educations,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
  onViewDetail,
}: EducationListSectionProps) {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = educations.filter(
    (e) =>
      !search ||
      e.institution.toLowerCase().includes(search.toLowerCase()) ||
      e.degree.toLowerCase().includes(search.toLowerCase()) ||
      e.field_of_study.toLowerCase().includes(search.toLowerCase()),
  );

  // Sort by start_date descending (newest first)
  const sorted = [...filtered].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Cari education..."
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
          Tambah Education
        </Button>
      </div>

      {/* Count */}
      {!isLoading && (
        <p className="text-xs text-muted-foreground">
          {search
            ? `${filtered.length} dari ${educations.length} education`
            : `${educations.length} education`}
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
          {sorted.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: smooth, delay: index * 0.08 }}
              className="relative flex gap-5 pb-8 last:pb-0 group"
            >
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center">
                {/* Dot */}
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/20 bg-background shadow-sm group-hover:border-primary/50 transition-colors">
                  {edu.image_url ? (
                    <img
                      src={edu.image_url}
                      alt={edu.institution}
                      className="size-7 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-base select-none">🎓</span>
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
                  {formatDate(edu.start_date)}
                  {" — "}
                  {edu.end_date ? formatDate(edu.end_date) : "Sekarang"}
                </p>

                {/* Card-like content */}
                <div className="rounded-xl border bg-card p-4 shadow-sm transition-all group-hover:shadow-md group-hover:border-primary/20">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-foreground truncate">
                        {edu.institution}
                      </h3>
                      {(edu.degree || edu.field_of_study) && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {edu.degree}
                          {edu.degree && edu.field_of_study ? " — " : ""}
                          {edu.field_of_study}
                        </p>
                      )}
                      {edu.location && (
                        <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                          📍 {edu.location}
                        </p>
                      )}
                      {edu.grade && (
                        <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                          IPK: {edu.grade}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onViewDetail(edu)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                        title="Lihat detail"
                      >
                        <EyeIcon className="size-3.5 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => onEdit(edu)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <PencilIcon className="size-3.5 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => setDeleteId(edu.id)}
                        className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2Icon className="size-3.5 text-destructive/70" />
                      </button>
                    </div>
                  </div>

                  {edu.description && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                      {edu.description}
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
            {search ? "Tidak ada education yang cocok" : "Belum ada education"}
          </p>
          {!search && (
            <Button
              size="sm"
              variant="outline"
              className="mt-3 gap-1.5 cursor-pointer"
              onClick={onAdd}
            >
              <PlusIcon className="size-3.5" />
              Tambah Education Pertama
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
            <AlertDialogTitle>Hapus education ini?</AlertDialogTitle>
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
