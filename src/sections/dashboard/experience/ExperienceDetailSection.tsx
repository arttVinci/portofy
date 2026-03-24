import {
  ArrowLeftIcon,
  PencilIcon,
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  BuildingIcon,
  ExternalLinkIcon,
  ClockIcon,
  TrendingUpIcon,
  LayersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ExperienceResponse } from "@/@types";

interface ExperienceDetailSectionProps {
  experience: ExperienceResponse;
  relatedExperiences?: ExperienceResponse[];
  onBack: () => void;
  onEdit: (experience: ExperienceResponse) => void;
  onSelectRelated?: (experience: ExperienceResponse) => void;
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
  if (!iso) return "Sekarang";
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

export function ExperienceDetailSection({
  experience,
  relatedExperiences = [],
  onBack,
  onEdit,
  onSelectRelated,
}: ExperienceDetailSectionProps) {
  const durationMonths = getDurationMonths(
    experience.start_date,
    experience.end_date,
  );
  const duration = formatDuration(durationMonths);
  const isActive = !experience.end_date;

  // Stats: total related experiences at same company
  const sameCompany = relatedExperiences.filter(
    (e) => e.company_name === experience.company_name && e.id !== experience.id,
  );

  return (
    <TooltipProvider>
      {/* Outer: full width, 2-col on lg+ */}
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
                      src={experience.image_url}
                      alt={experience.company_name}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-xl bg-muted text-lg">
                      💼
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h1 className="text-base font-semibold leading-snug truncate">
                          {experience.position}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {experience.company_name}
                        </p>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1.5 shrink-0 h-8 text-xs cursor-pointer"
                            onClick={() => onEdit(experience)}
                          >
                            <PencilIcon className="size-3" />
                            Edit
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>Edit pengalaman ini</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      {experience.employment_type && (
                        <Badge
                          variant="secondary"
                          className="text-xs font-medium h-5 px-2"
                        >
                          {experience.employment_type}
                        </Badge>
                      )}
                      {experience.location_type && (
                        <Badge
                          variant="outline"
                          className="text-xs font-medium h-5 px-2"
                        >
                          {experience.location_type}
                        </Badge>
                      )}
                      {isActive && (
                        <Badge className="text-xs font-medium h-5 px-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20">
                          Aktif
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meta Info */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {experience.company_name && (
                <MetaItem
                  icon={<BuildingIcon className="size-3.5" />}
                  label="Perusahaan"
                  value={experience.company_name}
                />
              )}
              {experience.location && (
                <MetaItem
                  icon={<MapPinIcon className="size-3.5" />}
                  label="Lokasi"
                  value={experience.location}
                />
              )}
              {experience.employment_type && (
                <MetaItem
                  icon={<BriefcaseIcon className="size-3.5" />}
                  label="Tipe Pekerjaan"
                  value={experience.employment_type}
                />
              )}
              <MetaItem
                icon={<CalendarIcon className="size-3.5" />}
                label="Periode"
                value={`${formatDate(experience.start_date)} — ${
                  experience.end_date
                    ? formatDate(experience.end_date)
                    : "Sekarang"
                }`}
              />
              {durationMonths > 0 && (
                <MetaItem
                  icon={<ClockIcon className="size-3.5" />}
                  label="Durasi"
                  value={duration}
                />
              )}
              {experience.link_url && (
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Website
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="w-fit gap-1.5 h-8 text-xs"
                  >
                    <a
                      href={experience.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLinkIcon className="size-3" />
                      Kunjungi Website
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {/* Description */}
            {experience.description && (
              <>
                <Separator />
                <div className="flex flex-col gap-2.5">
                  <p className="text-sm font-medium">Deskripsi</p>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {experience.description}
                  </p>
                </div>
              </>
            )}
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
                  label="Durasi kerja"
                  value={durationMonths > 0 ? duration : "—"}
                />
                <StatRow
                  label="Status"
                  value={
                    <Badge
                      className={
                        isActive
                          ? "text-xs h-5 px-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : "text-xs h-5 px-2"
                      }
                      variant={isActive ? "outline" : "secondary"}
                    >
                      {isActive ? "Aktif" : "Selesai"}
                    </Badge>
                  }
                />
                <StatRow
                  label="Tipe"
                  value={experience.employment_type ?? "—"}
                />
                <StatRow
                  label="Mulai"
                  value={formatDateShort(experience.start_date) ?? "—"}
                />
                <StatRow
                  label="Selesai"
                  value={formatDateShort(experience.end_date)}
                />
              </CardContent>
            </Card>

            {/* Related Experiences Card — only show if there's data */}
            {relatedExperiences.length > 0 && (
              <Card className="border-border/60 shadow-sm">
                <CardHeader className="pb-3 pt-4 px-4">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <LayersIcon className="size-3.5" />
                    Pengalaman Lainnya
                    <Badge
                      variant="secondary"
                      className="ml-auto text-xs h-4 px-1.5 font-medium"
                    >
                      {relatedExperiences.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 flex flex-col gap-2">
                  {relatedExperiences.slice(0, 4).map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectRelated?.(rel)}
                      className="flex items-center gap-2.5 w-full text-left rounded-lg p-2 hover:bg-muted/60 transition-colors cursor-pointer group"
                    >
                      <Avatar className="size-8 rounded-lg border border-border/60 shrink-0">
                        <AvatarImage
                          src={rel.image_url}
                          alt={rel.company_name}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-lg bg-muted text-xs">
                          💼
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium truncate leading-snug group-hover:text-foreground transition-colors">
                          {rel.position}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {rel.company_name}
                        </p>
                      </div>
                      {rel.end_date === undefined || rel.end_date === null ? (
                        <div className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                      ) : null}
                    </button>
                  ))}
                  {relatedExperiences.length > 4 && (
                    <p className="text-xs text-muted-foreground text-center pt-1">
                      +{relatedExperiences.length - 4} lainnya
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <span className="flex items-center gap-1.5 text-sm text-foreground">
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
