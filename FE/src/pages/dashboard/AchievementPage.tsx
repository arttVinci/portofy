import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { AchievementListSection } from "@/sections/dashboard/achievement/AchievementListSection";
import { AchievementFormSection } from "@/sections/dashboard/achievement/AchievementFormSection";
import { AchievementDetailSection } from "@/sections/dashboard/achievement/AchievementDetailSection";

import { ApiError } from "@/api/apiError";
import type {
  AchievementResponse,
  UpdateAchievementRequest,
  CreateAchievementRequest,
} from "@/@types";
import { useAdminAchievement, useAdminAchievements } from "@/hooks/queries";
import { useCreateAchievement } from "@/hooks/mutations/achievement/useCreateAchievement";
import { useUpdateAchievement } from "@/hooks/mutations/achievement/useUpdateAchievement";
import { useDeleteAchievement } from "@/hooks/mutations/achievement/useDeleteAchievement";
import { useUploadImageAchievement } from "@/hooks/mutations/achievement/useUploadImageAchievement";
import { useFormData } from "@/hooks/ui/useFormData";
import { useToast } from "@/hooks/ui/useToast";

type ActiveView =
  | { type: "list" }
  | { type: "add" }
  | { type: "edit"; id: string }
  | { type: "detail"; id: string };

const EMPTY_FORM: UpdateAchievementRequest = {
  title: "",
  image_url: "",
  organization: "",
  issued_date: "",
  credential_url: "",
  credential_id: "",
};

export default function AchievementPage() {
  const [page, setPage] = useState(1);
  const [search] = useState("");

  const [activeView, setActiveView] = useState<ActiveView>({ type: "list" });
  const [activeTab, setActiveTab] = useState("list");
  const { toast, renderToasts } = useToast();

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailBlob, setThumbnailBlob] = useState<string | null>(null);

  const { data: achievement, isLoading: isLoadingDetail } = useAdminAchievement(
    activeView.type === "edit" || activeView.type === "detail"
      ? activeView.id
      : "",
  );

  const {
    data: achievements,
    isLoading,
    refetch,
  } = useAdminAchievements({
    page: page,
    size: 8,
    title: search,
  });

  const totalPage = achievements?.paging?.total_page || 1;

  console.log(
    "cobaaa",
    page,
    totalPage,
    achievements?.paging,
    achievements?.data,
  );

  const form = useFormData<UpdateAchievementRequest>({
    initialValues: EMPTY_FORM,
    onSubmit: () => {},
  });

  // Sync form saat edit
  useEffect(() => {
    if (!achievement) return;
    form.setValues({
      title: achievement.title ?? "",
      image_url: achievement.image_url ?? "",
      organization: achievement.organization ?? "",
      issued_date: achievement.issued_date
        ? achievement.issued_date.split("T")[0]
        : "",
      credential_url: achievement.credential_url ?? "",
      credential_id: achievement.credential_id ?? "",
    });
  }, [achievement]);

  // ── Mutations ─────────────────────────────────────────────────────────────
  const createMutation = useCreateAchievement({
    onSuccess: () => {
      toast("success", "Berhasil", "Achievement berhasil ditambahkan");
      refetch();
      goList();
    },
    onError: (error: ApiError) => toast("error", "Error", error.message),
  });

  const updateMutation = useUpdateAchievement({
    onSuccess: () => {
      toast("success", "Berhasil", "Achievement berhasil diperbarui");
      refetch();
      goList();
    },
    onError: (error: ApiError) => toast("error", "Error", error.message),
  });

  const deleteMutation = useDeleteAchievement({
    onSuccess: () => {
      toast("success", "Berhasil", "Achievement berhasil dihapus");
      refetch();
    },
    onError: (error: ApiError) => toast("error", "Error", error.message),
  });

  const uploadMutation = useUploadImageAchievement({
    onError: (error: ApiError) => toast("error", "Gagal Upload", error.message),
  });

  const isSaving =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending ||
    uploadMutation.isPending;

  // ── Save handler ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    try {
      let payload = { ...form.values };

      // Format date to RFC3339 (backend validation expects valid time string)
      if (payload.issued_date && !payload.issued_date.includes("T")) {
        payload.issued_date = `${payload.issued_date}T00:00:00Z`;
      }

      // Upload thumbnail jika ada file baru
      if (thumbnailFile) {
        const formData = new FormData();

        if (activeView.type === "edit" && achievement) {
          formData.append("image", thumbnailFile);
          formData.append("id", achievement.id);
          const resUrl = await uploadMutation.mutateAsync(formData);
          payload.image_url = resUrl;
        }
      }

      if (activeView.type === "edit" && achievement) {
        await updateMutation.mutateAsync({ id: achievement.id, payload });
      } else if (activeView.type === "add") {
        await createMutation.mutateAsync(payload as CreateAchievementRequest);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ── Reset form ────────────────────────────────────────────────────────────
  const handleCancel = () => {
    form.setValues(EMPTY_FORM);
    setThumbnailFile(null);
    setThumbnailBlob(null);
  };

  // ── Navigation ────────────────────────────────────────────────────────────
  const goList = () => {
    handleCancel();
    setActiveView({ type: "list" });
    setActiveTab("list");
  };

  const handleAdd = () => {
    setActiveView({ type: "add" });
    setActiveTab("form");
  };

  const handleEdit = (a: AchievementResponse) => {
    setActiveView({ type: "edit", id: a.id });
    setActiveTab("form");
  };

  const handleViewDetail = (a: AchievementResponse) => {
    setActiveView({ type: "detail", id: a.id });
    setActiveTab("detail");
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleTabChange = (val: string) => {
    if (val === "list") goList();
  };

  return (
    <div className="flex flex-col gap-6">
      {renderToasts()}

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Achievements</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola penghargaan dan sertifikasi portofolio kamu
        </p>
      </div>

      <Separator />

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList variant="line">
          <TabsTrigger value="list">Achievement</TabsTrigger>
          <TabsTrigger value="form" disabled={activeView.type === "list"}>
            {activeView.type === "edit"
              ? "Edit Achievement"
              : "Add Achievement"}
          </TabsTrigger>
          <TabsTrigger value="detail" disabled={activeView.type !== "detail"}>
            Detail
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <TabsContent value="list" className="mt-0">
            <AchievementListSection
              achievements={achievements?.data ?? []}
              isLoading={isLoading}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetail={handleViewDetail}
              currentPage={page}
              totalPages={totalPage}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </TabsContent>

          {/* Add / Edit */}
          <TabsContent value="form" className="mt-0">
            {(activeView.type === "add" || activeView.type === "edit") && (
              <AchievementFormSection
                mode={activeView.type}
                initialData={
                  activeView.type === "edit" ? achievement : undefined
                }
                onBack={goList}
                onSave={handleSave}
                values={form.values}
                onChange={(field, value) => form.handleChange(field, value)}
                thumbnailFile={thumbnailFile}
                setThumbnailFile={setThumbnailFile}
                thumbnailBlob={thumbnailBlob}
                setThumbnailBlob={setThumbnailBlob}
                isSaving={isSaving}
              />
            )}
          </TabsContent>

          {/* Detail */}
          <TabsContent value="detail" className="mt-0">
            {activeView.type === "detail" &&
              (isLoadingDetail ? (
                <div className="p-4 text-center">Loading</div>
              ) : achievement ? (
                <AchievementDetailSection
                  achievement={achievement}
                  onBack={goList}
                  onEdit={handleEdit}
                />
              ) : (
                <div>Not Found</div>
              ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
