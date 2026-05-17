import type { AchievementResponse } from "@/@types";
import { Award, ExternalLink, Calendar } from "lucide-react";

interface AchievementCardProps {
  achievement: AchievementResponse;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-[#00d4ff]/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted/20">
        {achievement.image_url ? (
          <img
            src={achievement.image_url}
            alt={achievement.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/30">
            <Award size={32} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold tracking-tight">{achievement.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {achievement.organization}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          {achievement.issued_date && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar size={12} />
              {formatDate(achievement.issued_date)}
            </span>
          )}

          {achievement.credential_url && (
            <a
              href={achievement.credential_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs font-medium text-[#00d4ff] transition-colors hover:text-[#00d4ff]/80"
            >
              <ExternalLink size={12} />
              Credential
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
