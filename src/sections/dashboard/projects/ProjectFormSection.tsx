import { useState } from "react";
import {
  PlusIcon,
  XIcon,
  Loader2Icon,
  SaveIcon,
  ArrowLeftIcon,
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  type ProjectFormValues,
  PROJECT_FORM_DEFAULT,
  type ProjectResponse,
  type TechItem,
  type ProjectGallery,
} from "@/@types/entities/project";

interface ProjectFormSectionProps {
  mode: "add" | "edit";
  initialData?: ProjectResponse;
  onBack: () => void;
  onSave: (values: ProjectFormValues) => void;
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
          title: initialData.title,
          description: initialData.description,
          image: initialData.image,
          githubUrl: initialData.github_url,
          liveUrl: initialData.live_url,
          challenges: initialData.challenges,
          solution: initialData.solution,
          featured: initialData.featured,
          tags: initialData.tags,
          techStack: initialData.tech_stack,
          gallery: initialData.gallery,
          features: initialData.features,
        }
      : PROJECT_FORM_DEFAULT,
  );
  const [isSaving, setIsSaving] = useState(false);

  // ── Generic field update ─────────────────────────────────────────────────
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
    set(
      "tags",
      values.tags.filter((t) => t !== tag),
    );
  const onTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }
    if (e.key === "Backspace" && !tagInput)
      removeTag(values.tags[values.tags.length - 1]);
  };

  // ── Tech Stack ────────────────────────────────────────────────────────────
  const [techInput, setTechInput] = useState<Partial<TechItem>>({
    name: "",
    icon: "",
    color: "#888888",
  });
  const addTech = () => {
    if (!techInput.name) return;
    const item: TechItem = {
      name: techInput.name,
      icon: techInput.icon ?? "",
      color: techInput.color ?? "#888888",
    };
    set("techStack", [...values.techStack, item]);
    setTechInput({ name: "", icon: "", color: "#888888" });
  };
  const removeTech = (name: string) =>
    set(
      "techStack",
      values.techStack.filter((t) => t.name !== name),
    );

  // ── Gallery ───────────────────────────────────────────────────────────────
  const [galleryInput, setGalleryInput] = useState<Partial<ProjectGallery>>({
    url: "",
    caption: "",
  });
  const addGallery = () => {
    if (!galleryInput.url) return;
    set("gallery", [
      ...values.gallery,
      { url: galleryInput.url, caption: galleryInput.caption ?? "" },
    ]);
    setGalleryInput({ url: "", caption: "" });
  };
  const removeGallery = (i: number) =>
    set(
      "gallery",
      values.gallery.filter((_, idx) => idx !== i),
    );

  // ── Features ──────────────────────────────────────────────────────────────
  const [featTitle, setFeatTitle] = useState("");
  const [featItems, setFeatItems] = useState("");
  const addFeature = () => {
    if (!featTitle) return;
    const items = featItems
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    set("features", [...values.features, { title: featTitle, items }]);
    setFeatTitle("");
    setFeatItems("");
  };
  const removeFeature = (i: number) =>
    set(
      "features",
      values.features.filter((_, idx) => idx !== i),
    );

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate API
    onSave(values);
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
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
                ? "Isi form di bawah untuk menambah project baru"
                : `Edit: ${initialData?.title}`}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={handleSave}
          disabled={isSaving || !values.title}
          className="gap-2 shrink-0"
        >
          {isSaving ? (
            <Loader2Icon className="size-3.5 animate-spin" />
          ) : (
            <SaveIcon className="size-3.5" />
          )}
          {isSaving ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>

      {/* ── Basic Info ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Informasi Dasar</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="title">
              Judul Project <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="portof.id"
              value={values.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="desc">Deskripsi</Label>
            <Textarea
              id="desc"
              placeholder="Deskripsikan project kamu..."
              value={values.description}
              onChange={(e) => set("description", e.target.value)}
              className="min-h-24 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {values.description.length}/500
            </p>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="image">URL Thumbnail</Label>
            <Input
              id="image"
              placeholder="https://..."
              value={values.image}
              onChange={(e) => set("image", e.target.value)}
            />
            {values.image && (
              <img
                src={values.image}
                alt="preview"
                className="mt-1 h-32 w-full rounded-lg object-cover border"
              />
            )}
          </div>
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <Switch
              checked={values.featured}
              onCheckedChange={(v) => set("featured", v)}
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
        </CardContent>
      </Card>

      {/* ── Links ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Links</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              placeholder="https://github.com/..."
              value={values.githubUrl}
              onChange={(e) => set("githubUrl", e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="live">Live Demo URL</Label>
            <Input
              id="live"
              placeholder="https://..."
              value={values.liveUrl}
              onChange={(e) => set("liveUrl", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Tags ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Tags</CardTitle>
          <CardDescription className="text-xs">
            Kategori atau keyword project
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {values.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {values.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1 pl-2.5 pr-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="rounded hover:bg-muted-foreground/20 p-0.5"
                  >
                    <XIcon className="size-2.5" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <Input
            placeholder="Tambah tag lalu Enter..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={onTagKey}
          />
          <p className="text-xs text-muted-foreground">
            Tekan Enter atau koma untuk tambah
          </p>
        </CardContent>
      </Card>

      {/* ── Tech Stack ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Tech Stack</CardTitle>
          <CardDescription className="text-xs">
            Teknologi yang digunakan
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {values.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {values.techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="flex items-center gap-1.5 rounded-full border bg-muted/40 px-2.5 py-1 text-xs"
                  style={{ borderColor: tech.color + "40" }}
                >
                  <span
                    className="size-1.5 rounded-full shrink-0"
                    style={{ background: tech.color }}
                  />
                  {tech.name}
                  <button
                    type="button"
                    onClick={() => removeTech(tech.name)}
                    className="rounded hover:bg-muted-foreground/20 p-0.5 ml-0.5"
                  >
                    <XIcon className="size-2.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-end">
            <div className="grid gap-1">
              <Label className="text-xs">Nama</Label>
              <Input
                placeholder="React"
                value={techInput.name}
                onChange={(e) =>
                  setTechInput((p) => ({ ...p, name: e.target.value }))
                }
                className="h-8"
              />
            </div>
            <div className="grid gap-1">
              <Label className="text-xs">Warna</Label>
              <div className="flex items-center gap-1.5 h-8 rounded-md border px-2">
                <input
                  type="color"
                  value={techInput.color}
                  onChange={(e) =>
                    setTechInput((p) => ({ ...p, color: e.target.value }))
                  }
                  className="size-4 cursor-pointer rounded border-none bg-transparent"
                />
                <span className="text-xs font-mono text-muted-foreground">
                  {techInput.color}
                </span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={addTech}
              disabled={!techInput.name}
              className="h-8 gap-1"
            >
              <PlusIcon className="size-3" /> Tambah
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Challenges & Solution ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Tantangan & Solusi
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-1.5">
            <Label>Tantangan</Label>
            <Textarea
              placeholder="Apa tantangan utama dalam project ini?"
              value={values.challenges}
              onChange={(e) => set("challenges", e.target.value)}
              className="min-h-20 resize-none"
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Solusi</Label>
            <Textarea
              placeholder="Bagaimana kamu menyelesaikannya?"
              value={values.solution}
              onChange={(e) => set("solution", e.target.value)}
              className="min-h-20 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Gallery ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Gallery</CardTitle>
          <CardDescription className="text-xs">
            Screenshot atau foto project
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {values.gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {values.gallery.map((img, i) => (
                <div
                  key={i}
                  className="group relative rounded-lg overflow-hidden border aspect-video bg-muted"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() => removeGallery(i)}
                    className="absolute top-1 right-1 rounded-full bg-destructive/90 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XIcon className="size-3 text-white" />
                  </button>
                  {img.caption && (
                    <p className="absolute bottom-0 inset-x-0 text-[10px] text-white bg-black/50 px-1.5 py-0.5">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Input
              placeholder="URL gambar..."
              value={galleryInput.url}
              onChange={(e) =>
                setGalleryInput((p) => ({ ...p, url: e.target.value }))
              }
              className="h-8 text-xs"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Caption (opsional)..."
                value={galleryInput.caption}
                onChange={(e) =>
                  setGalleryInput((p) => ({ ...p, caption: e.target.value }))
                }
                className="h-8 text-xs"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={addGallery}
                disabled={!galleryInput.url}
                className="h-8 gap-1 shrink-0"
              >
                <PlusIcon className="size-3" /> Tambah
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Features ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Features</CardTitle>
          <CardDescription className="text-xs">
            Fitur-fitur utama project
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {values.features.length > 0 && (
            <div className="flex flex-col gap-2">
              {values.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between rounded-lg border bg-muted/30 p-3 gap-2"
                >
                  <div>
                    <p className="text-xs font-medium">{feat.title}</p>
                    <ul className="mt-1 flex flex-col gap-0.5">
                      {feat.items.map((item, j) => (
                        <li
                          key={j}
                          className="text-xs text-muted-foreground flex items-center gap-1.5"
                        >
                          <span className="size-1 rounded-full bg-muted-foreground/40 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => removeFeature(i)}
                    className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <Separator />
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Judul feature group, contoh: Authentication"
              value={featTitle}
              onChange={(e) => setFeatTitle(e.target.value)}
              className="h-8 text-xs"
            />
            <Textarea
              placeholder={
                "Item per baris:\nJWT login\nRefresh token\nRole-based access"
              }
              value={featItems}
              onChange={(e) => setFeatItems(e.target.value)}
              className="min-h-20 resize-none text-xs"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={addFeature}
              disabled={!featTitle}
              className="w-fit gap-1"
            >
              <PlusIcon className="size-3" /> Tambah Feature Group
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
