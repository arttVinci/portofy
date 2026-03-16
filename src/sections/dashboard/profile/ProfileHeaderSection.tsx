import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProfileAvatarUpload from "@/components/dashboard/profile/ProfileAvatarUpload";
import type { ProfileResponse } from "@/@types/entities/profile";

interface ProfileHeaderSectionProps {
  profile: ProfileResponse;
  username: string;
  email: string;
  avatarUrl: string | null;
  onAvatarSelect: (file: File, previewUrl: string) => void;
  onAvatarRemove: () => void;
}

export default function ProfileHeaderSection({
  profile,
  username,
  email,
  avatarUrl,
  onAvatarSelect,
  onAvatarRemove,
}: ProfileHeaderSectionProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 pt-6 sm:flex-row sm:items-start sm:gap-6">
        {/* Avatar */}
        <ProfileAvatarUpload
          preview={avatarUrl}
          onImageSelect={onAvatarSelect}
          onImageRemove={onAvatarRemove}
        />

        {/* Info */}
        <div className="flex flex-col items-center gap-1.5 sm:items-start sm:pt-1">
          <h2 className="text-lg font-semibold tracking-tight">
            {profile.full_name}
          </h2>
          <p className="text-sm text-muted-foreground">@{username}</p>
          <p className="text-sm text-muted-foreground">{email}</p>

          {profile.bio && (
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              {profile.bio}
            </p>
          )}

          {profile.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {profile.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
