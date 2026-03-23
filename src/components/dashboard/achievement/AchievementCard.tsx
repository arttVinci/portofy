import {
  PencilIcon,
  Trash2Icon,
  ExternalLinkIcon,
  CalendarIcon,
  BuildingIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { AchievementResponse } from "@/@types";

interface AchievementCardProps {
  achievement: AchievementResponse;
  onEdit: (achievement: AchievementResponse) => void;
  onDelete: (id: string) => void;
  onViewDetail: (achievement: AchievementResponse) => void;
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
}

export function AchievementCard({
  achievement,
  onEdit,
  onDelete,
  onViewDetail,
}: AchievementCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border bg-card overflow-hidden transition-all duration-200 hover:border-border/80 hover:shadow-sm">
      {/* ── Image / Badge area ── */}
      <div
        className="relative cursor-pointer bg-muted overflow-hidden"
        onClick={() => onViewDetail(achievement)}
      >
        {/* Browser chrome bar */}
        <div className="flex items-center gap-1.5 border-b bg-background/60 px-3 py-2 shrink-0">
          <span className="size-2 rounded-full bg-muted-foreground/25" />
          <span className="size-2 rounded-full bg-muted-foreground/25" />
          <span className="size-2 rounded-full bg-muted-foreground/25" />
          <div className="mx-2 h-3 flex-1 rounded-sm bg-muted-foreground/10" />
        </div>

        <div className="aspect-[16/9] overflow-hidden">
          {achievement.image_url ? (
            <img
              src={achievement.image_url}
              alt={achievement.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center gap-3 p-4">
              <div className="flex size-14 items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/20">
                <span className="text-2xl select-none">🏆</span>
              </div>
              <div className="w-full flex flex-col gap-1.5 items-center">
                <div className="h-2 w-2/3 rounded bg-muted-foreground/10" />
                <div className="h-2 w-1/2 rounded bg-muted-foreground/10" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col gap-2.5 p-4">
        <div>
          <button
            onClick={() => onViewDetail(achievement)}
            className="text-left text-sm font-medium leading-tight hover:underline underline-offset-2 line-clamp-1"
          >
            {achievement.title}
          </button>

          <div className="mt-1.5 flex flex-col gap-1">
            {achievement.organization && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <BuildingIcon className="size-3 shrink-0" />
                {achievement.organization}
              </span>
            )}
            {achievement.issued_date && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarIcon className="size-3 shrink-0" />
                {formatDate(achievement.issued_date)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t pt-2.5">
          <div className="flex gap-0.5">
            {achievement.credential_url && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7"
                    asChild
                  >
                    <a
                      href={achievement.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLinkIcon className="size-3.5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Lihat Credential</TooltipContent>
              </Tooltip>
            )}
          </div>

          <div className="flex gap-0.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7 cursor-pointer"
                  onClick={() => onEdit(achievement)}
                >
                  <PencilIcon className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7 cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onDelete(achievement.id)}
                >
                  <Trash2Icon className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Hapus</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
