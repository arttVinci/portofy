import {
  ArrowLeftIcon,
  PencilIcon,
  ExternalLinkIcon,
  CalendarIcon,
  BuildingIcon,
  HashIcon,
  TrophyIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { AchievementResponse } from "@/@types";

interface AchievementDetailSectionProps {
  achievement: AchievementResponse;
  relatedAchievements?: AchievementResponse[];
  onBack: () => void;
  onEdit: (achievement: AchievementResponse) => void;
  onSelectRelated?: (achievement: AchievementResponse) => void;
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("id-ID", {
    month: "short",
    year: "numeric",
  });
}

export function AchievementDetailSection({
  achievement,
  relatedAchievements = [],
  onBack,
  onEdit,
  onSelectRelated,
}: AchievementDetailSectionProps) {
  return (
    <TooltipProvider>
      <div className="w-full flex flex-col gap-6">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors w-fit cursor-pointer group"
        >
          <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Kembali
        </button>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
          {/* ── LEFT: main content ── */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* Header Card */}
            <Card className="border-border/60 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="size-14 rounded-xl border border-border/60 shrink-0">
                    <AvatarImage
                      src={achievement.image_url}
                      alt={achievement.title}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-xl bg-muted text-lg">
                      🏆
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h1 className="text-base font-semibold leading-snug truncate">
                          {achievement.title}
                        </h1>
                        {achievement.organization && (
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {achievement.organization}
                          </p>
                        )}
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1.5 shrink-0 h-8 text-xs cursor-pointer"
                            onClick={() => onEdit(achievement)}
                          >
                            <PencilIcon className="size-3" />
                            Edit
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>Edit achievement ini</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      {achievement.credential_id && (
                        <Badge
                          variant="secondary"
                          className="text-xs font-medium h-5 px-2"
                        >
                          <HashIcon className="size-2.5 mr-1" />
                          {achievement.credential_id}
                        </Badge>
                      )}
                      {achievement.credential_url && (
                        <Badge className="text-xs font-medium h-5 px-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20">
                          <ShieldCheckIcon className="size-2.5 mr-1" />
                          Terverifikasi
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meta Info */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {achievement.organization && (
                <MetaItem
                  icon={<BuildingIcon className="size-3.5" />}
                  label="Organisasi"
                  value={achievement.organization}
                />
              )}
              {achievement.issued_date && (
                <MetaItem
                  icon={<CalendarIcon className="size-3.5" />}
                  label="Tanggal Terbit"
                  value={formatDate(achievement.issued_date) ?? "—"}
                />
              )}
              {achievement.credential_id && (
                <MetaItem
                  icon={<HashIcon className="size-3.5" />}
                  label="Credential ID"
                  value={achievement.credential_id}
                  mono
                />
              )}
              {achievement.credential_url && (
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Verifikasi
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="w-fit gap-1.5 h-8 text-xs"
                  >
                    <a
                      href={achievement.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLinkIcon className="size-3" />
                      Lihat Credential
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: sidebar ── */}
          <div className="flex flex-col gap-4">
            {/* Stats Card */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <TrendingUpIcon className="size-3.5" />
                  Ringkasan
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 flex flex-col gap-3">
                <StatRow
                  label="Organisasi"
                  value={achievement.organization ?? "—"}
                />
                <StatRow
                  label="Terbit"
                  value={formatDateShort(achievement.issued_date)}
                />
                <StatRow
                  label="Credential"
                  value={
                    achievement.credential_id ? (
                      <Badge
                        variant="secondary"
                        className="text-xs h-5 px-2 font-mono"
                      >
                        {achievement.credential_id}
                      </Badge>
                    ) : (
                      "—"
                    )
                  }
                />
                <StatRow
                  label="Status"
                  value={
                    <Badge
                      className={
                        achievement.credential_url
                          ? "text-xs h-5 px-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : "text-xs h-5 px-2"
                      }
                      variant={
                        achievement.credential_url ? "outline" : "secondary"
                      }
                    >
                      {achievement.credential_url
                        ? "Terverifikasi"
                        : "Tanpa link"}
                    </Badge>
                  }
                />
              </CardContent>
            </Card>

            {/* Related Achievements Card */}
            {relatedAchievements.length > 0 && (
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-3 pt-4 px-4">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <TrophyIcon className="size-3.5" />
                    Achievement Lainnya
                    <Badge
                      variant="secondary"
                      className="ml-auto text-xs h-4 px-1.5 font-medium"
                    >
                      {relatedAchievements.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 flex flex-col gap-2">
                  {relatedAchievements.slice(0, 4).map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectRelated?.(rel)}
                      className="flex items-center gap-2.5 w-full text-left rounded-lg p-2 hover:bg-muted/60 transition-colors cursor-pointer group"
                    >
                      <Avatar className="size-8 rounded-lg border border-border/60 shrink-0">
                        <AvatarImage
                          src={rel.image_url}
                          alt={rel.title}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-lg bg-muted text-xs">
                          🏆
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium truncate leading-snug group-hover:text-foreground transition-colors">
                          {rel.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {rel.organization}
                        </p>
                      </div>
                    </button>
                  ))}
                  {relatedAchievements.length > 4 && (
                    <p className="text-xs text-muted-foreground text-center pt-1">
                      +{relatedAchievements.length - 4} lainnya
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

/* ── Helpers ─────────────────────────────────────── */

function MetaItem({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <span
        className={`flex items-center gap-1.5 text-sm text-foreground ${mono ? "font-mono" : ""}`}
      >
        <span className="text-muted-foreground shrink-0">{icon}</span>
        {value}
      </span>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-muted-foreground shrink-0">{label}</span>
      <span className="text-xs font-medium text-right">{value}</span>
    </div>
  );
}
