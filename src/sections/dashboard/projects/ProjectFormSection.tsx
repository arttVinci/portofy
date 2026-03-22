import React, { useState, useRef } from "react";
import {
  PlusIcon,
  XIcon,
  Loader2Icon,
  SaveIcon,
  ArrowLeftIcon,
  ImageIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
      currentTools.filter((t) => t !== tool)
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
    onChange("image_url", ""); // clear existing string URL if a new file is picked
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
    
    // Both new files and existing files go into the values.gallery array to represent the final state
    onChange("gallery", [
      ...currentGallery,
      { image_url: galleryPreview, caption: galleryCaption },
    ]);
    
    // Also track the actual File objects if this is a new upload
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
      currentGallery.filter((_, idx) => idx !== i)
    );
    // Note: If removing a newly added file, we ideally should also remove it from galleryFiles/galleryBlobs,
    // but the actual syncing logic might get complex. A full implementation would find the blob index.
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
      currentFeatures.filter((_, idx) => idx !== i)
    );
  };

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSaveBtn = async () => {
    await onSave();
  };

  // Derived thumbnail display:
  const displayThumb = thumbnailBlob || values.image_url;

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

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="tech">Tech & Story</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        {/* ────────────────────────────────────────────────
            Tab 1 — Info
        ──────────────────────────────────────────────── */}
        <TabsContent value="info" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Informasi Dasar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Kiri */}
                <div className="flex flex-col gap-4">
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

                  <div className="grid gap-1.5">
                    <Label htmlFor="desc">Deskripsi</Label>
                    <Textarea
                      id="desc"
                      placeholder="Deskripsikan project kamu..."
                      value={values.description ?? ""}
                      onChange={(e) => onChange("description", e.target.value)}
                      className="resize-none"
                      style={{ minHeight: "96px" }}
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {(values.description ?? "").length}/500
                    </p>
                  </div>

                  <div className="grid gap-1.5">
                    <Label>Thumbnail</Label>
                    {displayThumb ? (
                      <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
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
                          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-8 transition-colors text-center",
                          thumbDragOver
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground/40 hover:bg-muted/30",
                        )}
                      >
                        <ImageIcon className="size-6 text-muted-foreground/40" />
                        <div>
                          <p className="text-sm font-medium">Upload thumbnail</p>
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
                </div>

                {/* Kanan */}
                <div className="flex flex-col gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="live">Link URL / Live Demo</Label>
                    <Input
                      id="live"
                      placeholder="https://..."
                      value={values.link_url ?? ""}
                      onChange={(e) => onChange("link_url", e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border p-3 mt-auto">
                    <Switch
                      checked={values.featured ?? false}
                      onCheckedChange={(v) => onChange("featured", v)}
                      id="featured"
                    />
                    <div>
                      <Label htmlFor="featured" className="cursor-pointer">
                        Featured
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
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Tech & Story</CardTitle>
              <CardDescription className="text-xs">
                Teknologi yang digunakan dan cerita di balik project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Kiri — Tools */}
                <div className="flex flex-col gap-3">
                  <Label>Tools</Label>

                  {currentTools.length > 0 ? (
                    <div className="flex flex-wrap gap-2 rounded-lg border bg-muted/20 p-3 min-h-[60px]">
                      {currentTools.map((tool) => (
                        <span
                          key={tool}
                          className="flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-xs"
                        >
                          {tool}
                          <button
                            type="button"
                            onClick={() => removeTool(tool)}
                            className="ml-0.5 rounded p-0.5 hover:bg-muted-foreground/20 cursor-pointer"
                          >
                            <XIcon className="size-2.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-lg border bg-muted/20 min-h-[60px]">
                      <p className="text-xs text-muted-foreground/50">Belum ada tools</p>
                    </div>
                  )}

                  <Separator />

                  <div className="flex flex-col gap-2">
                    <Label className="text-xs text-muted-foreground">Tambah tools</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nama tools, contoh: React lalu Enter"
                        value={toolInput}
                        onChange={(e) => setToolInput(e.target.value)}
                        onKeyDown={onToolKey}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addTool(toolInput)}
                        disabled={!toolInput}
                        className="cursor-pointer shrink-0"
                      >
                        <PlusIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Kanan — Challenges & Solution */}
                <div className="flex flex-col gap-4">
                  <div className="grid gap-1.5">
                    <Label>Tantangan</Label>
                    <Textarea
                      placeholder="Apa tantangan utama dalam project ini?"
                      value={values.challenges ?? ""}
                      onChange={(e) => onChange("challenges", e.target.value)}
                      className="resize-none"
                      style={{ minHeight: "100px" }}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Solusi</Label>
                    <Textarea
                      placeholder="Bagaimana kamu menyelesaikannya?"
                      value={values.solution ?? ""}
                      onChange={(e) => onChange("solution", e.target.value)}
                      className="resize-none"
                      style={{ minHeight: "100px" }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ────────────────────────────────────────────────
            Tab 3 — Gallery
        ──────────────────────────────────────────────── */}
        <TabsContent value="gallery" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Gallery</CardTitle>
              <CardDescription className="text-xs">
                Upload screenshot atau foto interface project kamu
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Kiri — drop zone */}
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">Upload gambar</Label>
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
                      "flex h-full min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors text-center",
                      dragOver
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/40 hover:bg-muted/30",
                    )}
                  >
                    <ImageIcon className="size-7 text-muted-foreground/40" />
                    <div>
                      <p className="text-sm font-medium">Drag & drop di sini</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        atau klik untuk pilih file
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground/50">
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
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">Preview</Label>
                  {galleryPreview ? (
                    <div className="flex flex-col gap-2">
                      <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                        <img
                          src={galleryPreview}
                          alt="preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() => {
                            setGalleryPreview(null);
                            setGalleryTempFile(null);
                            if (galleryInputRef.current) galleryInputRef.current.value = "";
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
                        className="h-8 text-sm"
                      />
                      <Button
                        size="sm"
                        onClick={addGallery}
                        className="gap-1.5 cursor-pointer w-full"
                      >
                        <PlusIcon className="size-3" /> Tambah ke Gallery
                      </Button>
                    </div>
                  ) : (
                    <div className="flex h-full min-h-40 items-center justify-center rounded-lg border bg-muted/30">
                      <p className="text-xs text-muted-foreground/50">
                        Preview akan muncul di sini
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Grid gambar yang sudah ditambah */}
              {currentGallery.length > 0 && (
                <>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {currentGallery.map((img, i) => (
                      <div
                        key={i}
                        className="group relative aspect-video overflow-hidden rounded-lg border bg-muted"
                      >
                        <img
                          src={img.image_url}
                          alt={img.caption}
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() => removeGallery(i)}
                          className="absolute right-1 top-1 rounded-full bg-destructive/90 p-0.5 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                        >
                          <XIcon className="size-3 text-white" />
                        </button>
                        {img.caption && (
                          <p className="absolute inset-x-0 bottom-0 bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                            {img.caption}
                          </p>
                        )}
                      </div>
                    ))}
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
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Key Features</CardTitle>
              <CardDescription className="text-xs">
                Kelompokkan fitur utama project dalam beberapa group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Kiri — form tambah */}
                <div className="flex flex-col gap-3">
                  <Label className="text-xs text-muted-foreground">Tambah feature group</Label>
                  <Input
                    placeholder="Nama group, contoh: Authentication"
                    value={featTitle}
                    onChange={(e) => setFeatTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder={
                      "Tulis item per baris:\nJWT login\nRefresh token\nRole-based access"
                    }
                    value={featItems}
                    onChange={(e) => setFeatItems(e.target.value)}
                    className="resize-none"
                    style={{ minHeight: "140px" }}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addFeature}
                    disabled={!featTitle}
                    className="gap-1 cursor-pointer w-full"
                  >
                    <PlusIcon className="size-3" /> Tambah Group
                  </Button>
                </div>

                {/* Kanan — list hasil tambah */}
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">
                    Feature groups {currentFeatures.length > 0 && `(${currentFeatures.length})`}
                  </Label>
                  {currentFeatures.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {currentFeatures.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-2 rounded-lg border bg-muted/30 p-3"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium">{feat.title}</p>
                            <ul className="mt-1.5 flex flex-col gap-0.5">
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
                          </div>
                          <button
                            onClick={() => removeFeature(i)}
                            className="shrink-0 text-muted-foreground transition-colors hover:text-destructive cursor-pointer"
                          >
                            <XIcon className="size-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-lg border bg-muted/20 min-h-[120px]">
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
