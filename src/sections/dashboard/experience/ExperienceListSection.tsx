import { useState } from "react";
import {
  PlusIcon,
  SearchIcon,
  PencilIcon,
  Trash2Icon,
  EyeIcon,
  MapPinIcon,
  BriefcaseIcon,
} from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

function getDurationMonths(start?: string, end?: string): number {
  if (!start) return 0;
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())
  );
}

function formatDuration(months: number): string {
  if (months < 1) return "< 1 bln";
  if (months < 12) return `${months} bln`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} thn`;
  return `${years} thn ${rem} bln`;
}

function TimelineSkeleton() {
  return (
    <div className="relative flex gap-5 pb-10">
      <div className="flex flex-col items-center">
        <Skeleton className="size-11 rounded-xl shrink-0" />
        <Skeleton className="w-0.5 flex-1 mt-2" />
      </div>
      <div className="flex-1 pb-2 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-[88px] w-full rounded-xl" />
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

  const sorted = [...filtered].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  );

  return (
    <TooltipProvider>
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
          <div className="pl-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <TimelineSkeleton key={i} />
            ))}
          </div>
        ) : sorted.length > 0 ? (
          <div className="relative pl-1">
            {sorted.map((exp, index) => {
              const isActive = !exp.end_date;
              const months = getDurationMonths(exp.start_date, exp.end_date);
              const duration = formatDuration(months);

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: smooth,
                    delay: index * 0.06,
                  }}
                  className="relative flex gap-4 pb-8 last:pb-0 group"
                >
                  {/* Timeline line + dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`relative z-10 flex size-11 shrink-0 items-center justify-center rounded-xl border-2 bg-background shadow-sm transition-all ${
                        isActive
                          ? "border-emerald-500/40 group-hover:border-emerald-500/70 group-hover:shadow-emerald-500/10"
                          : "border-border/60 group-hover:border-primary/40 group-hover:shadow-md"
                      }`}
                    >
                      {exp.image_url ? (
                        <img
                          src={exp.image_url}
                          alt={exp.company_name}
                          className="size-7 rounded-lg object-cover"
                        />
                      ) : (
                        <BriefcaseIcon className="size-4 text-muted-foreground" />
                      )}
                      {/* Active pulse */}
                      {isActive && (
                        <span className="absolute -right-0.5 -top-0.5 flex size-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                          <span className="relative inline-flex size-3 rounded-full bg-emerald-500 border-2 border-background" />
                        </span>
                      )}
                    </div>
                    {/* Connector line */}
                    {index < sorted.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-border to-border/30 mt-1.5" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pb-1">
                    {/* Date badge */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-[11px] font-medium text-muted-foreground">
                        {formatDate(exp.start_date)} —{" "}
                        {exp.end_date ? formatDate(exp.end_date) : "Sekarang"}
                      </p>
                      {months > 0 && (
                        <span className="text-[10px] text-muted-foreground/60">
                          · {duration}
                        </span>
                      )}
                    </div>

                    {/* Card content */}
                    <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-all group-hover:shadow-md group-hover:border-primary/20 group-hover:bg-card/80">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-foreground truncate leading-snug">
                            {exp.position}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">
                            {exp.company_name}
                          </p>

                          {/* Meta row */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                            {exp.location && (
                              <span className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
                                <MapPinIcon className="size-3" />
                                {exp.location}
                              </span>
                            )}
                          </div>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {exp.employment_type && (
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-2 py-0.5 font-medium"
                              >
                                {exp.employment_type}
                              </Badge>
                            )}
                            {exp.location_type && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-2 py-0.5 font-medium"
                              >
                                {exp.location_type}
                              </Badge>
                            )}
                            {isActive && (
                              <Badge className="text-[10px] px-2 py-0.5 font-medium bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20">
                                Aktif
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => onViewDetail(exp)}
                                className="p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                              >
                                <EyeIcon className="size-3.5 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Lihat detail</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => onEdit(exp)}
                                className="p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                              >
                                <PencilIcon className="size-3.5 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => setDeleteId(exp.id)}
                                className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer"
                              >
                                <Trash2Icon className="size-3.5 text-destructive/70" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Hapus</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                      {exp.description && (
                        <p className="text-xs text-muted-foreground mt-2.5 line-clamp-2 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 py-20 text-center">
            <BriefcaseIcon className="size-8 text-muted-foreground/20 mb-3" />
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
    </TooltipProvider>
  );
}
