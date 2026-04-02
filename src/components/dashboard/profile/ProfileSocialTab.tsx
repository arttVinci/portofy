import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusIcon,
  Trash2Icon,
  PencilIcon,
  CheckIcon,
  XIcon,
  Loader2Icon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
  YoutubeIcon,
  GlobeIcon,
  LinkIcon,
} from "lucide-react";
import type {
  SocialResponse,
  CreateSocialRequest,
} from "@/@types/entities/social.types";
import { useAdminSocials } from "@/hooks/queries";
import { useCreateSocial } from "@/hooks/mutations/social/useCreateSocial";
import { useUpdateSocial } from "@/hooks/mutations/social/useUpdateSocial";
import { useDeleteSocial } from "@/hooks/mutations/social/useDeleteSocial";
import { useToast } from "@/hooks/ui/useToast";
import { ApiError } from "@/api/apiError";

type Platform = CreateSocialRequest["platform"];

const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X (Twitter)" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "discord", label: "Discord" },
  { value: "website", label: "Website" },
];

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  github: <GithubIcon className="size-4" />,
  linkedin: <LinkedinIcon className="size-4" />,
  instagram: <InstagramIcon className="size-4" />,
  x: <TwitterIcon className="size-4" />,
  twitter: <TwitterIcon className="size-4" />,
  facebook: <FacebookIcon className="size-4" />,
  youtube: <YoutubeIcon className="size-4" />,
  discord: <LinkIcon className="size-4" />,
  website: <GlobeIcon className="size-4" />,
};

const PLATFORM_COLORS: Record<string, string> = {
  github: "bg-gray-900 text-white dark:bg-gray-700",
  linkedin: "bg-blue-600 text-white",
  instagram: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white",
  x: "bg-black text-white dark:bg-gray-800",
  twitter: "bg-sky-500 text-white",
  facebook: "bg-blue-500 text-white",
  youtube: "bg-red-600 text-white",
  discord: "bg-indigo-500 text-white",
  website: "bg-emerald-600 text-white",
};

function getPlatformLabel(platform: string): string {
  return PLATFORM_OPTIONS.find((p) => p.value === platform)?.label ?? platform;
}

export function ProfileSocialTab() {
  const { data: socials, isLoading } = useAdminSocials();
  const { toast, renderToasts } = useToast();

  // ── Add Form State ──
  const [isAdding, setIsAdding] = useState(false);
  const [newPlatform, setNewPlatform] = useState<Platform>("github");
  const [newUrl, setNewUrl] = useState("");

  // ── Edit State ──
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");

  // ── Mutations ──
  const createMutation = useCreateSocial({
    onSuccess: () => {
      toast("success", "Berhasil", "Social media berhasil ditambahkan");
      setIsAdding(false);
      setNewPlatform("github");
      setNewUrl("");
    },
    onError: (error: ApiError) => {
      toast("error", "Gagal", error.message);
    },
  });

  const updateMutation = useUpdateSocial({
    onSuccess: () => {
      toast("success", "Berhasil", "Social media berhasil diperbarui");
      setEditingId(null);
      setEditUrl("");
    },
    onError: (error: ApiError) => {
      toast("error", "Gagal", error.message);
    },
  });

  const deleteMutation = useDeleteSocial({
    onSuccess: () => {
      toast("success", "Berhasil", "Social media berhasil dihapus");
    },
    onError: (error: ApiError) => {
      toast("error", "Gagal", error.message);
    },
  });

  const handleAdd = () => {
    if (!newUrl.trim()) return;
    createMutation.mutate({ platform: newPlatform, link_url: newUrl.trim() });
  };

  const handleUpdate = (id: string) => {
    if (!editUrl.trim()) return;
    updateMutation.mutate({ id, payload: { link_url: editUrl.trim() } });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const startEdit = (social: SocialResponse) => {
    setEditingId(social.id);
    setEditUrl(social.link_url);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditUrl("");
  };

  // Platforms that have already been added
  const usedPlatforms = new Set(socials?.map((s) => s.platform) ?? []);
  const availablePlatforms = PLATFORM_OPTIONS.filter(
    (p) => !usedPlatforms.has(p.value),
  );

  return (
    <div className="flex flex-col gap-4">
      {renderToasts()}

      {/* ── Existing Social Links ── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium">
              Link Social Media
            </CardTitle>
            <CardDescription className="text-xs">
              Kelola link social media yang tampil di portofolio publik kamu
            </CardDescription>
          </div>

          {!isAdding && availablePlatforms.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                setNewPlatform(availablePlatforms[0].value);
                setIsAdding(true);
              }}
            >
              <PlusIcon className="size-3.5" />
              Tambah
            </Button>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {/* ── Loading state ── */}
          {isLoading && (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2Icon className="size-4 animate-spin mr-2" />
              Memuat data...
            </div>
          )}

          {/* ── Empty state ── */}
          {!isLoading && (!socials || socials.length === 0) && !isAdding && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <LinkIcon className="size-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Belum ada social media
              </p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Tambahkan link social media agar pengunjung bisa terhubung
                denganmu
              </p>
              {availablePlatforms.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => {
                    setNewPlatform(availablePlatforms[0].value);
                    setIsAdding(true);
                  }}
                >
                  <PlusIcon className="size-3.5" />
                  Tambah Social Media
                </Button>
              )}
            </div>
          )}

          {/* ── Social list ── */}
          {socials?.map((social) => (
            <div
              key={social.id}
              className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              {/* Platform icon badge */}
              <div
                className={`flex items-center justify-center size-9 rounded-lg shrink-0 ${PLATFORM_COLORS[social.platform] ?? "bg-muted"}`}
              >
                {PLATFORM_ICONS[social.platform] ?? (
                  <LinkIcon className="size-4" />
                )}
              </div>

              {editingId === social.id ? (
                /* ── Editing mode ── */
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 h-8 text-sm"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUpdate(social.id);
                      if (e.key === "Escape") cancelEdit();
                    }}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                    onClick={() => handleUpdate(social.id)}
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? (
                      <Loader2Icon className="size-3.5 animate-spin" />
                    ) : (
                      <CheckIcon className="size-3.5" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8"
                    onClick={cancelEdit}
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              ) : (
                /* ── Display mode ── */
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {getPlatformLabel(social.platform)}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {social.link_url}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() => startEdit(social)}
                    >
                      <PencilIcon className="size-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(social.id)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? (
                        <Loader2Icon className="size-3.5 animate-spin" />
                      ) : (
                        <Trash2Icon className="size-3.5" />
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* ── Add Form ── */}
          {isAdding && (
            <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-3">
                <div className="grid gap-1.5">
                  <Label className="text-xs">Platform</Label>
                  <Select
                    value={newPlatform}
                    onValueChange={(v) => setNewPlatform(v as Platform)}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Pilih platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePlatforms.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          <span className="flex items-center gap-2">
                            {PLATFORM_ICONS[p.value]}
                            {p.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1.5">
                  <Label className="text-xs">URL</Label>
                  <Input
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://github.com/username"
                    className="h-9"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAdd();
                      if (e.key === "Escape") setIsAdding(false);
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsAdding(false);
                    setNewUrl("");
                  }}
                >
                  Batal
                </Button>
                <Button
                  size="sm"
                  className="gap-1.5"
                  onClick={handleAdd}
                  disabled={!newUrl.trim() || createMutation.isPending}
                >
                  {createMutation.isPending ? (
                    <Loader2Icon className="size-3.5 animate-spin" />
                  ) : (
                    <PlusIcon className="size-3.5" />
                  )}
                  Simpan
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
