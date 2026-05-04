import { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  ZapIcon,
} from "lucide-react";
import { motion } from "framer-motion";
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
import type { SkillResponse } from "@/@types";

interface SkillListSectionProps {
  skills: SkillResponse[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (skill: SkillResponse) => void;
  onDelete: (id: string) => void;
}

/* Level → color mapping */
const LEVEL_STYLES: Record<string, { bg: string; text: string; bar: string }> = {
  Beginner:     { bg: "bg-sky-500/10",     text: "text-sky-700 dark:text-sky-400",     bar: "bg-sky-500" },
  Intermediate: { bg: "bg-amber-500/10",   text: "text-amber-700 dark:text-amber-400", bar: "bg-amber-500" },
  Advanced:     { bg: "bg-violet-500/10",   text: "text-violet-700 dark:text-violet-400", bar: "bg-violet-500" },
  Expert:       { bg: "bg-emerald-500/10",  text: "text-emerald-700 dark:text-emerald-400", bar: "bg-emerald-500" },
};

/* Level → progress percentage */
const LEVEL_PERCENT: Record<string, number> = {
  Beginner: 25,
  Intermediate: 50,
  Advanced: 75,
  Expert: 100,
};

function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="size-9 rounded-lg" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      </div>
      <Skeleton className="h-1.5 w-full rounded-full" />
    </div>
  );
}

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function SkillListSection({
  skills,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
}: SkillListSectionProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sorted = [...skills].sort((a, b) => {
    const order = ["Expert", "Advanced", "Intermediate", "Beginner"];
    return order.indexOf(a.level) - order.indexOf(b.level);
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Count + Add button */}
      {!isLoading && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {skills.length} skill{skills.length !== 1 ? "s" : ""}
          </p>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 cursor-pointer"
            onClick={onAdd}
          >
            <PlusIcon className="size-3.5" />
            Tambah Skill
          </Button>
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sorted.map((skill, index) => {
            const style = LEVEL_STYLES[skill.level] ?? LEVEL_STYLES.Beginner;
            const pct = LEVEL_PERCENT[skill.level] ?? 25;

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: smooth,
                  delay: index * 0.04,
                }}
                className="group rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-border hover:bg-muted/30 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  {/* Icon + title + badge */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${style.bg}`}>
                      <ZapIcon className={`size-4 ${style.text}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-foreground truncate leading-snug">
                        {skill.title}
                      </h3>
                      <span className={`text-[11px] font-medium ${style.text}`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onEdit(skill)}
                      className="inline-flex items-center justify-center size-7 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <PencilIcon className="size-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteId(skill.id)}
                      className="inline-flex items-center justify-center size-7 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2Icon className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${style.bar}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: smooth, delay: index * 0.04 + 0.2 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 py-20 text-center">
          <ZapIcon className="size-8 text-muted-foreground/20 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">
            Belum ada skill
          </p>
          <Button
            size="sm"
            variant="outline"
            className="mt-3 gap-1.5 cursor-pointer"
            onClick={onAdd}
          >
            <PlusIcon className="size-3.5" />
            Tambah Skill Pertama Anda
          </Button>
        </div>
      )}

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus skill ini?</AlertDialogTitle>
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
