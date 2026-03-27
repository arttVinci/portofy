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
import { useAdminAchievements } from "@/hooks/queries";
import { useCreateAchievement } from "@/hooks/mutations/achievement/useCreateAchievement";
import { useUpdateAchievement } from "@/hooks/mutations/achievement/useUpdateAchievement";
import { useDeleteAchievement } from "@/hooks/mutations/achievement/useDeleteAchievement";
import { useUploadImage } from "@/hooks/mutations/useUploadImage";
import { useFormData } from "@/hooks/ui/useFormData";
import { useToast } from "@/hooks/ui/useToast";

type ActiveView =
  | { type: "list" }
  | { type: "add" }
  | { type: "edit"; achievement: AchievementResponse }
  | { type: "detail"; achievement: AchievementResponse };

const EMPTY_FORM: UpdateAchievementRequest = {
  title: "",
  image_url: "",
  organization: "",
  issued_date: "",
  credential_url: "",
  credential_id: "",
};

export default function AchievementPage() {
  const [activeView, setActiveView] = useState<ActiveView>({ type: "list" });
  const [activeTab, setActiveTab] = useState("list");
  const { toast, renderToasts } = useToast();

  const [achievement, setAchievement] = useState<AchievementResponse>();

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailBlob, setThumbnailBlob] = useState<string | null>(null);

  const { data: achievemen, isLoading, refetch } = useAdminAchievements();

  const dummyAchievements: AchievementResponse[] = [
    {
      id: "1",
      title: "Juara 1 Web Design Competition",
      image_url: "http://127.0.0.1:3000/public/uploads/dummy-web-design.png",
      organization: "Universitas Teknologi",
      issued_date: "2023-08-15",
      credential_url: "https://example.com/certificates/web-design-1",
      credential_id: "COMP-2023-001",
    },
    {
      id: "2",
      title: "AWS Certified Cloud Practitioner",
      image_url: "http://127.0.0.1:3000/public/uploads/dummy-aws-cert.png",
      organization: "Amazon Web Services",
      issued_date: "2024-01-20",
      credential_url: "https://aws.amazon.com/verification/12345",
      credential_id: "AWS-CCP-98765",
    },
    {
      id: "3",
      title: "Belajar Dasar Pemrograman Web",
      image_url: "http://127.0.0.1:3000/public/uploads/dummy-dicoding.png",
      organization: "Dicoding Indonesia",
      issued_date: "2023-11-05",
      credential_url: "https://dicoding.com/certificates/XYZ123ABC",
      credential_id: "DCD-WEB-001",
    },
    {
      id: "4",
      title: "Peserta Hackathon Nasional 2023",
      image_url: "http://127.0.0.1:3000/public/uploads/dummy-hackathon.png",
      organization: "Kementerian Kominfo",
      issued_date: "2023-10-28",
      credential_url: "http://127.0.0.1:3000/public/uploads/cert-hackathon.pdf",
      credential_id: "HACK-KOMINFO-23",
    },
  ];

  activeView.type === "edit" ? activeView.achievement : undefined;
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
      issued_date: achievement.issued_date ? achievement.issued_date.split("T")[0] : "",
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

  const uploadMutation = useUploadImage({
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
        const fd = new FormData();
        fd.append("images", thumbnailFile);
        const res = await uploadMutation.mutateAsync(fd);
        payload.image_url = res.urls[0];
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
    setAchievement(undefined);
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
    setAchievement(a);
    setActiveView({ type: "edit", achievement: a });
    setActiveTab("form");
  };

  const handleViewDetail = (a: AchievementResponse) => {
    setActiveView({ type: "detail", achievement: a });
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
          {/* List */}
          <TabsContent value="list" className="mt-0">
            <AchievementListSection
              achievements={dummyAchievements ?? []}
              isLoading={isLoading}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetail={handleViewDetail}
            />
          </TabsContent>

          {/* Add / Edit */}
          <TabsContent value="form" className="mt-0">
            {(activeView.type === "add" || activeView.type === "edit") && (
              <AchievementFormSection
                mode={activeView.type}
                initialData={
                  activeView.type === "edit"
                    ? activeView.achievement
                    : undefined
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
            {activeView.type === "detail" && (
              <AchievementDetailSection
                achievement={activeView.achievement}
                onBack={goList}
                onEdit={handleEdit}
              />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
