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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { EducationResponse, UpdateEducationRequest } from "@/@types";

interface EducationFormSectionProps {
  mode: "add" | "edit";
  initialData?: EducationResponse;
  onBack: () => void;
  onSave: () => void;
  values: UpdateEducationRequest;
  onChange: (field: keyof UpdateEducationRequest, value: string) => void;
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

export function EducationFormSection({
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
}: EducationFormSectionProps) {
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

  const isValid = !!values.institution;

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
              {mode === "add" ? "Tambah Education" : "Edit Education"}
            </p>
            <p className="text-xs text-muted-foreground">
              {mode === "add"
                ? "Isi form untuk menambah education baru"
                : `Edit: ${initialData?.institution}`}
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
            Informasi Education
          </CardTitle>
          <CardDescription className="text-xs">
            Riwayat pendidikan yang ingin ditampilkan di portofolio
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* ── Kiri: logo + institusi + gelar + bidang studi ── */}
            <div className="flex flex-col gap-5">
              {/* Logo upload */}
              <div className="grid gap-1.5">
                <Label>Logo Institusi</Label>
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
                        Upload logo institusi
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

              {/* Institusi */}
              <div className="grid gap-1.5">
                <Label htmlFor="edu-institution">
                  Institusi <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="edu-institution"
                  placeholder="Universitas Indonesia"
                  value={values.institution ?? ""}
                  onChange={(e) => onChange("institution", e.target.value)}
                />
              </div>

              {/* Gelar / Jenjang */}
              <div className="grid gap-1.5">
                <Label htmlFor="edu-degree">
                  Gelar / Jenjang <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="edu-degree"
                  placeholder="Sarjana (S1)"
                  value={values.degree ?? ""}
                  onChange={(e) => onChange("degree", e.target.value)}
                />
              </div>

              {/* Bidang Studi */}
              <div className="grid gap-1.5">
                <Label htmlFor="edu-field">
                  Bidang Studi <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="edu-field"
                  placeholder="Teknik Informatika"
                  value={values.field_of_study ?? ""}
                  onChange={(e) => onChange("field_of_study", e.target.value)}
                />
              </div>
            </div>

            {/* ── Kanan: IPK + lokasi + tanggal + deskripsi ── */}
            <div className="flex flex-col gap-5">
              {/* IPK / Nilai */}
              <div className="grid gap-1.5">
                <Label htmlFor="edu-grade">IPK / Nilai</Label>
                <Input
                  id="edu-grade"
                  placeholder="3.85 / 4.00"
                  value={values.grade ?? ""}
                  onChange={(e) => onChange("grade", e.target.value)}
                />
              </div>

              {/* Lokasi */}
              <div className="grid gap-1.5">
                <Label htmlFor="edu-location">Lokasi</Label>
                <Input
                  id="edu-location"
                  placeholder="Jakarta, Indonesia"
                  value={values.location ?? ""}
                  onChange={(e) => onChange("location", e.target.value)}
                />
              </div>

              {/* Tanggal mulai + selesai — 1 row */}
              <div className="grid gap-1.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="edu-start">
                      Mulai <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="edu-start"
                      type="date"
                      value={values.start_date ?? ""}
                      onChange={(e) => onChange("start_date", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="edu-end">Selesai</Label>
                    <Input
                      id="edu-end"
                      type="date"
                      value={values.end_date ?? ""}
                      onChange={(e) => onChange("end_date", e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Kosongkan tanggal selesai jika masih berlangsung
                </p>
              </div>

              {/* Deskripsi */}
              <div className="grid gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="edu-desc">Deskripsi</Label>
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
                      id="edu-desc"
                      placeholder="Deskripsi singkat tentang pendidikan kamu..."
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
