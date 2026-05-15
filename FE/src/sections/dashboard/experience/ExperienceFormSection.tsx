import { useRef, useState } from "react";
import {
  ArrowLeftIcon,
  SaveIcon,
  Loader2Icon,
  ImageIcon,
  XIcon,
  SparklesIcon,
  Undo2Icon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  onGenerateDesc?: () => void;
  isGeneratingDesc?: boolean;
  onUndoDesc?: () => void;
  canUndoDesc?: boolean;
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
  onGenerateDesc,
  isGeneratingDesc,
  onUndoDesc,
  canUndoDesc,
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

  const isValid = !!values.position && !!values.company_name;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Header ── */}
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
                ? "Isi form untuk menambah pengalaman baru"
                : `Edit: ${initialData?.position} · ${initialData?.company_name}`}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={onSave}
          disabled={isSaving || !isValid}
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

      {/* ── Form card ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Informasi Experience
          </CardTitle>
          <CardDescription className="text-xs">
            Pengalaman kerja, magang, atau kontribusi organisasi
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* ── Kiri: logo + posisi + perusahaan + link ── */}
            <div className="flex flex-col gap-5">
              {/* Logo upload */}
              <div className="grid gap-1.5">
                <Label>Logo Perusahaan</Label>
                {displayImage ? (
                  <div className="relative size-24 overflow-hidden rounded-xl border bg-muted">
                    <img
                      src={displayImage}
                      alt="logo"
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={removeThumb}
                      className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 hover:bg-black/80 transition-colors cursor-pointer"
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
                      "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-6 transition-colors text-center",
                      dragOver
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/40 hover:bg-muted/30",
                    )}
                  >
                    <ImageIcon className="size-6 text-muted-foreground/40" />
                    <div>
                      <p className="text-xs font-medium">
                        Upload logo perusahaan
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        JPG, PNG, WebP
                      </p>
                    </div>
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

              {/* Posisi */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-position">
                  Posisi <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="exp-position"
                  value={values.position ?? ""}
                  onChange={(e) => onChange("position", e.target.value)}
                />
              </div>

              {/* Perusahaan */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-company">
                  Nama Perusahaan <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="exp-company"
                  value={values.company_name ?? ""}
                  onChange={(e) => onChange("company_name", e.target.value)}
                />
              </div>

              {/* Link */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-link">Link Perusahaan</Label>
                <Input
                  id="exp-link"
                  placeholder="https://company.com"
                  value={values.link_url ?? ""}
                  onChange={(e) => onChange("link_url", e.target.value)}
                />
              </div>
            </div>

            {/* ── Kanan: tipe + lokasi + tanggal + deskripsi ── */}
            <div className="flex flex-col gap-5">
              {/* Tipe pekerjaan + tipe lokasi — 1 row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label>
                    Tipe Pekerjaan <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={values.employment_type ?? ""}
                    onValueChange={(v) => onChange("employment_type", v)}
                  >
                    <SelectTrigger className="w-full text-sm">
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMPLOYMENT_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1.5">
                  <Label>
                    Tipe Lokasi <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={values.location_type ?? ""}
                    onValueChange={(v) => onChange("location_type", v)}
                  >
                    <SelectTrigger className="w-full text-sm">
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATION_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Lokasi */}
              <div className="grid gap-1.5">
                <Label htmlFor="exp-location">Lokasi</Label>
                <Input
                  id="exp-location"
                  placeholder="Jakarta, Indonesia"
                  value={values.location ?? ""}
                  onChange={(e) => onChange("location", e.target.value)}
                />
              </div>

              {/* Tanggal mulai + selesai — 1 row */}
              <div className="grid gap-1.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="exp-start">
                      Mulai <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="exp-start"
                      type="date"
                      value={values.start_date ?? ""}
                      onChange={(e) => onChange("start_date", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="exp-end">Selesai</Label>
                    <Input
                      id="exp-end"
                      type="date"
                      value={values.end_date ?? ""}
                      onChange={(e) => onChange("end_date", e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Kosongkan tanggal selesai jika masih aktif
                </p>
              </div>

              {/* Deskripsi */}
              <div className="grid gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="exp-desc">Deskripsi</Label>
                  {onGenerateDesc && (
                    <div className="flex items-center gap-1.5">
                      {canUndoDesc && onUndoDesc && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-1.5 h-7 text-xs cursor-pointer"
                          onClick={onUndoDesc}
                        >
                          <Undo2Icon className="size-3" />
                          Undo
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5 h-7 text-xs cursor-pointer"
                        onClick={onGenerateDesc}
                        disabled={isGeneratingDesc}
                      >
                        <SparklesIcon className="size-3" />
                        Generate Description with AI
                      </Button>
                    </div>
                  )}
                </div>

                {isGeneratingDesc ? (
                  <div
                    className="relative rounded-md border overflow-hidden"
                    style={{ minHeight: "120px" }}
                  >
                    <Skeleton className="absolute inset-0 rounded-md" />
                    <Skeleton
                      className="absolute inset-0 rounded-md opacity-60"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <div
                      className="relative z-10 flex flex-col items-center justify-center gap-2 py-6"
                      style={{ minHeight: "120px" }}
                    >
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2Icon className="size-4 animate-spin text-primary" />
                        <span className="text-sm font-medium text-primary">
                          Sedang digenerate oleh AI...
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Mohon tunggu, AI sedang menyusun deskripsi untukmu
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Textarea
                      id="exp-desc"
                      placeholder="Deskripsikan tanggung jawab dan pencapaian kamu..."
                      value={values.description ?? ""}
                      onChange={(e) => onChange("description", e.target.value)}
                      className="resize-none"
                      style={{ minHeight: "120px" }}
                      maxLength={5000}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {(values.description ?? "").length}/5000
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
