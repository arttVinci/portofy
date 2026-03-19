import { useState, useRef } from "react";
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
import { Input }     from "@/components/ui/input";
import { Label }     from "@/components/ui/label";
import { Textarea }  from "@/components/ui/textarea";
import { Button }    from "@/components/ui/button";
import { Badge }     from "@/components/ui/badge";
import { Switch }    from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn }        from "@/lib/utils";
import {
  type ProjectFormValues,
  PROJECT_FORM_DEFAULT,
  type ProjectResponse,
  type TechItem,
} from "@/@types/entities/project";

interface ProjectFormSectionProps {
  mode:          "add" | "edit";
  initialData?:  ProjectResponse;
  onBack:        () => void;
  onSave:        (values: ProjectFormValues) => void;
}

export function ProjectFormSection({
  mode,
  initialData,
  onBack,
  onSave,
}: ProjectFormSectionProps) {
  const [values, setValues] = useState<ProjectFormValues>(
    initialData
      ? {
          title:       initialData.title,
          description: initialData.description,
          image:       initialData.image,
          githubUrl:   initialData.github_url,
          liveUrl:     initialData.live_url,
          challenges:  initialData.challenges,
          solution:    initialData.solution,
          featured:    initialData.featured,
          tags:        initialData.tags,
          techStack:   initialData.tech_stack,
          gallery:     initialData.gallery,
          features:    initialData.features,
        }
      : PROJECT_FORM_DEFAULT,
  );
  const [isSaving, setIsSaving] = useState(false);

  const set = <K extends keyof ProjectFormValues>(
    key: K,
    val: ProjectFormValues[K],
  ) => setValues((prev) => ({ ...prev, [key]: val }));

  // ── Tags ─────────────────────────────────────────────────────────────────
  const [tagInput, setTagInput] = useState("");
  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase().replace(/\s+/g, "-");
    if (!tag || values.tags.includes(tag)) return;
    set("tags", [...values.tags, tag]);
    setTagInput("");
  };
  const removeTag = (tag: string) =>
    set("tags", values.tags.filter((t) => t !== tag));
  const onTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(tagInput); }
    if (e.key === "Backspace" && !tagInput) removeTag(values.tags[values.tags.length - 1]);
  };

  // ── Tech Stack ────────────────────────────────────────────────────────────
  const [techInput, setTechInput] = useState<Partial<TechItem>>({
    name: "", icon: "", color: "#888888",
  });
  const addTech = () => {
    if (!techInput.name) return;
    set("techStack", [
      ...values.techStack,
      { name: techInput.name, icon: techInput.icon ?? "", color: techInput.color ?? "#888888" },
    ]);
    setTechInput({ name: "", icon: "", color: "#888888" });
  };
  const removeTech = (name: string) =>
    set("techStack", values.techStack.filter((t) => t.name !== name));

  // ── Thumbnail upload ─────────────────────────────────────────────────────
  const thumbInputRef                     = useRef<HTMLInputElement>(null);
  const [thumbDragOver, setThumbDragOver] = useState(false);

  const handleThumbFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    set("image", URL.createObjectURL(file));
  };
  const removeThumb = () => {
    set("image", "");
    if (thumbInputRef.current) thumbInputRef.current.value = "";
  };

  // ── Gallery ───────────────────────────────────────────────────────────────
  const galleryInputRef                     = useRef<HTMLInputElement>(null);
  const [galleryPreview, setGalleryPreview] = useState<string | null>(null);
  const [galleryCaption, setGalleryCaption] = useState("");
  const [dragOver,       setDragOver]       = useState(false);

  const handleGalleryFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setGalleryPreview(URL.createObjectURL(file));
  };
  const addGallery = () => {
    if (!galleryPreview) return;
    set("gallery", [...values.gallery, { image: galleryPreview, caption: galleryCaption }]);
    setGalleryPreview(null);
    setGalleryCaption("");
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };
  const removeGallery = (i: number) =>
    set("gallery", values.gallery.filter((_, idx) => idx !== i));

  // ── Features ──────────────────────────────────────────────────────────────
  const [featTitle, setFeatTitle] = useState("");
  const [featItems, setFeatItems] = useState("");
  const addFeature = () => {
    if (!featTitle) return;
    const items = featItems.split("\n").map((s) => s.trim()).filter(Boolean);
    set("features", [...values.features, { title: featTitle, items }]);
    setFeatTitle(""); setFeatItems("");
  };
  const removeFeature = (i: number) =>
    set("features", values.features.filter((_, idx) => idx !== i));

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    onSave(values);
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="size-8 shrink-0 cursor-pointer" onClick={onBack}>
            <ArrowLeftIcon className="size-4" />
          </Button>
          <div>
            <p className="text-sm font-medium">
              {mode === "add" ? "Tambah Project" : "Edit Project"}
            </p>
            <p className="text-xs text-muted-foreground">
              {mode === "add" ? "Isi form untuk menambah project baru" : `Edit: ${initialData?.title}`}
            </p>
          </div>
        </div>
        <Button size="sm" onClick={handleSave} disabled={isSaving || !values.title}
          className="gap-2 shrink-0 cursor-pointer">
          {isSaving ? <Loader2Icon className="size-3.5 animate-spin" /> : <SaveIcon className="size-3.5" />}
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
            Kiri: judul, deskripsi, thumbnail
            Kanan: links, tags, featured
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
                    <Input id="title" placeholder="portof.id" value={values.title}
                      onChange={(e) => set("title", e.target.value)} />
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="desc">Deskripsi</Label>
                    <Textarea id="desc" placeholder="Deskripsikan project kamu..."
                      value={values.description}
                      onChange={(e) => set("description", e.target.value)}
                      className="resize-none" style={{ minHeight: "96px" }}
                      maxLength={500} />
                    <p className="text-xs text-muted-foreground text-right">
                      {values.description.length}/500
                    </p>
                  </div>

                  <div className="grid gap-1.5">
                    <Label>Thumbnail</Label>
                    {values.image ? (
                      <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                        <img src={values.image} alt="thumbnail" className="h-full w-full object-cover" />
                        <button onClick={removeThumb}
                          className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 hover:bg-black/80 transition-colors cursor-pointer">
                          <XIcon className="size-3 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => thumbInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setThumbDragOver(true); }}
                        onDragLeave={() => setThumbDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault(); setThumbDragOver(false);
                          const f = e.dataTransfer.files?.[0];
                          if (f) handleThumbFile(f);
                        }}
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-8 transition-colors text-center",
                          thumbDragOver ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/40 hover:bg-muted/30"
                        )}
                      >
                        <ImageIcon className="size-6 text-muted-foreground/40" />
                        <div>
                          <p className="text-sm font-medium">Upload thumbnail</p>
                          <p className="text-xs text-muted-foreground mt-0.5">atau klik untuk pilih file</p>
                        </div>
                        <p className="text-xs text-muted-foreground/50">JPG, PNG, WebP</p>
                      </div>
                    )}
                    <input ref={thumbInputRef} type="file"
                      accept="image/jpeg,image/png,image/webp" className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handleThumbFile(f); }} />
                  </div>
                </div>

                {/* Kanan */}
                <div className="flex flex-col gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input id="github" placeholder="https://github.com/..." value={values.githubUrl}
                      onChange={(e) => set("githubUrl", e.target.value)} />
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="live">Live Demo URL</Label>
                    <Input id="live" placeholder="https://..." value={values.liveUrl}
                      onChange={(e) => set("liveUrl", e.target.value)} />
                  </div>

                  <div className="grid gap-2">
                    <Label>Tags</Label>
                    {values.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {values.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1 pl-2.5 pr-1">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)}
                              className="rounded hover:bg-muted-foreground/20 p-0.5 cursor-pointer">
                              <XIcon className="size-2.5" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Input placeholder="Tambah tag lalu tekan Enter..."
                      value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={onTagKey} />
                    <p className="text-xs text-muted-foreground">
                      Tekan <kbd className="px-1 py-0.5 rounded border text-[10px]">Enter</kbd>{" "}
                      atau <kbd className="px-1 py-0.5 rounded border text-[10px]">,</kbd> untuk tambah
                    </p>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border p-3 mt-auto">
                    <Switch checked={values.featured}
                      onCheckedChange={(v) => set("featured", v)} id="featured" />
                    <div>
                      <Label htmlFor="featured" className="cursor-pointer">Featured</Label>
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
            Kiri: tech stack input + badges
            Kanan: challenges & solution
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

                {/* Kiri — Tech Stack */}
                <div className="flex flex-col gap-3">
                  <Label>Tech Stack</Label>

                  {/* Added badges */}
                  {values.techStack.length > 0 ? (
                    <div className="flex flex-wrap gap-2 rounded-lg border bg-muted/20 p-3 min-h-[60px]">
                      {values.techStack.map((tech) => (
                        <span key={tech.name}
                          className="flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-xs"
                          style={{ borderColor: tech.color + "50" }}>
                          <span className="size-1.5 rounded-full shrink-0" style={{ background: tech.color }} />
                          {tech.name}
                          <button type="button" onClick={() => removeTech(tech.name)}
                            className="ml-0.5 rounded p-0.5 hover:bg-muted-foreground/20 cursor-pointer">
                            <XIcon className="size-2.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-lg border bg-muted/20 min-h-[60px]">
                      <p className="text-xs text-muted-foreground/50">Belum ada tech stack</p>
                    </div>
                  )}

                  <Separator />

                  {/* Input row */}
                  <div className="flex flex-col gap-2">
                    <Label className="text-xs text-muted-foreground">Tambah teknologi</Label>
                    <Input placeholder="Nama, contoh: React" value={techInput.name}
                      onChange={(e) => setTechInput((p) => ({ ...p, name: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && addTech()} />
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 flex-1 items-center gap-2 rounded-md border px-3">
                        <input type="color" value={techInput.color}
                          onChange={(e) => setTechInput((p) => ({ ...p, color: e.target.value }))}
                          className="size-4 cursor-pointer rounded border-none bg-transparent shrink-0" />
                        <span className="font-mono text-xs text-muted-foreground">{techInput.color}</span>
                      </div>
                      <Button size="sm" variant="outline" onClick={addTech}
                        disabled={!techInput.name} className="gap-1 cursor-pointer shrink-0">
                        <PlusIcon className="size-3" /> Tambah
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Kanan — Challenges & Solution */}
                <div className="flex flex-col gap-4">
                  <div className="grid gap-1.5">
                    <Label>Tantangan</Label>
                    <Textarea placeholder="Apa tantangan utama dalam project ini?"
                      value={values.challenges}
                      onChange={(e) => set("challenges", e.target.value)}
                      className="resize-none" style={{ minHeight: "100px" }} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Solusi</Label>
                    <Textarea placeholder="Bagaimana kamu menyelesaikannya?"
                      value={values.solution}
                      onChange={(e) => set("solution", e.target.value)}
                      className="resize-none" style={{ minHeight: "100px" }} />
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ────────────────────────────────────────────────
            Tab 3 — Gallery
            Kiri: drag & drop upload
            Kanan: preview + caption + konfirmasi
            Bawah: grid hasil upload
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
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault(); setDragOver(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleGalleryFile(file);
                    }}
                    className={cn(
                      "flex h-full min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors text-center",
                      dragOver ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/40 hover:bg-muted/30"
                    )}
                  >
                    <ImageIcon className="size-7 text-muted-foreground/40" />
                    <div>
                      <p className="text-sm font-medium">Drag & drop di sini</p>
                      <p className="text-xs text-muted-foreground mt-0.5">atau klik untuk pilih file</p>
                    </div>
                    <p className="text-xs text-muted-foreground/50">JPG, PNG, WebP — maks 5MB</p>
                  </div>
                  <input ref={galleryInputRef} type="file"
                    accept="image/jpeg,image/png,image/webp" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleGalleryFile(f); }} />
                </div>

                {/* Kanan — preview */}
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">Preview</Label>
                  {galleryPreview ? (
                    <div className="flex flex-col gap-2">
                      <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                        <img src={galleryPreview} alt="preview" className="h-full w-full object-cover" />
                        <button
                          onClick={() => { setGalleryPreview(null); if (galleryInputRef.current) galleryInputRef.current.value = ""; }}
                          className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 hover:bg-black/80 transition-colors cursor-pointer">
                          <XIcon className="size-3 text-white" />
                        </button>
                      </div>
                      <Input placeholder="Caption (opsional)..." value={galleryCaption}
                        onChange={(e) => setGalleryCaption(e.target.value)} className="h-8 text-sm" />
                      <Button size="sm" onClick={addGallery} className="gap-1.5 cursor-pointer w-full">
                        <PlusIcon className="size-3" /> Tambah ke Gallery
                      </Button>
                    </div>
                  ) : (
                    <div className="flex h-full min-h-40 items-center justify-center rounded-lg border bg-muted/30">
                      <p className="text-xs text-muted-foreground/50">Preview akan muncul di sini</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Grid gambar yang sudah ditambah */}
              {values.gallery.length > 0 && (
                <>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {values.gallery.map((img, i) => (
                      <div key={i} className="group relative aspect-video overflow-hidden rounded-lg border bg-muted">
                        <img src={img.image} alt={img.caption} className="h-full w-full object-cover" />
                        <button onClick={() => removeGallery(i)}
                          className="absolute right-1 top-1 rounded-full bg-destructive/90 p-0.5 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer">
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
            Kiri: form input (judul + items)
            Kanan: list feature groups
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
                  <Input placeholder="Nama group, contoh: Authentication"
                    value={featTitle} onChange={(e) => setFeatTitle(e.target.value)} />
                  <Textarea
                    placeholder={"Tulis item per baris:\nJWT login\nRefresh token\nRole-based access"}
                    value={featItems} onChange={(e) => setFeatItems(e.target.value)}
                    className="resize-none" style={{ minHeight: "140px" }} />
                  <Button size="sm" variant="outline" onClick={addFeature}
                    disabled={!featTitle} className="gap-1 cursor-pointer w-full">
                    <PlusIcon className="size-3" /> Tambah Group
                  </Button>
                </div>

                {/* Kanan — list hasil tambah */}
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">
                    Feature groups {values.features.length > 0 && `(${values.features.length})`}
                  </Label>
                  {values.features.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {values.features.map((feat, i) => (
                        <div key={i}
                          className="flex items-start justify-between gap-2 rounded-lg border bg-muted/30 p-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium">{feat.title}</p>
                            <ul className="mt-1.5 flex flex-col gap-0.5">
                              {feat.items.map((item, j) => (
                                <li key={j} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <CheckCircle2Icon className="size-3 shrink-0 text-emerald-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button onClick={() => removeFeature(i)}
                            className="shrink-0 text-muted-foreground transition-colors hover:text-destructive cursor-pointer">
                            <XIcon className="size-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-lg border bg-muted/20 min-h-[120px]">
                      <p className="text-xs text-muted-foreground/50">Belum ada feature group</p>
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