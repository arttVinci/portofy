import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UploadIcon } from "lucide-react";

interface ProfileAvatarTabProps {
  fullName: string;
  avatarUrl?: string;
  preview: string;
  setAvatarPreviewUrl: (url: string) => void;
  setAvatarImageFile: (image: File) => void;
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

export function ProfileAvatarTab({
  fullName,
  avatarUrl,
  preview,
  setAvatarPreviewUrl,
  setAvatarImageFile,
}: ProfileAvatarTabProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarImageFile(file);
    setAvatarPreviewUrl(url);
  };

  const initials = getInitials(fullName);

  const displayUrl = preview || avatarUrl;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Foto Profil</CardTitle>
          <CardDescription className="text-xs">
            Foto akan ditampilkan di header portofolio publik kamu
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* ── Preview + actions ── */}
          <div className="flex items-center gap-5">
            <Avatar className="size-20 rounded-xl">
              <AvatarImage src={displayUrl} alt={fullName} />
              <AvatarFallback className="rounded-xl text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2 w-fit"
                onClick={() => inputRef.current?.click()}
              >
                <UploadIcon className="size-3.5" />
                {avatarUrl ? "Ganti Foto" : "Upload Foto"}
              </Button>

              <p className="text-xs text-muted-foreground">
                JPG, PNG, atau WebP. Maks 2MB.
              </p>
            </div>
          </div>

          <Separator />

          {/* Hidden file input */}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFile}
          />
        </CardContent>
      </Card>
    </div>
  );
}
