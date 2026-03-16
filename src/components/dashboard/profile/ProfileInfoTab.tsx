import { useState, type KeyboardEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import type { ProfileFormValues } from "@/@types/entities/profile";

import { PlusIcon, XIcon } from "lucide-react";

const MAX_TAGS = 10;

interface ProfileInfoTabProps {
  values: ProfileFormValues;
  onChange: (field: keyof ProfileFormValues, value: string) => void;
  onTagsChange: (tags: string[]) => void;
}

export function ProfileInfoTab({
  values,
  onChange,
  onTagsChange,
}: ProfileInfoTabProps) {
  const [tagInput, setTagInput] = useState("");

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase().replace(/\s+/g, "-");
    if (!tag) return;
    if (values.tags.includes(tag)) return;
    if (values.tags.length >= MAX_TAGS) return;
    onTagsChange([...values.tags, tag]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    onTagsChange(values.tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }
    if (e.key === "Backspace" && !tagInput && values.tags.length > 0) {
      removeTag(values.tags[values.tags.length - 1]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ── Location & Links ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Lokasi & Link</CardTitle>
          <CardDescription className="text-xs">
            Ditampilkan di profil publik
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="url_profile">URL Portofolio Publik</Label>
            <div className="flex items-center rounded-md border bg-muted/40 focus-within:ring-1 focus-within:ring-ring overflow-hidden">
              <span className="px-3 text-sm text-muted-foreground border-r bg-muted select-none h-9 flex items-center">
                portof.id/
              </span>
              <Input
                id="url_profile"
                placeholder="putra.rizky"
                value={values.url_profile}
                onChange={(e) =>
                  onChange(
                    "url_profile",
                    e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ""),
                  )
                }
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Hanya huruf kecil, angka, titik, dan strip. Contoh:{" "}
              <code className="text-xs bg-muted px-1 rounded">putra.rizky</code>
            </p>
          </div>
        </CardContent>
      </Card>
      {/* ── Identity ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Identitas</CardTitle>
          <CardDescription className="text-xs">
            Nama dan bio singkat yang tampil di header portofolio
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="full_name">Nama Lengkap</Label>
            <Input
              id="full_name"
              placeholder="Putra Rizky Nugraha"
              value={values.full_name}
              onChange={(e) => onChange("full_name", e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="address">Lokasi</Label>
            <Input
              id="address"
              placeholder="Jakarta, Indonesia"
              value={values.address}
              onChange={(e) => onChange("address", e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="bio">
              Bio / Headline
              <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                (tampil di bawah nama)
              </span>
            </Label>
            <Input
              id="bio"
              placeholder="Fullstack Developer · Software Engineering Student"
              value={values.bio}
              onChange={(e) => onChange("bio", e.target.value)}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground text-right">
              {values.bio.length}/100
            </p>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="about">
              About
              <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                (deskripsi panjang, tampil di section About)
              </span>
            </Label>
            <Textarea
              id="about"
              placeholder="Ceritakan tentang dirimu, perjalanan karir, dan apa yang sedang kamu kerjakan..."
              value={values.about}
              onChange={(e) => onChange("about", e.target.value)}
              className="min-h-28 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {values.about.length}/500
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ── Tags ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Tags / Keahlian</CardTitle>
          <CardDescription className="text-xs">
            Tambah tag yang merepresentasikan kamu. Maks {MAX_TAGS} tag.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {/* Tags display */}
          {values.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {values.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1 pl-2.5 pr-1.5 py-0.5 text-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="rounded-sm hover:bg-muted-foreground/20 p-0.5 transition-colors"
                  >
                    <XIcon className="size-2.5" />
                    <span className="sr-only">Hapus tag {tag}</span>
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Tag input */}
          {values.tags.length < MAX_TAGS && (
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Tambah tag lalu tekan Enter atau koma..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pr-8"
                />
                {tagInput && (
                  <button
                    type="button"
                    onClick={() => addTag(tagInput)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <PlusIcon className="size-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            {values.tags.length}/{MAX_TAGS} tag digunakan. Tekan{" "}
            <kbd className="px-1 py-0.5 rounded border text-[10px]">Enter</kbd>{" "}
            atau <kbd className="px-1 py-0.5 rounded border text-[10px]">,</kbd>{" "}
            untuk tambah.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
