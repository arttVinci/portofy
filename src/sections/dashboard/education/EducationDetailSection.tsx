import {
  ArrowLeftIcon,
  PencilIcon,
  CalendarIcon,
  MapPinIcon,
  GraduationCapIcon,
  BookOpenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
    month: "short",
    year: "numeric",
  });
}

export function EducationDetailSection({
  education,
  onBack,
  onEdit,
}: EducationDetailSectionProps) {
  return (
    <div className="flex flex-col max-w-2xl py-8">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-opacity w-fit mb-8 cursor-pointer"
      >
        <ArrowLeftIcon className="size-3.5" />
        Kembali
      </button>

      {/* Header */}
      <div className="flex items-start gap-4 mb-7">
        <div className="size-16 shrink-0 overflow-hidden rounded-2xl border bg-muted flex items-center justify-center">
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

        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-lg font-medium leading-snug">
                {education.institution}
              </h1>
              {education.degree && (
                <p className="text-sm text-muted-foreground mt-1">
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
              <PencilIcon className="size-3" /> Edit
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t" />

      {/* Meta grid */}
      <div className="grid grid-cols-2 divide-x divide-y border-b">
        {education.field_of_study && (
          <div className="p-4">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-2">
              Bidang Studi
            </p>
            <span className="flex items-center gap-1.5 text-sm">
              <BookOpenIcon className="size-3.5 text-muted-foreground shrink-0" />
              {education.field_of_study}
            </span>
          </div>
        )}

        {education.grade && (
          <div className="p-4">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-2">
              IPK / Nilai
            </p>
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <GraduationCapIcon className="size-3.5 text-muted-foreground shrink-0" />
              {education.grade}
            </span>
          </div>
        )}

        {education.location && (
          <div className="p-4">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-2">
              Lokasi
            </p>
            <span className="flex items-center gap-1.5 text-sm">
              <MapPinIcon className="size-3.5 text-muted-foreground shrink-0" />
              {education.location}
            </span>
          </div>
        )}

        <div className="p-4">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-2">
            Periode
          </p>
          <span className="flex items-center gap-1.5 text-sm">
            <CalendarIcon className="size-3.5 text-muted-foreground shrink-0" />
            {formatDate(education.start_date)}
            <span className="text-muted-foreground">—</span>
            {education.end_date ? formatDate(education.end_date) : "Sekarang"}
          </span>
        </div>
      </div>

      {/* Description */}
      {education.description && (
        <div className="pt-6">
          <p className="text-sm font-medium mb-2.5">Deskripsi</p>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {education.description}
          </p>
        </div>
      )}
    </div>
  );
}
