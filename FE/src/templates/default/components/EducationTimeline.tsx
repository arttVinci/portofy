import type { EducationResponse } from "@/@types";
import { GraduationCap, MapPin } from "lucide-react";

interface EducationTimelineProps {
  educations: EducationResponse[];
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "Present";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function EducationTimeline({ educations }: EducationTimelineProps) {
  if (!educations.length) return null;

  const sorted = [...educations].sort(
    (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  );

  return (
    <div className="relative space-y-8 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border/60">
      {sorted.map((edu) => (
        <div key={edu.id} className="relative">
          {/* Dot */}
          <div className="absolute -left-8 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-background">
            <GraduationCap size={12} className="text-[#00d4ff]" />
          </div>

          <div className="rounded-xl border border-border/40 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#00d4ff]/20 hover:shadow-lg">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {edu.image_url && (
                  <img
                    src={edu.image_url}
                    alt={edu.institution}
                    className="h-10 w-10 rounded-lg border border-border/40 object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree}
                    {edu.field_of_study ? ` — ${edu.field_of_study}` : ""}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:mt-0">
                <span className="rounded-full bg-muted/50 px-2.5 py-1">
                  {formatDate(edu.start_date)} — {formatDate(edu.end_date)}
                </span>
                {edu.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    {edu.location}
                  </span>
                )}
              </div>
            </div>

            {edu.grade && (
              <div className="mt-3">
                <span className="rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-2.5 py-0.5 text-xs text-[#00d4ff]">
                  GPA: {edu.grade}
                </span>
              </div>
            )}

            {edu.description && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {edu.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
