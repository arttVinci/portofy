import React, { useState, useRef } from "react";
import {
  PlusIcon,
  XIcon,
  Loader2Icon,
  SaveIcon,
  ArrowLeftIcon,
  ImageIcon,
  CheckCircle2Icon,
  CodeIcon,
  ImagePlayIcon,
  LayoutGridIcon,
  InfoIcon,
  SparklesIcon,
  Undo2Icon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FieldDescription } from "@/components/ui/field";
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { type ProjectResponse, type UpdateProjectRequest } from "@/@types";

interface ProjectFormSectionProps {
  mode: "add" | "edit";
  initialData?: ProjectResponse;
  onBack: () => void;
  onSave: () => void;
  values: UpdateProjectRequest;
  onChange: (field: keyof UpdateProjectRequest, value: any) => void;
  thumbnailFile: File | null;
  setThumbnailFile: React.Dispatch<React.SetStateAction<File | null>>;
  thumbnailBlob: string | null;
  setThumbnailBlob: React.Dispatch<React.SetStateAction<string | null>>;
  galleryFiles: File[];
  setGalleryFiles: React.Dispatch<React.SetStateAction<File[]>>;
  galleryBlobs: string[];
  setGalleryBlobs: React.Dispatch<React.SetStateAction<string[]>>;
  isSaving?: boolean;
  onGenerateDesc?: () => void;
  isGeneratingDesc?: boolean;
  onUndoDesc?: () => void;
  canUndoDesc?: boolean;
}

export function ProjectFormSection({
  mode,
  initialData,
  onBack,
  onSave,
  values,
  onChange,
  setThumbnailFile,
  thumbnailBlob,
  setThumbnailBlob,
  setGalleryFiles,
  setGalleryBlobs,
  isSaving = false,
  onGenerateDesc,
  isGeneratingDesc,
  onUndoDesc,
  canUndoDesc,
}: ProjectFormSectionProps) {
  // ── Tools / Tech Stack ──────────────────────────────────────────────────
  const [toolInput, setToolInput] = useState("");
  const currentTools = values.tools ?? [];
  const addTool = (raw: string) => {
    const tool = raw.trim();
    if (!tool || currentTools.includes(tool)) return;
    onChange("tools", [...currentTools, tool]);
    setToolInput("");
  };
  const removeTool = (tool: string) => {
    onChange(
      "tools",
      currentTools.filter((t) => t !== tool),
    );
  };
  const onToolKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTool(toolInput);
    }
  };

  // ── Thumbnail upload ─────────────────────────────────────────────────────
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const [thumbDragOver, setThumbDragOver] = useState(false);

  const handleThumbFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setThumbnailFile(file);
    setThumbnailBlob(URL.createObjectURL(file));
    onChange("image_url", thumbInputRef.current?.value);
  };
  const removeThumb = () => {
    setThumbnailFile(null);
    setThumbnailBlob(null);
    onChange("image_url", "");
    if (thumbInputRef.current) thumbInputRef.current.value = "";
  };

  // ── Gallery ───────────────────────────────────────────────────────────────
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [galleryPreview, setGalleryPreview] = useState<string | null>(null);
  const [galleryTempFile, setGalleryTempFile] = useState<File | null>(null);
  const [galleryCaption, setGalleryCaption] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const currentGallery = values.gallery ?? [];

  const handleGalleryFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setGalleryTempFile(file);
    setGalleryPreview(URL.createObjectURL(file));
  };

  const addGallery = () => {
    if (!galleryPreview) return;

    onChange("gallery", [
      ...currentGallery,
      { image_url: galleryPreview, caption: galleryCaption },
    ]);

    if (galleryTempFile) {
      setGalleryFiles((prev) => [...prev, galleryTempFile]);
      setGalleryBlobs((prev) => [...prev, galleryPreview]);
    }

    setGalleryPreview(null);
    setGalleryCaption("");
    setGalleryTempFile(null);
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const removeGallery = (i: number) => {
    onChange(
      "gallery",
      currentGallery.filter((_, idx) => idx !== i),
    );
  };

  // ── Features ──────────────────────────────────────────────────────────────
  const [featTitle, setFeatTitle] = useState("");
  const [featItems, setFeatItems] = useState("");
  const currentFeatures = values.features ?? [];

  const addFeature = () => {
    if (!featTitle) return;
    const items = featItems
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    onChange("features", [...currentFeatures, { title: featTitle, items }]);
    setFeatTitle("");
    setFeatItems("");
  };

  const removeFeature = (i: number) => {
    onChange(
      "features",
      currentFeatures.filter((_, idx) => idx !== i),
    );
  };

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSaveBtn = async () => {
    await onSave();
  };

  // Derived thumbnail display:
  const displayThumb = thumbnailBlob || values.image_url;

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
              {mode === "add" ? "Tambah Project" : "Edit Project"}
            </p>
            <p className="text-xs text-muted-foreground">
              {mode === "add"
                ? "Isi form untuk menambah project baru"
                : `Edit: ${initialData?.title}`}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={handleSaveBtn}
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

      {/* ── Tabs ── */}
      <Tabs defaultValue="info">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="info" className="gap-1.5 text-xs">
            <InfoIcon className="size-3.5" />
            Info
          </TabsTrigger>
          <TabsTrigger value="tech" className="gap-1.5 text-xs">
            <CodeIcon className="size-3.5" />
            Tools & Story
          </TabsTrigger>
          <TabsTrigger value="gallery" className="gap-1.5 text-xs">
            <ImagePlayIcon className="size-3.5" />
            Gallery
          </TabsTrigger>
          <TabsTrigger value="features" className="gap-1.5 text-xs">
            <SparklesIcon className="size-3.5" />
            Features
          </TabsTrigger>
        </TabsList>

        {/* ────────────────────────────────────────────────
            Tab 1 — Info
        ──────────────────────────────────────────────── */}
        <TabsContent value="info" className="mt-4">
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Informasi Dasar
              </CardTitle>
              <CardDescription className="text-xs">
                Detail dasar project yang akan ditampilkan di portofolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {/* ── Kiri: thumbnail + judul + deskripsi ── */}
                <div className="flex flex-col gap-5">
                  {/* Thumbnail */}
                  <div className="grid gap-1.5">
                    <Label>Thumbnail</Label>
                    {displayThumb ? (
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted">
                        <img
                          src={displayThumb}
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
                          setThumbDragOver(true);
                        }}
                        onDragLeave={() => setThumbDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setThumbDragOver(false);
                          const f = e.dataTransfer.files?.[0];
                          if (f) handleThumbFile(f);
                        }}
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-6 transition-colors text-center",
                          thumbDragOver
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground/40 hover:bg-muted/30",
                        )}
                      >
                        <ImageIcon className="size-6 text-muted-foreground/40" />
                        <div>
                          <p className="text-xs font-medium">
                            Upload thumbnail
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

                  {/* Judul */}
                  <div className="grid gap-1.5">
                    <Label htmlFor="title">
                      Judul Project <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="portof.id"
                      value={values.title ?? ""}
                      onChange={(e) => onChange("title", e.target.value)}
                    />
                  </div>

                  {/* Link */}
                  <div className="grid gap-1.5">
                    <Label htmlFor="live">Link URL / Live Demo</Label>
                    <Input
                      id="live"
                      placeholder="https://..."
                      value={values.link_url ?? ""}
                      onChange={(e) => onChange("link_url", e.target.value)}
                    />
                  </div>
                </div>

                {/* ── Kanan: deskripsi + featured ── */}
                <div className="flex flex-col gap-5">
                  {/* Deskripsi */}
                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="desc">Deskripsi</Label>
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
                            disabled={
                              isGeneratingDesc ||
                              !values.tools ||
                              values.tools.length === 0
                            }
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
                          id="desc"
                          placeholder="Deskripsikan project kamu..."
                          value={values.description ?? ""}
                          onChange={(e) =>
                            onChange("description", e.target.value)
                          }
                          className="resize-none"
                          style={{ minHeight: "120px" }}
                          maxLength={5000}
                        />
                        <div className="flex justify-between px-1">
                          <FieldDescription>
                            Harap mengisi form tools terlebih dahulu sebelum
                            menggunakan fitur Generate with AI
                          </FieldDescription>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Featured toggle */}
                  <div className="flex items-center gap-3 rounded-xl border border-border/60 p-4 bg-muted/20 mt-auto">
                    <Switch
                      checked={values.featured ?? false}
                      onCheckedChange={(v) => onChange("featured", v)}
                      id="featured"
                    />
                    <div>
                      <Label htmlFor="featured" className="cursor-pointer">
                        Featured Project
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Ditampilkan di bagian atas portofolio
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ────────────────────────────────────────────────
            Tab 2 — Tech & Story
        ──────────────────────────────────────────────── */}
        <TabsContent value="tech" className="mt-4">
          <div className="flex flex-col gap-4">
            {/* Tools Card */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <CodeIcon className="size-4 text-muted-foreground" />
                  Tools Stack
                </CardTitle>
                <CardDescription className="text-xs">
                  Teknologi dan tools yang digunakan dalam project
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Chips display */}
                {currentTools.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentTools.map((tool) => (
                      <Badge
                        key={tool}
                        variant="secondary"
                        className="gap-1.5 px-2.5 py-1 text-xs font-medium hover:bg-secondary/80 transition-colors"
                      >
                        {tool}
                        <button
                          type="button"
                          onClick={() => removeTool(tool)}
                          className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 cursor-pointer transition-colors"
                        >
                          <XIcon className="size-2.5" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/10 py-6 mb-4">
                    <p className="text-xs text-muted-foreground/50">
                      Belum ada tools ditambahkan
                    </p>
                  </div>
                )}

                <Separator className="mb-4" />

                {/* Add tool input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ketik nama tools lalu Enter (contoh: Adobe Photoshop, Canva, Figma)"
                    value={toolInput}
                    onChange={(e) => setToolInput(e.target.value)}
                    onKeyDown={onToolKey}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addTool(toolInput)}
                    disabled={!toolInput}
                    className="cursor-pointer shrink-0 gap-1.5"
                  >
                    <PlusIcon className="size-3.5" />
                    Tambah
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Challenges & Solution Card */}
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Cerita Project
                </CardTitle>
                <CardDescription className="text-xs">
                  Ceritakan tantangan dan solusi yang kamu temui
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label>Tantangan</Label>
                    <Textarea
                      placeholder="Apa tantangan utama dalam project ini?"
                      value={values.challenges ?? ""}
                      onChange={(e) => onChange("challenges", e.target.value)}
                      className="resize-none"
                      style={{ minHeight: "120px" }}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Solusi</Label>
                    <Textarea
                      placeholder="Bagaimana kamu menyelesaikannya?"
                      value={values.solution ?? ""}
                      onChange={(e) => onChange("solution", e.target.value)}
                      className="resize-none"
                      style={{ minHeight: "120px" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ────────────────────────────────────────────────
            Tab 3 — Gallery
        ──────────────────────────────────────────────── */}
        <TabsContent value="gallery" className="mt-4">
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ImagePlayIcon className="size-4 text-muted-foreground" />
                Gallery
                {currentGallery.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-auto text-xs h-5 px-2 font-medium"
                  >
                    {currentGallery.length} gambar
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-xs">
                Upload screenshot atau foto interface project kamu
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Kiri — drop zone */}
                <div className="flex flex-col gap-3">
                  <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Upload Gambar
                  </Label>
                  <div
                    onClick={() => galleryInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleGalleryFile(file);
                    }}
                    className={cn(
                      "flex h-full min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all text-center",
                      dragOver
                        ? "border-primary bg-primary/5 scale-[1.01]"
                        : "border-border hover:border-muted-foreground/40 hover:bg-muted/30",
                    )}
                  >
                    <div className="size-12 rounded-full bg-muted/50 flex items-center justify-center">
                      <ImageIcon className="size-6 text-muted-foreground/40" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Drag & drop di sini</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        atau klik untuk pilih file
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground/50">
                      JPG, PNG, WebP — maks 5MB
                    </p>
                  </div>
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleGalleryFile(f);
                    }}
                  />
                </div>

                {/* Kanan — preview */}
                <div className="flex flex-col gap-3">
                  <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Preview
                  </Label>
                  {galleryPreview ? (
                    <div className="flex flex-col gap-3">
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted">
                        <img
                          src={galleryPreview}
                          alt="preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() => {
                            setGalleryPreview(null);
                            setGalleryTempFile(null);
                            if (galleryInputRef.current)
                              galleryInputRef.current.value = "";
                          }}
                          className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 hover:bg-black/80 transition-colors cursor-pointer"
                        >
                          <XIcon className="size-3 text-white" />
                        </button>
                      </div>
                      <Input
                        placeholder="Caption (opsional)..."
                        value={galleryCaption}
                        onChange={(e) => setGalleryCaption(e.target.value)}
                        className="text-sm"
                      />
                      <Button
                        size="sm"
                        onClick={addGallery}
                        className="gap-1.5 cursor-pointer w-full"
                      >
                        <PlusIcon className="size-3.5" />
                        Tambah ke Gallery
                      </Button>
                    </div>
                  ) : (
                    <div className="flex h-full min-h-44 items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/10">
                      <div className="text-center">
                        <LayoutGridIcon className="size-6 text-muted-foreground/20 mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground/50">
                          Preview akan muncul di sini
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Grid gambar yang sudah ditambah */}
              {currentGallery.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                      Gambar Tersimpan
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {currentGallery.map((img, i) => (
                        <div
                          key={i}
                          className="group relative aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted"
                        >
                          <img
                            src={img.image_url}
                            alt={img.caption}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          <button
                            onClick={() => removeGallery(i)}
                            className="absolute right-1.5 top-1.5 rounded-full bg-destructive/90 p-1 opacity-0 transition-all group-hover:opacity-100 cursor-pointer"
                          >
                            <XIcon className="size-3 text-white" />
                          </button>
                          {img.caption && (
                            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 text-[10px] text-white font-medium">
                              {img.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ────────────────────────────────────────────────
            Tab 4 — Features
        ──────────────────────────────────────────────── */}
        <TabsContent value="features" className="mt-4">
          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <SparklesIcon className="size-4 text-muted-foreground" />
                Key Features
                {currentFeatures.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-auto text-xs h-5 px-2 font-medium"
                  >
                    {currentFeatures.length} group
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-xs">
                Kelompokkan fitur utama project dalam beberapa group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {/* Kiri — form tambah */}
                <div className="flex flex-col gap-4">
                  <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Tambah Feature Group
                  </Label>
                  <div className="grid gap-3">
                    <Input
                      placeholder="Nama group, contoh: Authentication"
                      value={featTitle}
                      onChange={(e) => setFeatTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder={
                        "Tulis item per baris:\n" +
                        "JWT login\n" +
                        "Refresh token\n" +
                        "Role-based access"
                      }
                      value={featItems}
                      onChange={(e) => setFeatItems(e.target.value)}
                      className="resize-none"
                      style={{ minHeight: "140px" }}
                    />
                    <Button
                      size="sm"
                      onClick={addFeature}
                      disabled={!featTitle}
                      className="gap-1.5 cursor-pointer w-full"
                    >
                      <PlusIcon className="size-3.5" />
                      Tambah Group
                    </Button>
                  </div>
                </div>

                {/* Kanan — list hasil tambah */}
                <div className="flex flex-col gap-3">
                  <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Feature Groups
                  </Label>
                  {currentFeatures.length > 0 ? (
                    <div className="flex flex-col gap-2.5">
                      {currentFeatures.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-2 rounded-xl border border-border/60 bg-muted/20 p-3.5 transition-colors hover:bg-muted/40"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold">
                              {feat.title}
                            </p>
                            {feat.items.length > 0 && (
                              <ul className="mt-2 flex flex-col gap-1">
                                {feat.items.map((item, j) => (
                                  <li
                                    key={j}
                                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                                  >
                                    <CheckCircle2Icon className="size-3 shrink-0 text-emerald-500" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <button
                            onClick={() => removeFeature(i)}
                            className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                          >
                            <XIcon className="size-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/10 py-10">
                      <LayoutGridIcon className="size-6 text-muted-foreground/20 mb-2" />
                      <p className="text-xs text-muted-foreground/50">
                        Belum ada feature group
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
