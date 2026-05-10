import { useState, useRef, type KeyboardEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { XIcon, SparklesIcon, Loader2Icon, Undo2Icon } from "lucide-react";
import type { UpdateProfileRequest } from "@/@types/entities/profile.types";

const MAX_TAGS = 10;

interface ProfileInfoTabProps {
  values: UpdateProfileRequest;
  onChange: <K extends keyof UpdateProfileRequest>(
    field: K,
    value: UpdateProfileRequest[K],
  ) => void;
  username: string;
  onGenerateAbout?: () => void;
  isGeneratingAbout?: boolean;
  onUndoAbout?: () => void;
  canUndoAbout?: boolean;
}

export function ProfileInfoTab({
  values,
  onChange,
  username,
  onGenerateAbout,
  isGeneratingAbout,
  onUndoAbout,
  canUndoAbout,
}: ProfileInfoTabProps) {
  const [tagInput, setTagInput] = useState("");
  const tagInputRef = useRef<HTMLInputElement>(null);

  const tags = values.tags ?? [];

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (tags.length >= MAX_TAGS) return;
    if (tags.some((t) => t.toLowerCase() === tag.toLowerCase())) return;
    onChange("tags", [...tags, tag]);
    setTagInput("");
  };

  const removeTag = (index: number) => {
    onChange(
      "tags",
      tags.filter((_, i) => i !== index),
    );
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }
    if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      removeTag(tags.length - 1);
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
                portofy.net/
              </span>
              <Input
                id="url_profile"
                placeholder="putra.rizky"
                value={username}
                disabled
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
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
            <Textarea
              id="bio"
              placeholder="Fullstack Developer · Software Engineering Student"
              value={values.bio}
              onChange={(e) => onChange("bio", e.target.value)}
              className="resize-none"
              maxLength={750}
            />
            <p className="text-xs text-muted-foreground text-right">
              {values.bio.length}/750
            </p>
          </div>

          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="about">
                About
                <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                  (deskripsi panjang, tampil di section About)
                </span>
              </Label>
              {onGenerateAbout && (
                <div className="flex items-center gap-1.5">
                  {canUndoAbout && onUndoAbout && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1.5 h-7 text-xs cursor-pointer"
                      onClick={onUndoAbout}
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
                    onClick={onGenerateAbout}
                    disabled={isGeneratingAbout}
                  >
                    <SparklesIcon className="size-3" />
                    Generate Description with AI
                  </Button>
                </div>
              )}
            </div>

            {isGeneratingAbout ? (
              /* ── Skeleton state saat AI sedang generate ── */
              <div className="relative rounded-md border overflow-hidden min-h-28">
                <Skeleton className="absolute inset-0 rounded-md" />
                <Skeleton
                  className="absolute inset-0 rounded-md opacity-60"
                  style={{ animationDelay: "0.15s" }}
                />
                <div className="relative z-10 flex flex-col items-center justify-center gap-2 min-h-28 py-6">
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
                  id="about"
                  placeholder="Ceritakan tentang dirimu, perjalanan karir, dan apa yang sedang kamu kerjakan..."
                  value={values.about}
                  onChange={(e) => onChange("about", e.target.value)}
                  className="min-h-28 resize-none"
                  maxLength={5000}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {values.about.length}/5000
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Skill & Tags ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Skill & Tags</CardTitle>
          <CardDescription className="text-xs">
            Tambahkan skill atau tag yang mendeskripsikan keahlianmu (maks{" "}
            {MAX_TAGS})
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Tags display */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, idx) => (
                <Badge
                  key={`${tag}-${idx}`}
                  variant="secondary"
                  className="gap-1 pl-2 pr-1 py-0.5 text-xs animate-in fade-in-0 zoom-in-95 duration-200"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(idx)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors cursor-pointer"
                    aria-label={`Hapus tag ${tag}`}
                  >
                    <XIcon className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Tag input field */}
          {tags.length < MAX_TAGS && (
            <div className="grid gap-1.5">
              <Label htmlFor="tag_input">Tambah Tag</Label>
              <Input
                ref={tagInputRef}
                id="tag_input"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={() => {
                  if (tagInput.trim()) addTag(tagInput);
                }}
                placeholder="Ketik skill lalu tekan Enter..."
              />
              <p className="text-xs text-muted-foreground">
                Tekan{" "}
                <kbd className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono">
                  Enter
                </kbd>{" "}
                atau{" "}
                <kbd className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono">
                  ,
                </kbd>{" "}
                untuk menambah tag &nbsp;·&nbsp; {tags.length}/{MAX_TAGS}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
