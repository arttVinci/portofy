import { Link } from "react-router-dom";
import {
  MapPinIcon,
  PencilIcon,
  SparklesIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardAction,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProfileResponse } from "@/@types/entities/profile.types";
import type { SkillResponse } from "@/@types/entities/skill.types";

interface HeroProfileCardProps {
  profile: ProfileResponse;
  skills: SkillResponse[];
  completionPercent: number;
  completionLabel: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const LEVEL_COLORS: Record<string, string> = {
  Beginner:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  Intermediate:
    "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Advanced:
    "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  Expert:
    "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
};

export function HeroProfileCard({
  profile,
  skills,
  completionPercent,
  completionLabel,
}: HeroProfileCardProps) {
  const initials = getInitials(profile.full_name || "U");
  const isComplete = completionPercent === 100;

  return (
    <Card className="overflow-hidden">
      {/* Gradient accent bar */}
      <div className="h-0.5 w-full bg-blue-500" />

      <CardHeader>
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="size-16 rounded-xl shrink-0 ring-2 ring-background shadow-lg">
            <AvatarImage
              src={profile.image_url}
              alt={profile.full_name}
              className="rounded-xl"
            />
            <AvatarFallback className="rounded-xl text-lg font-semibold bg-gradient-to-br from-blue-500 to-violet-500 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Identity */}
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold leading-tight truncate">
              {profile.full_name || (
                <span className="text-muted-foreground/40">
                  Nama belum diisi
                </span>
              )}
            </h2>

            {/* Profile tags */}
            {profile.tags && profile.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {profile.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[11px] font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Bio */}
            {profile.bio && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Address */}
            {profile.address && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                <MapPinIcon className="size-3 shrink-0" />
                <span>{profile.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Edit button */}
        <CardAction>
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <Link to="/app/profile">
              <PencilIcon className="size-3" />
              Edit
            </Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Profile Completeness */}
        <div className="rounded-lg border bg-muted/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Kelengkapan Profil
            </span>
            <Badge
              variant={isComplete ? "default" : "secondary"}
              className={cn(
                "text-[11px]",
                isComplete &&
                  "bg-emerald-500 hover:bg-emerald-500 text-white",
              )}
            >
              {completionPercent}%
            </Badge>
          </div>
          <Progress
            value={completionPercent}
            className={cn(
              "h-1.5",
              isComplete && "[&>div]:bg-emerald-500",
            )}
          />
          <p className="text-[11px] text-muted-foreground mt-1.5">
            {completionLabel}
          </p>
        </div>

        <Separator />

        {/* Skills */}
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <SparklesIcon className="size-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Skills
            </span>
          </div>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="outline"
                  className={cn(
                    "text-[11px] font-medium border-0",
                    LEVEL_COLORS[skill.level] || LEVEL_COLORS.Beginner,
                  )}
                >
                  {skill.title}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground/50">
              Belum ada skill ditambahkan
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
