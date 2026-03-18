import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SaveIcon, Loader2Icon } from "lucide-react";

import { ProfileInfoTab } from "@/components/dashboard/profile/ProfileInfoTab";
import { ProfileAvatarTab } from "@/components/dashboard/profile/ProfileAvatarTab";
import { ProfileVisibilityTab } from "@/components/dashboard/profile/ProfileVisibilityTab";
import { ProfilePreviewCard } from "@/components/dashboard/profile/ProfilePreviewCard";

import {
  type ProfileFormValues,
  type UpdateProfileRequest,
} from "@/@types/entities/profile";
import { useFormData } from "@/hooks/ui/useFormData";
import { useUpdateProfile } from "@/hooks/mutations/profile/useUpdateProfile";
import { useToast } from "@/hooks/ui/useToast";

import { ApiError } from "@/api/apiError";

// ── Dummy data — ganti dengan data dari API nanti ─────────────────────────────
const DUMMY_PROFILE: ProfileFormValues = {
  full_name: "Putra Rizky Nugraha",
  url_profile: "putra.rizky",
  address: "Jakarta, Indonesia",
  about:
    "Seorang mahasiswa Sistem Informasi yang sedang dalam transisi karir menjadi Software Engineer profesional. Fokus pada Web Development dan Clean Code principles.",
  bio: "Fullstack Developer · Software Engineering Student",
  tags: ["golang", "react", "laravel", "typescript", "docker"],
};

export default function ProfilePage() {
  const [values, setValues] = useState<ProfileFormValues>(DUMMY_PROFILE);
  const [isPublic, setIsPublic] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const { toast, renderToasts } = useToast();

  const form = useFormData<UpdateProfileRequest>({
    initialValues: {
      full_name: "",
      url_profile: "",
      address: "",
      about: "",
      bio: "",
      theme: "",
      tags: [],
    },
    onSubmit: (payload) => updateProfileMutation.mutate(payload),
  });

  const updateProfileMutation = useUpdateProfile({
    onSuccess: () => {
      toast("success", "Berhasil", `Profile anda berhasil di Perbarui`);
    },
    onError: (error: ApiError) => {
      // console.error("Login failed:", error.message);
      toast("error", "Error", error.message);
    },
  });
  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleChange = (field: keyof ProfileFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleTagsChange = (tags: string[]) => {
    setValues((prev) => ({ ...prev, tags }));
    setIsDirty(true);
  };

  const handleAvatarChange = (file: File) => {
    setAvatarFile(file);
    setAvatarUrl(URL.createObjectURL(file));
    setIsDirty(true);
  };

  const handleAvatarRemove = () => {
    setAvatarFile(null);
    setAvatarUrl(undefined);
    setIsDirty(true);
  };

  const handleTogglePublic = (val: boolean) => {
    setIsPublic(val);
    setIsDirty(true);
  };

  const handleCancel = () => {
    setValues(DUMMY_PROFILE); // reset ke data asli — nanti dari API
    setIsDirty(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: kirim ke API
      // const formData = new FormData();
      // if (avatarFile) formData.append("avatar", avatarFile);
      // formData.append("data", JSON.stringify({ ...values, is_public: isPublic }));
      // await updateProfile(formData);
      await new Promise((r) => setTimeout(r, 800)); // simulasi loading
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {renderToasts()}
      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola informasi profil publik portofolio kamu
          </p>
        </div>

        {/* Save / Cancel — always visible */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            disabled={!isDirty || isSaving}
          >
            Batal
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!isDirty || isSaving}
            className="gap-2"
          >
            {isSaving ? (
              <Loader2Icon className="size-3.5 animate-spin" />
            ) : (
              <SaveIcon className="size-3.5" />
            )}
            {isSaving ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>

      <Separator />

      {/* ── Main content: tabs (kiri) + preview (kanan) ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        {/* Tabs */}
        <Tabs defaultValue="info">
          <TabsList variant="line">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="avatar">Avatar</TabsTrigger>
            <TabsTrigger value="visibility">Visibility</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="info" className="mt-0">
              <ProfileInfoTab
                values={form.values}
                onChange={form.handleChange}
                onTagsChange={handleTagsChange}
              />
            </TabsContent>

            <TabsContent value="avatar" className="mt-0">
              <ProfileAvatarTab
                values={values}
                avatarUrl={avatarUrl}
                onAvatarChange={handleAvatarChange}
                onAvatarRemove={handleAvatarRemove}
              />
            </TabsContent>

            <TabsContent value="visibility" className="mt-0">
              <ProfileVisibilityTab
                values={values}
                isPublic={isPublic}
                onTogglePublic={handleTogglePublic}
              />
            </TabsContent>
          </div>
        </Tabs>

        {/* Preview — sticky di desktop */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <ProfilePreviewCard
            values={values}
            avatarUrl={avatarUrl}
            isPublic={isPublic}
          />
        </div>
      </div>
    </div>
  );
}
