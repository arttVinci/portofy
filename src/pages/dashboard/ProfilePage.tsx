import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SaveIcon, Loader2Icon } from "lucide-react";

import { ProfileInfoTab } from "@/components/dashboard/profile/ProfileInfoTab";
import { ProfileAvatarTab } from "@/components/dashboard/profile/ProfileAvatarTab";
import { ProfileVisibilityTab } from "@/components/dashboard/profile/ProfileVisibilityTab";
import { ProfilePreviewCard } from "@/components/dashboard/profile/ProfilePreviewCard";

import { type UpdateProfileRequest } from "@/@types/entities/profile.types";
import { useFormData } from "@/hooks/ui/useFormData";
import { useUpdateProfile } from "@/hooks/mutations/profile/useUpdateProfile";
import { useToast } from "@/hooks/ui/useToast";
import { useUploadImage } from "@/hooks/mutations/profile/useUploadImage";
import { ApiError } from "@/api/apiError";
import { useGetProfile } from "@/hooks/queries/useGetProfile";

export default function ProfilePage() {
  const [isPublic, setIsPublic] = useState(true);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [avatarImageFile, setAvatarImageFile] = useState<File | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const { toast, renderToasts } = useToast();

  const { data: profile, isLoading, error } = useGetProfile();

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

  // Sync form + visibility setelah api sudah berhasil di panggil
  useEffect(() => {
    if (!profile) return;
    form.setValues({
      full_name: profile.full_name ?? "",
      url_profile: profile.url_profile ?? "",
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
      form.handleChange("url_profile", response.url_profile);
      setAvatarImageFile(null);
      setAvatarPreviewUrl(null);
      toast("success", "Berhasil", "Foto profil berhasil diperbarui!");
    },
    onError: (error: ApiError) => {
      toast("error", "Gagal Upload", error.message);
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
        uploadData.append("image_profile", avatarImageFile);
        await uploadMutation.mutateAsync(uploadData);

        const uploadResponse = await uploadMutation.mutateAsync(uploadData);

        payload.url_profile = uploadResponse.url_profile;

        console.log("cobaaaaaa", uploadResponse.url_profile);
      }
      await updateProfileMutation.mutateAsync(payload);
      console.log(form.values);
    } catch {}
  };

  const handleCancel = () => {
    if (!profile) return;
    form.setValues({
      full_name: profile.full_name ?? "",
      url_profile: profile.url_profile ?? "",
      address: profile.address ?? "",
      about: profile.about ?? "",
      bio: profile.bio ?? "",
      theme: profile.theme ?? "",
      tags: profile.tags ?? [],
    });
    // setAvatarPreviewUrl(null);
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
          </TabsList>

          <div className="mt-4">
            <TabsContent value="info" className="mt-0">
              <ProfileInfoTab values={form.values} onChange={handleChange} />
            </TabsContent>

            <TabsContent value="avatar" className="mt-0">
              <ProfileAvatarTab
                fullName={profile.full_name || "User"}
                avatarUrl={profile.url_profile}
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
          </div>
        </Tabs>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <ProfilePreviewCard
            values={form.values}
            avatarUrl={avatarPreviewUrl || profile.url_profile}
            isPublic={isPublic}
          />
        </div>
      </div>
    </div>
  );
}
