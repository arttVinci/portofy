import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";
import { GlobeIcon, LockIcon } from "lucide-react";

interface ProfileVisibilityTabProps {
  username: string;
  isPublic: boolean;
  onTogglePublic: (val: boolean) => void;
}

export function ProfileVisibilityTab({
  username,
  isPublic,
  onTogglePublic,
}: ProfileVisibilityTabProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* ── Visibility toggle ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Visibilitas Profil
          </CardTitle>
          <CardDescription className="text-xs">
            Kontrol apakah portofolio kamu bisa dilihat publik
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              {isPublic ? (
                <GlobeIcon className="size-4 text-emerald-500" />
              ) : (
                <LockIcon className="size-4 text-muted-foreground" />
              )}
              <div>
                <p className="text-sm font-medium">
                  {isPublic ? "Profil Publik" : "Profil Privat"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isPublic
                    ? "Portofolio kamu bisa ditemukan dan dilihat siapapun"
                    : "Hanya kamu yang bisa melihat portofolio ini"}
                </p>
              </div>
            </div>
            <Switch checked={isPublic} onCheckedChange={onTogglePublic} />
          </div>

          {isPublic && (
            <div className="rounded-lg border bg-emerald-50 dark:bg-emerald-950/30 p-3 text-xs text-emerald-700 dark:text-emerald-400">
              Portofolio kamu dapat diakses di{" "}
              <span className="font-medium">
                https://portofy.net/{username}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
