import { useRef, useState } from "react";
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
import { UploadIcon, Trash2Icon, UserIcon } from "lucide-react";
import type { ProfileFormValues } from "@/@types/entities/profile";

interface ProfileAvatarTabProps {
  values: ProfileFormValues;
  /** URL avatar saat ini dari server (beda dari preview lokal) */
  avatarUrl?: string;
  onAvatarChange: (file: File) => void;
  onAvatarRemove: () => void;
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
  values,
  avatarUrl,
  onAvatarChange,
  onAvatarRemove,
}: ProfileAvatarTabProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onAvatarChange(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    onAvatarRemove();
  };

  const displayUrl = preview ?? avatarUrl;
  const initials = getInitials(values.full_name || "U");

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
              <AvatarImage src={displayUrl} alt={values.full_name} />
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
                {displayUrl ? "Ganti Foto" : "Upload Foto"}
              </Button>

              {displayUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-2 w-fit text-destructive hover:text-destructive"
                  onClick={handleRemove}
                >
                  <Trash2Icon className="size-3.5" />
                  Hapus Foto
                </Button>
              )}

              <p className="text-xs text-muted-foreground">
                JPG, PNG, atau WebP. Maks 2MB.
              </p>
            </div>
          </div>

          <Separator />

          {/* ── Drag & drop zone ── */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`
              flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed
              p-8 cursor-pointer transition-colors text-center
              ${
                dragOver
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/40 hover:bg-muted/30"
              }
            `}
          >
            <UserIcon className="size-8 text-muted-foreground/40" />
            <div>
              <p className="text-sm font-medium">Drag & drop foto di sini</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                atau klik untuk pilih dari perangkat
              </p>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleInputChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
