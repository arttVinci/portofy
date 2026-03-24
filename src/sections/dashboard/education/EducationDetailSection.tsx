import {
  ArrowLeftIcon,
  PencilIcon,
  CalendarIcon,
  MapPinIcon,
  GraduationCapIcon,
  BookOpenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { EducationResponse } from "@/@types";

interface EducationDetailSectionProps {
  education: EducationResponse;
  onBack: () => void;
  onEdit: (education: EducationResponse) => void;
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function EducationDetailSection({
  education,
  onBack,
  onEdit,
}: EducationDetailSectionProps) {
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
          {education.image_url ? (
            <img
              src={education.image_url}
              alt={education.institution}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-2xl select-none">🎓</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="text-xl font-semibold leading-tight">
                {education.institution}
              </h1>
              {education.degree && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {education.degree}
                  {education.field_of_study
                    ? ` — ${education.field_of_study}`
                    : ""}
                </p>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 shrink-0 cursor-pointer"
              onClick={() => onEdit(education)}
            >
              <PencilIcon className="size-3.5" /> Edit
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Meta grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {education.field_of_study && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Bidang Studi
            </p>
            <span className="flex items-center gap-1.5 text-sm">
              <BookOpenIcon className="size-3.5 text-muted-foreground shrink-0" />
              {education.field_of_study}
            </span>
          </div>
        )}

        {education.grade && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              IPK / Nilai
            </p>
            <span className="flex items-center gap-1.5 text-sm">
              <GraduationCapIcon className="size-3.5 text-muted-foreground shrink-0" />
              {education.grade}
            </span>
          </div>
        )}

        {education.location && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Lokasi
            </p>
            <span className="flex items-center gap-1.5 text-sm">
              <MapPinIcon className="size-3.5 text-muted-foreground shrink-0" />
              {education.location}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Periode
          </p>
          <span className="flex items-center gap-1.5 text-sm">
            <CalendarIcon className="size-3.5 text-muted-foreground shrink-0" />
            {formatDate(education.start_date)}
            {" — "}
            {education.end_date ? formatDate(education.end_date) : "Sekarang"}
          </span>
        </div>
      </div>

      {/* Description */}
      {education.description && (
        <>
          <Separator />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Deskripsi</p>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {education.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
