import { useState, useEffect } from "react";
import type {
  ProjectResponse,
  TechItem,
  ProjectFeature,
} from "@/@types/entities/project";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Trash2 } from "lucide-react";

// ── Types ──────────────────────────────────────────────────

export interface ProjectFormData {
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  challenges: string;
  solution: string;
  tags: string[];
  techStack: TechItem[];
  features: ProjectFeature[];
}

interface ProjectFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: ProjectResponse | null;
  onSubmit: (data: ProjectFormData) => void;
}

// ── Helpers ────────────────────────────────────────────────

function toFormData(project?: ProjectResponse | null): ProjectFormData {
  if (!project) {
    return {
      title: "",
      description: "",
      image: "",
      githubUrl: "",
      liveUrl: "",
      featured: false,
      challenges: "",
      solution: "",
      tags: [],
      techStack: [],
      features: [],
    };
  }
  return {
    title: project.title,
    description: project.description,
    image: project.image,
    githubUrl: project.github_url,
    liveUrl: project.live_url,
    featured: project.featured,
    challenges: project.challenges,
    solution: project.solution,
    tags: [...project.tags],
    techStack: project.tech_stack.map((t) => ({ ...t })),
    features: project.features.map((f) => ({
      title: f.title,
      items: [...f.items],
    })),
  };
}

// ── Component ──────────────────────────────────────────────

export default function ProjectFormDialog({
  open,
  onOpenChange,
  project,
  onSubmit,
}: ProjectFormDialogProps) {
  const isEdit = !!project;
  const [form, setForm] = useState<ProjectFormData>(toFormData(project));

  // Sync when opening with a different project
  useEffect(() => {
    if (open) setForm(toFormData(project));
  }, [open, project]);

  // ── Field updaters ─────────────────────────────────────

  const set = <K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  // ── Tag helpers ────────────────────────────────────────

  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !form.tags.includes(trimmed) && form.tags.length < 10) {
      set("tags", [...form.tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) =>
    set(
      "tags",
      form.tags.filter((t) => t !== tag)
    );

  // ── Tech stack helpers ─────────────────────────────────

  const [techInput, setTechInput] = useState("");

  const addTech = () => {
    const trimmed = techInput.trim();
    if (
      trimmed &&
      !form.techStack.find((t) => t.name === trimmed) &&
      form.techStack.length < 15
    ) {
      set("techStack", [
        ...form.techStack,
        { name: trimmed, icon: "", color: "" },
      ]);
      setTechInput("");
    }
  };

  const removeTech = (name: string) =>
    set(
      "techStack",
      form.techStack.filter((t) => t.name !== name)
    );

  // ── Feature helpers ────────────────────────────────────

  const addFeatureGroup = () =>
    set("features", [...form.features, { title: "", items: [""] }]);

  const removeFeatureGroup = (idx: number) =>
    set(
      "features",
      form.features.filter((_, i) => i !== idx)
    );

  const updateFeatureTitle = (idx: number, title: string) => {
    const copy = [...form.features];
    copy[idx] = { ...copy[idx], title };
    set("features", copy);
  };

  const addFeatureItem = (groupIdx: number) => {
    const copy = [...form.features];
    copy[groupIdx] = {
      ...copy[groupIdx],
      items: [...copy[groupIdx].items, ""],
    };
    set("features", copy);
  };

  const updateFeatureItem = (
    groupIdx: number,
    itemIdx: number,
    value: string
  ) => {
    const copy = [...form.features];
    const items = [...copy[groupIdx].items];
    items[itemIdx] = value;
    copy[groupIdx] = { ...copy[groupIdx], items };
    set("features", copy);
  };

  const removeFeatureItem = (groupIdx: number, itemIdx: number) => {
    const copy = [...form.features];
    copy[groupIdx] = {
      ...copy[groupIdx],
      items: copy[groupIdx].items.filter((_, i) => i !== itemIdx),
    };
    set("features", copy);
  };

  // ── Submit ─────────────────────────────────────────────

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the project details below."
              : "Fill in the details to create a new project."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* ── Basic Info ─────────────────────────────── */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="My Awesome Project"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="A brief description of the project..."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                placeholder="https://example.com/thumbnail.png"
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
              />
            </div>
          </div>

          <Separator />

          {/* ── Links ──────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                placeholder="https://github.com/..."
                value={form.githubUrl}
                onChange={(e) => set("githubUrl", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                placeholder="https://..."
                value={form.liveUrl}
                onChange={(e) => set("liveUrl", e.target.value)}
              />
            </div>
          </div>

          {/* ── Featured toggle ────────────────────────── */}
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <Label className="text-sm font-medium">Featured Project</Label>
              <p className="text-xs text-muted-foreground">
                Featured projects are highlighted in your portfolio.
              </p>
            </div>
            <Switch
              checked={form.featured}
              onCheckedChange={(checked) => set("featured", checked)}
            />
          </div>

          <Separator />

          {/* ── Tags ───────────────────────────────────── */}
          <div className="grid gap-2">
            <Label>Tags</Label>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" variant="outline" size="icon" onClick={addTag}>
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          {/* ── Tech Stack ─────────────────────────────── */}
          <div className="grid gap-2">
            <Label>Tech Stack</Label>
            {form.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.techStack.map((tech) => (
                  <Badge
                    key={tech.name}
                    variant="outline"
                    className="gap-1 pr-1"
                  >
                    {tech.name}
                    <button
                      type="button"
                      onClick={() => removeTech(tech.name)}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                placeholder="Add technology..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTech();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addTech}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* ── Challenges & Solution ──────────────────── */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="challenges">Challenges</Label>
              <Textarea
                id="challenges"
                placeholder="What challenges did you face?"
                value={form.challenges}
                onChange={(e) => set("challenges", e.target.value)}
                rows={2}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="solution">Solution</Label>
              <Textarea
                id="solution"
                placeholder="How did you solve them?"
                value={form.solution}
                onChange={(e) => set("solution", e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <Separator />

          {/* ── Features ───────────────────────────────── */}
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label>Features</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFeatureGroup}
              >
                <Plus className="mr-1 size-3.5" />
                Add Group
              </Button>
            </div>

            {form.features.map((group, gIdx) => (
              <div
                key={gIdx}
                className="rounded-lg border p-3 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Feature group title"
                    value={group.title}
                    onChange={(e) => updateFeatureTitle(gIdx, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 text-destructive hover:text-destructive"
                    onClick={() => removeFeatureGroup(gIdx)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                {group.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-center gap-2 pl-4">
                    <span className="text-xs text-muted-foreground">•</span>
                    <Input
                      placeholder="Feature item"
                      value={item}
                      onChange={(e) =>
                        updateFeatureItem(gIdx, iIdx, e.target.value)
                      }
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => removeFeatureItem(gIdx, iIdx)}
                    >
                      <X className="size-3.5" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-4"
                  onClick={() => addFeatureItem(gIdx)}
                >
                  <Plus className="mr-1 size-3" />
                  Add Item
                </Button>
              </div>
            ))}
          </div>

          {/* ── Footer ─────────────────────────────────── */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? "Save Changes" : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
