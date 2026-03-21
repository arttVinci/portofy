import type { ProfileResponse } from "@/@types/entities/profile.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GlobeIcon, MapPinIcon } from "lucide-react";

interface ProfilePreviewCardProps {
  values: ProfileResponse;
  avatarUrl?: string;
  isPublic: boolean;
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

export function ProfilePreviewCard({
  values,
  avatarUrl,
  isPublic,
}: ProfilePreviewCardProps) {
  const initials = getInitials(values.full_name || "U");

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Preview
      </p>

      <Card className="overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-violet-500" />

        <CardContent className="p-5 flex flex-col gap-4">
          {/* Avatar + identity */}
          <div className="flex items-start gap-4">
            <Avatar className="size-14 rounded-xl shrink-0">
              <AvatarImage src={avatarUrl} alt={values.full_name} />
              <AvatarFallback className="rounded-xl text-base">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-base leading-tight truncate">
                {values.full_name || (
                  <span className="text-muted-foreground/40">
                    Nama belum diisi
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                {values.bio || (
                  <span className="text-muted-foreground/30">
                    Bio belum diisi
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Meta */}
          {(values.address || values.url_profile) && (
            <>
              <Separator />
              <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                {values.address && (
                  <span className="flex items-center gap-1.5">
                    <MapPinIcon className="size-3 shrink-0" />
                    {values.address}
                  </span>
                )}
                {values.url_profile && (
                  <span className="flex items-center gap-1.5">
                    <GlobeIcon className="size-3 shrink-0" />
                    portof.id/{values.url_profile}
                  </span>
                )}
              </div>
            </>
          )}

          {/* About */}
          {values.about && (
            <>
              <Separator />
              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {values.about}
              </p>
            </>
          )}

          {/* Tags */}
          {values.tags.length > 0 && (
            <>
              <Separator />
              <div className="flex flex-wrap gap-1.5">
                {values.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </>
          )}

          {/* Visibility status */}
          <Separator />
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={`size-1.5 rounded-full ${
                isPublic ? "bg-emerald-500" : "bg-muted-foreground/40"
              }`}
            />
            <span className="text-muted-foreground">
              {isPublic ? "Profil publik" : "Profil privat"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
