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
import type { ExperienceResponse, UpdateExperienceRequest } from "@/@types";

interface ExperienceFormSectionProps {
  mode: "add" | "edit";
  initialData?: ExperienceResponse;
  onBack: () => void;
  onSave: () => void;
  values: UpdateExperienceRequest;
  onChange: (field: keyof UpdateExperienceRequest, value: string) => void;
  thumbnailFile: File | null;
  setThumbnailFile: (file: File | null) => void;
  thumbnailBlob: string | null;
  setThumbnailBlob: (blob: string | null) => void;
  isSaving: boolean;
}

const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Freelance",
  "Contract",
  "Internship",
  "Self-employed",
] as const;

const LOCATION_TYPES = ["Remote", "On-site", "Hybrid"] as const;

export function ExperienceFormSection({
  mode,
  initialData,
  onBack,
  onSave,
  values,
  onChange,
  setThumbnailFile,
  thumbnailBlob,
  setThumbnailBlob,
  isSaving,
}: ExperienceFormSectionProps) {
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

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
              {mode === "add" ? "Tambah Experience" : "Edit Experience"}
            </p>
            <p className="text-xs text-muted-foreground">
              {mode === "add"
                ? "Isi form untuk menambah experience baru"
                : `Edit: ${initialData?.position} at ${initialData?.company_name}`}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={onSave}
          disabled={isSaving || !values.position || !values.company_name}
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

      {/* Form card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Informasi Experience
          </CardTitle>
          <CardDescription className="text-xs">
            Pengalaman kerja yang ingin ditampilkan di portofolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* ── Kiri ── */}
            <div className="flex flex-col gap-4">
              {/* Image upload */}
              <div className="grid gap-1.5">
                <Label>Logo Perusahaan</Label>
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

              {/* Position */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-position">
                  Posisi <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="exp-position"
                  placeholder="Frontend Developer"
                  value={values.position ?? ""}
                  onChange={(e) => onChange("position", e.target.value)}
                />
              </div>

              {/* Company */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-company">
                  Nama Perusahaan <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="exp-company"
                  placeholder="PT Teknologi Indonesia"
                  value={values.company_name ?? ""}
                  onChange={(e) => onChange("company_name", e.target.value)}
                />
              </div>

              {/* Link URL */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-link">Link Perusahaan</Label>
                <Input
                  id="exp-link"
                  placeholder="https://..."
                  value={values.link_url ?? ""}
                  onChange={(e) => onChange("link_url", e.target.value)}
                />
              </div>
            </div>

            {/* ── Kanan ── */}
            <div className="flex flex-col gap-4">
              {/* Employment type */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-employment-type">Tipe Pekerjaan</Label>
                <select
                  id="exp-employment-type"
                  value={values.employment_type ?? ""}
                  onChange={(e) => onChange("employment_type", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Pilih tipe pekerjaan</option>
                  {EMPLOYMENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location type */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-location-type">Tipe Lokasi</Label>
                <select
                  id="exp-location-type"
                  value={values.location_type ?? ""}
                  onChange={(e) => onChange("location_type", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Pilih tipe lokasi</option>
                  {LOCATION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-location">Lokasi</Label>
                <Input
                  id="exp-location"
                  placeholder="Jakarta, Indonesia"
                  value={values.location ?? ""}
                  onChange={(e) => onChange("location", e.target.value)}
                />
              </div>

              {/* Start date */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-start">
                  Tanggal Mulai <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="exp-start"
                  type="date"
                  value={values.start_date ?? ""}
                  onChange={(e) => onChange("start_date", e.target.value)}
                />
              </div>

              {/* End date */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-end">Tanggal Selesai</Label>
                <Input
                  id="exp-end"
                  type="date"
                  value={values.end_date ?? ""}
                  onChange={(e) => onChange("end_date", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Kosongkan jika masih bekerja di sini
                </p>
              </div>

              {/* Description */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-desc">Deskripsi</Label>
                <Textarea
                  id="exp-desc"
                  placeholder="Deskripsi singkat tentang pekerjaan kamu..."
                  value={values.description ?? ""}
                  onChange={(e) => onChange("description", e.target.value)}
                  className="resize-none"
                  style={{ minHeight: "96px" }}
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {(values.description ?? "").length}/1000
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
