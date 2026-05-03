import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SaveIcon, Loader2Icon } from "lucide-react";

import { ProfileInfoTab } from "@/components/dashboard/profile/ProfileInfoTab";
import { ProfileAvatarTab } from "@/components/dashboard/profile/ProfileAvatarTab";
import { ProfileVisibilityTab } from "@/components/dashboard/profile/ProfileVisibilityTab";
import { ProfileSocialTab } from "@/components/dashboard/profile/ProfileSocialTab";
import { ProfilePreviewCard } from "@/components/dashboard/profile/ProfilePreviewCard";

import { type UpdateProfileRequest } from "@/@types/entities/profile.types";
import { useFormData } from "@/hooks/ui/useFormData";
import { useUpdateProfile } from "@/hooks/mutations/profile/useUpdateProfile";
import { useToast } from "@/hooks/ui/useToast";
import { useUploadImage } from "@/hooks/mutations/useUploadImage";
import { ApiError } from "@/api/apiError";
import { useGetProfile } from "@/hooks/queries";
import { useCurrent } from "@/hooks/queries/user/useCurrent";

export default function ProfilePage() {
  const [isPublic, setIsPublic] = useState(true);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [avatarImageFile, setAvatarImageFile] = useState<File | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const { toast, renderToasts } = useToast();

  const { data: profile, isLoading, error } = useGetProfile();
  const { data: currentUser } = useCurrent({ enabled: true });

  const form = useFormData<UpdateProfileRequest>({
    initialValues: {
      full_name: "",
      image_url: "",
      address: "",
      about: "",
      bio: "",
      theme: "",
      tags: [],
    },
    onSubmit: (payload) => updateProfileMutation.mutate(payload),
  });

  // Sync form + visibility setelah api sudah berhasil di panggil
  useEffect(() => {
    if (!profile) return;
    form.setValues({
      full_name: profile.full_name ?? "",
      image_url: profile.image_url ?? "",
      address: profile.address ?? "",
      about: profile.about ?? "",
      bio: profile.bio ?? "",
      theme: profile.theme ?? "",
      tags: profile.tags ?? [],
    });
    setIsPublic(true);
  }, [profile]);

  const updateProfileMutation = useUpdateProfile({
    onSuccess: () => {
      toast("success", "Berhasil", "Profile anda berhasil diperbarui");
      setIsDirty(false);
    },
    onError: (error: ApiError) => {
      toast("error", "Error", error.message);
    },
  });

  const uploadMutation = useUploadImage({
    onSuccess: (response) => {
      form.handleChange("image_url", response.image_url);
      setAvatarImageFile(null);
      setAvatarPreviewUrl(null);
      toast("success", "Berhasil", "Foto profil berhasil diperbarui!");
    },
    onError: (error: ApiError) => {
      toast("error", "Gagal Upload", error.message);
      console.log("error upload", error);
    },
  });

  const handleChange = <K extends keyof UpdateProfileRequest>(
    key: K,
    value: UpdateProfileRequest[K],
  ) => {
    form.handleChange(key, value);
    setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      let payload = { ...form.values };

      if (avatarImageFile) {
        const uploadData = new FormData();
        uploadData.append("images", avatarImageFile);

        const uploadResponse = await uploadMutation.mutateAsync(uploadData);

        payload.image_url = uploadResponse.image_url[0];
        // console.log("cobaaaa", avatarPreviewUrl);
      }
      await updateProfileMutation.mutateAsync(payload);
    } catch {}
  };

  const handleCancel = () => {
    if (!profile) return;
    form.setValues({
      full_name: profile.full_name ?? "",
      image_url: profile.image_url ?? "",
      address: profile.address ?? "",
      about: profile.about ?? "",
      bio: profile.bio ?? "",
      theme: profile.theme ?? "",
      tags: profile.tags ?? [],
    });
    setAvatarPreviewUrl(null);
    setAvatarImageFile(null);
    setIsPublic(true);
    setIsDirty(false);
  };

  const handleTogglePublic = (val: boolean) => {
    setIsPublic(val);
    setIsDirty(true);
  };

  const isSaving = updateProfileMutation.isPending || uploadMutation.isPending;

  if (isLoading || !profile) return <div>Loading...</div>;
  if (error) return <div>Gagal ambil data: {error.message}</div>;

  return (
    <div className="flex flex-col gap-6">
      {renderToasts()}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola informasi profil publik portofolio kamu
          </p>
        </div>

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
            disabled={(!isDirty && !avatarImageFile) || isSaving}
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <Tabs defaultValue="info">
          <TabsList variant="line">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="avatar">Avatar</TabsTrigger>
            <TabsTrigger value="visibility">Visibility</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="info" className="mt-0">
              <ProfileInfoTab
                values={form.values}
                onChange={handleChange}
                username={currentUser?.username ?? "Username"}
              />
            </TabsContent>

            <TabsContent value="avatar" className="mt-0">
              <ProfileAvatarTab
                fullName={profile.full_name || "User"}
                avatarUrl={profile.image_url}
                preview={avatarPreviewUrl || ""}
                setAvatarPreviewUrl={setAvatarPreviewUrl}
                setAvatarImageFile={(file) => {
                  setAvatarImageFile(file);
                  if (file) setIsDirty(true);
                }}
              />
            </TabsContent>

            <TabsContent value="visibility" className="mt-0">
              <ProfileVisibilityTab
                isPublic={isPublic}
                onTogglePublic={handleTogglePublic}
              />
            </TabsContent>

            <TabsContent value="social" className="mt-0">
              <ProfileSocialTab />
            </TabsContent>
          </div>
        </Tabs>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <ProfilePreviewCard
            values={form.values ?? ""}
            avatarUrl={avatarPreviewUrl || profile.image_url}
            isPublic={isPublic}
            username={currentUser?.username ?? "Username"}
          />
        </div>
      </div>
    </div>
  );
}
