import {
  ArrowLeftIcon,
  PencilIcon,
  ExternalLinkIcon,
  CalendarIcon,
  BuildingIcon,
  HashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { AchievementResponse } from "@/@types";

interface AchievementDetailSectionProps {
  achievement: AchievementResponse;
  onBack: () => void;
  onEdit: (achievement: AchievementResponse) => void;
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function AchievementDetailSection({
  achievement,
  onBack,
  onEdit,
}: AchievementDetailSectionProps) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit cursor-pointer"
      >
        <ArrowLeftIcon className="size-3.5" />
        Back
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Badge image */}
        <div className="size-16 shrink-0 overflow-hidden rounded-xl border bg-muted flex items-center justify-center">
          {achievement.image_url ? (
            <img
              src={achievement.image_url}
              alt={achievement.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-2xl select-none">🏆</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="text-xl font-semibold leading-tight">
                {achievement.title}
              </h1>
              {achievement.organization && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {achievement.organization}
                </p>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 shrink-0 cursor-pointer"
              onClick={() => onEdit(achievement)}
            >
              <PencilIcon className="size-3.5" /> Edit
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Meta grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {achievement.organization && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Organisasi
            </p>
            <span className="flex items-center gap-1.5 text-sm">
              <BuildingIcon className="size-3.5 text-muted-foreground shrink-0" />
              {achievement.organization}
            </span>
          </div>
        )}

        {achievement.issued_date && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Tanggal Terbit
            </p>
            <span className="flex items-center gap-1.5 text-sm">
              <CalendarIcon className="size-3.5 text-muted-foreground shrink-0" />
              {formatDate(achievement.issued_date)}
            </span>
          </div>
        )}

        {achievement.credential_id && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Credential ID
            </p>
            <span className="flex items-center gap-1.5 text-sm font-mono">
              <HashIcon className="size-3.5 text-muted-foreground shrink-0" />
              {achievement.credential_id}
            </span>
          </div>
        )}

        {achievement.credential_url && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Verifikasi
            </p>
            <Button
              size="sm"
              variant="outline"
              asChild
              className="w-fit gap-1.5"
            >
              <a
                href={achievement.credential_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="size-3.5" />
                Lihat Credential
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
