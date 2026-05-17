import type { ExperienceResponse } from "@/@types";
import { Briefcase, MapPin } from "lucide-react";

interface ExperienceTimelineProps {
  experiences: ExperienceResponse[];
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "Present";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  if (!experiences.length) return null;

  const sorted = [...experiences].sort(
    (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  );

  return (
    <div className="relative space-y-8 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border/60">
      {sorted.map((exp) => (
        <div key={exp.id} className="relative">
          {/* Dot */}
          <div className="absolute -left-8 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-background">
            <Briefcase size={12} className="text-[#00d4ff]" />
          </div>

          <div className="rounded-xl border border-border/40 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#00d4ff]/20 hover:shadow-lg">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {exp.image_url && (
                  <img
                    src={exp.image_url}
                    alt={exp.company_name}
                    className="h-10 w-10 rounded-lg border border-border/40 object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exp.company_name}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:mt-0">
                <span className="rounded-full bg-muted/50 px-2.5 py-1">
                  {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                </span>
                {exp.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    {exp.location}
                  </span>
                )}
              </div>
            </div>

            {(exp.employment_type || exp.location_type) && (
              <div className="mt-3 flex gap-2">
                {exp.employment_type && (
                  <span className="rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-2.5 py-0.5 text-xs text-[#00d4ff]">
                    {exp.employment_type}
                  </span>
                )}
                {exp.location_type && (
                  <span className="rounded-full border border-border/40 bg-muted/30 px-2.5 py-0.5 text-xs text-muted-foreground">
                    {exp.location_type}
                  </span>
                )}
              </div>
            )}

            {exp.description && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {exp.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
