import { useRef, useState } from "react";
import {
  ArrowLeftIcon,
  SaveIcon,
  Loader2Icon,
  ImageIcon,
  XIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AchievementResponse, UpdateAchievementRequest } from "@/@types";

interface AchievementFormSectionProps {
  mode: "add" | "edit";
  initialData?: AchievementResponse;
  onBack: () => void;
  onSave: () => void;
  values: UpdateAchievementRequest;
  onChange: (field: keyof UpdateAchievementRequest, value: string) => void;
  thumbnailFile: File | null;
  setThumbnailFile: (file: File | null) => void;
  thumbnailBlob: string | null;
  setThumbnailBlob: (blob: string | null) => void;
  isSaving: boolean;
}

export function AchievementFormSection({
  mode,
  initialData,
  onBack,
  onSave,
  values,
  onChange,
  thumbnailFile,
  setThumbnailFile,
  thumbnailBlob,
  setThumbnailBlob,
  isSaving,
}: AchievementFormSectionProps) {
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  // Display: blob preview saat baru upload, fallback ke URL dari server
  const displayImage = thumbnailBlob ?? values.image_url ?? null;

  const handleThumbFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setThumbnailFile(file);
    setThumbnailBlob(URL.createObjectURL(file));
  };

  const removeThumb = () => {
    setThumbnailFile(null);
    setThumbnailBlob(null);
    onChange("image_url", "");
    if (thumbInputRef.current) thumbInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 cursor-pointer"
            onClick={onBack}
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
          <div>
            <p className="text-sm font-medium">
              {mode === "add" ? "Tambah Achievement" : "Edit Achievement"}
            </p>
            <p className="text-xs text-muted-foreground">
              {mode === "add"
                ? "Isi form untuk menambah achievement baru"
                : `Edit: ${initialData?.title}`}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={onSave}
          disabled={isSaving || !values.title}
          className="gap-2 shrink-0 cursor-pointer"
        >
          {isSaving ? (
            <Loader2Icon className="size-3.5 animate-spin" />
          ) : (
            <SaveIcon className="size-3.5" />
          )}
          {isSaving ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>

      {/* Form card — 2 kolom */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Informasi Achievement
          </CardTitle>
          <CardDescription className="text-xs">
            Penghargaan, sertifikasi, atau pencapaian yang ingin ditampilkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* ── Kiri: image + title + organization ── */}
            <div className="flex flex-col gap-4">
              {/* Image upload */}
              <div className="grid gap-1.5">
                <Label>Badge / Sertifikat</Label>
                {displayImage ? (
                  <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={displayImage}
                      alt="thumbnail"
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={removeThumb}
                      className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 hover:bg-black/80 transition-colors cursor-pointer"
                    >
                      <XIcon className="size-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => thumbInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const f = e.dataTransfer.files?.[0];
                      if (f) handleThumbFile(f);
                    }}
                    className={cn(
                      "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-8 transition-colors text-center",
                      dragOver
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/40 hover:bg-muted/30",
                    )}
                  >
                    <ImageIcon className="size-6 text-muted-foreground/40" />
                    <div>
                      <p className="text-sm font-medium">Upload gambar</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        atau klik untuk pilih file
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground/50">
                      JPG, PNG, WebP
                    </p>
                  </div>
                )}
                <input
                  ref={thumbInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleThumbFile(f);
                  }}
                />
              </div>

              {/* Title */}
              <div className="grid gap-1.5">
                <Label htmlFor="ach-title">
                  Judul / Nama <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="ach-title"
                  placeholder="AWS Certified Developer"
                  value={values.title ?? ""}
                  onChange={(e) => onChange("title", e.target.value)}
                />
              </div>

              {/* Organization */}
              <div className="grid gap-1.5">
                <Label htmlFor="ach-org">Organisasi / Penerbit</Label>
                <Input
                  id="ach-org"
                  placeholder="Amazon Web Services"
                  value={values.organization ?? ""}
                  onChange={(e) => onChange("organization", e.target.value)}
                />
              </div>
            </div>

            {/* ── Kanan: issued_date + credential_id + credential_url ── */}
            <div className="flex flex-col gap-4">
              {/* Issued date */}
              <div className="grid gap-1.5">
                <Label htmlFor="ach-date">Tanggal Terbit</Label>
                <Input
                  id="ach-date"
                  type="date"
                  value={values.issued_date ?? ""}
                  onChange={(e) => onChange("issued_date", e.target.value)}
                />
              </div>

              {/* Credential ID */}
              <div className="grid gap-1.5">
                <Label htmlFor="ach-cred-id">Credential ID</Label>
                <Input
                  id="ach-cred-id"
                  placeholder="ABC123XYZ"
                  value={values.credential_id ?? ""}
                  onChange={(e) => onChange("credential_id", e.target.value)}
                />
              </div>

              {/* Credential URL */}
              <div className="grid gap-1.5">
                <Label htmlFor="ach-cred-url">Credential URL</Label>
                <Input
                  id="ach-cred-url"
                  placeholder="https://www.credly.com/badges/..."
                  value={values.credential_url ?? ""}
                  onChange={(e) => onChange("credential_url", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Link verifikasi sertifikat (Credly, Coursera, dll)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
