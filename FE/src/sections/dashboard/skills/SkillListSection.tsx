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
const LEVEL_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Beginner:     { bg: "bg-sky-500/8",      text: "text-sky-700 dark:text-sky-400",      border: "border-sky-500/20" },
  Intermediate: { bg: "bg-amber-500/8",    text: "text-amber-700 dark:text-amber-400",  border: "border-amber-500/20" },
  Advanced:     { bg: "bg-violet-500/8",    text: "text-violet-700 dark:text-violet-400", border: "border-violet-500/20" },
  Expert:       { bg: "bg-emerald-500/8",   text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-500/20" },
};

function CardSkeleton() {
  return (
    <div className="rounded-lg border border-border/60 bg-card px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="size-6 rounded-md" />
      </div>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : sorted.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {sorted.map((skill, index) => {
            const style = LEVEL_STYLES[skill.level] ?? LEVEL_STYLES.Beginner;

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
                className="group rounded-lg border border-border/60 bg-card px-4 py-3 transition-all hover:border-border hover:bg-muted/30 hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  {/* Skill name + level badge */}
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <h3 className="text-sm font-medium text-foreground truncate leading-snug">
                      {skill.title}
                    </h3>
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium leading-none ${style.bg} ${style.text} ${style.border}`}
                    >
                      {skill.level}
                    </span>
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
