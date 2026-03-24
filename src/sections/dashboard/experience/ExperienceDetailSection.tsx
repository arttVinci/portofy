import {
  ArrowLeftIcon,
  PencilIcon,
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  BuildingIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ExperienceResponse } from "@/@types";

interface ExperienceDetailSectionProps {
  experience: ExperienceResponse;
  onBack: () => void;
  onEdit: (experience: ExperienceResponse) => void;
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ExperienceDetailSection({
  experience,
  onBack,
  onEdit,
}: ExperienceDetailSectionProps) {
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
        {/* Logo */}
        <div className="size-16 shrink-0 overflow-hidden rounded-xl border bg-muted flex items-center justify-center">
          {experience.image_url ? (
            <img
              src={experience.image_url}
              alt={experience.company_name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-2xl select-none">💼</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="text-xl font-semibold leading-tight">
                {experience.position}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {experience.company_name}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 shrink-0 cursor-pointer"
              onClick={() => onEdit(experience)}
            >
              <PencilIcon className="size-3.5" /> Edit
            </Button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {experience.employment_type && (
              <Badge variant="secondary">{experience.employment_type}</Badge>
            )}
            {experience.location_type && (
              <Badge variant="outline">{experience.location_type}</Badge>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Meta grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {experience.company_name && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Perusahaan
            </p>
            <span className="flex items-center gap-1.5 text-sm">
              <BuildingIcon className="size-3.5 text-muted-foreground shrink-0" />
              {experience.company_name}
            </span>
          </div>
        )}

        {experience.location && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Lokasi
            </p>
            <span className="flex items-center gap-1.5 text-sm">
              <MapPinIcon className="size-3.5 text-muted-foreground shrink-0" />
              {experience.location}
            </span>
          </div>
        )}

        {experience.employment_type && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Tipe Pekerjaan
            </p>
            <span className="flex items-center gap-1.5 text-sm">
              <BriefcaseIcon className="size-3.5 text-muted-foreground shrink-0" />
              {experience.employment_type}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Periode
          </p>
          <span className="flex items-center gap-1.5 text-sm">
            <CalendarIcon className="size-3.5 text-muted-foreground shrink-0" />
            {formatDate(experience.start_date)}
            {" — "}
            {experience.end_date
              ? formatDate(experience.end_date)
              : "Sekarang"}
          </span>
        </div>

        {experience.link_url && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Website
            </p>
            <Button
              size="sm"
              variant="outline"
              asChild
              className="w-fit gap-1.5"
            >
              <a
                href={experience.link_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="size-3.5" />
                Kunjungi
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Description */}
      {experience.description && (
        <>
          <Separator />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Deskripsi</p>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {experience.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
