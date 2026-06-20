import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { ExperienceListSection } from "@/sections/dashboard/experience/ExperienceListSection";
import { ExperienceFormSection } from "@/sections/dashboard/experience/ExperienceFormSection";
import { ExperienceDetailSection } from "@/sections/dashboard/experience/ExperienceDetailSection";
import { AIGenerateDescModal } from "@/components/dashboard/common/AIGenerateDescModal";

import { ApiError } from "@/api/apiError";
import type {
  ExperienceResponse,
  UpdateExperienceRequest,
  CreateExperienceRequest,
  GenerateExperienceDescRequest,
} from "@/@types";
import { useAdminExperiences } from "@/hooks/queries";
import { useCreateExperience } from "@/hooks/mutations/experience/useCreateExperience";
import { useUpdateExperience } from "@/hooks/mutations/experience/useUpdateExperience";
import { useDeleteExperience } from "@/hooks/mutations/experience/useDeleteExperience";
import { useUploadImage } from "@/hooks/mutations/useUploadImage";
import { useUploadExperienceImage } from "@/hooks/mutations/experience/useUploadExperienceImage";
import { useGenerateExperienceDescription } from "@/hooks/mutations/agent/generate_description/useGenerateExperienceDesc";
import { useFormData } from "@/hooks/ui/useFormData";
import { useToast } from "@/hooks/ui/useToast";

type ActiveView =
  | { type: "list" }
  | { type: "add" }
  | { type: "edit"; experience: ExperienceResponse }
  | { type: "detail"; experience: ExperienceResponse };

const EMPTY_FORM: UpdateExperienceRequest = {
  position: "",
  company_name: "",
  link_url: "",
  image_url: "",
  location: "",
  employment_type: undefined,
  location_type: undefined,
  start_date: "",
  end_date: "",
  description: "",
};

export default function ExperiencePage() {
  const [activeView, setActiveView] = useState<ActiveView>({ type: "list" });
  const [activeTab, setActiveTab] = useState("list");
  const { toast, renderToasts } = useToast();

  const [experience, setExperience] = useState<ExperienceResponse>();

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailBlob, setThumbnailBlob] = useState<string | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [previousDesc, setPreviousDesc] = useState<string | null>(null);

  const { data: experiences, isLoading, refetch } = useAdminExperiences();

  const form = useFormData<UpdateExperienceRequest>({
    initialValues: EMPTY_FORM,
    onSubmit: () => {},
  });

  // Sync form saat edit
  useEffect(() => {
    if (!experience) return;
    form.setValues({
      position: experience.position ?? "",
      company_name: experience.company_name ?? "",
      link_url: experience.link_url ?? "",
      image_url: experience.image_url ?? "",
      location: experience.location ?? "",
      employment_type:
        experience.employment_type as UpdateExperienceRequest["employment_type"],
      location_type:
        experience.location_type as UpdateExperienceRequest["location_type"],
      start_date: experience.start_date
        ? experience.start_date.split("T")[0]
        : "",
      end_date: experience.end_date ? experience.end_date.split("T")[0] : "",
      description: experience.description ?? "",
    });
  }, [experience]);

  // ── Mutations ─────────────────────────────────────────────────────────────
  const createMutation = useCreateExperience({
    onSuccess: () => {
      toast("success", "Berhasil", "Experience berhasil ditambahkan");
      refetch();
      goList();
    },
    onError: (error: ApiError) => toast("error", "Error", error.message),
  });

  const updateMutation = useUpdateExperience({
    onSuccess: () => {
      toast("success", "Berhasil", "Experience berhasil diperbarui");
      refetch();
      goList();
    },
    onError: (error: ApiError) => toast("error", "Error", error.message),
  });

  const deleteMutation = useDeleteExperience({
    onSuccess: () => {
      toast("success", "Berhasil", "Experience berhasil dihapus");
      refetch();
    },
    onError: (error: ApiError) => toast("error", "Error", error.message),
  });

  const uploadMutation = useUploadImage({
    onError: (error: ApiError) => toast("error", "Gagal Upload", error.message),
  });

  const specificUploadMutation = useUploadExperienceImage({
    onError: (error: ApiError) => toast("error", "Gagal Upload", error.message),
  });

  const generateDescMutation = useGenerateExperienceDescription({
    onSuccess: (response) => {
      const combined = `${response.summary}\n\n${response.bullets.map((b) => `• ${b.title}: ${b.description}`).join("\n")}`;
      setPreviousDesc(form.values.description ?? "");
      form.handleChange("description", combined);
      toast(
        "success",
        "Berhasil",
        "Deskripsi Experience berhasil digenerate oleh AI!",
      );
    },
    onError: (error: ApiError) => {
      toast("error", "Gagal Generate", error.message);
    },
  });

  const isSaving =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending ||
    uploadMutation.isPending ||
    specificUploadMutation.isPending;

  // ── Save handler ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    try {
      let payload = { ...form.values };

      // Format dates to RFC3339 (backend validation expects valid time string)
      if (payload.start_date && !payload.start_date.includes("T")) {
        payload.start_date = `${payload.start_date}T00:00:00Z`;
      }
      if (!payload.end_date) {
        delete payload.end_date;
      } else if (!payload.end_date.includes("T")) {
        payload.end_date = `${payload.end_date}T00:00:00Z`;
      }

      // Upload thumbnail jika ada file baru
      if (thumbnailFile) {
        const fd = new FormData();
        if (activeView.type === "edit" && experience) {
          fd.append("image", thumbnailFile);
          const resUrl = await specificUploadMutation.mutateAsync(fd);
          payload.image_url = resUrl;
        } else {
          fd.append("images", thumbnailFile);
          const res = await uploadMutation.mutateAsync(fd);
          payload.image_url = res.image_url[0];
        }
      }

      if (activeView.type === "edit" && experience) {
        await updateMutation.mutateAsync({ id: experience.id, payload });
      } else if (activeView.type === "add") {
        await createMutation.mutateAsync(payload as CreateExperienceRequest);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateDesc = (opts: {
    tone: string;
    language: string;
    userNotes: string;
  }) => {
    setIsAIModalOpen(false);
    const payload: GenerateExperienceDescRequest = {
      company: form.values.company_name ?? "",
      role: form.values.position ?? "",
      start_date: form.values.start_date ?? "",
      end_date: form.values.end_date ?? "Present",
      tone: opts.tone,
      language: opts.language,
      user_notes: opts.userNotes,
    };
    generateDescMutation.mutate(payload);
  };

  const handleUndoDesc = () => {
    if (previousDesc === null) return;
    form.handleChange("description", previousDesc);
    setPreviousDesc(null);
    toast("success", "Berhasil", "Deskripsi berhasil di-undo.");
  };

  // ── Reset form ────────────────────────────────────────────────────────────
  const handleCancel = () => {
    form.setValues(EMPTY_FORM);
    setThumbnailFile(null);
    setThumbnailBlob(null);
    setExperience(undefined);
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

  const handleEdit = (e: ExperienceResponse) => {
    setExperience(e);
    setActiveView({ type: "edit", experience: e });
    setActiveTab("form");
  };

  const handleViewDetail = (e: ExperienceResponse) => {
    setActiveView({ type: "detail", experience: e });
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

      <AIGenerateDescModal
        open={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onGenerate={handleGenerateDesc}
        isGenerating={generateDescMutation.isPending}
        title="Generate Experience Description"
        description="Biarkan AI menyusun deskripsi pengalaman kerja kamu berdasarkan data yang sudah diisi."
      />

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Experience</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola pengalaman kerja portofolio kamu
        </p>
      </div>

      <Separator />

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList variant="line">
          <TabsTrigger value="list">Experience</TabsTrigger>
          <TabsTrigger value="form" disabled={activeView.type === "list"}>
            {activeView.type === "edit" ? "Edit Experience" : "Add Experience"}
          </TabsTrigger>
          <TabsTrigger value="detail" disabled={activeView.type !== "detail"}>
            Detail
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          {/* List */}
          <TabsContent value="list" className="mt-0">
            <ExperienceListSection
              experiences={
                ((experiences as unknown as ExperienceResponse[])?.length ??
                  0) > 0
                  ? (experiences as unknown as ExperienceResponse[])
                  : []
              }
              isLoading={
                isLoading &&
                !((experiences as unknown as ExperienceResponse[])?.length ?? 0)
              }
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetail={handleViewDetail}
            />
          </TabsContent>

          {/* Add / Edit */}
          <TabsContent value="form" className="mt-0">
            {(activeView.type === "add" || activeView.type === "edit") && (
              <ExperienceFormSection
                mode={activeView.type}
                initialData={
                  activeView.type === "edit" ? activeView.experience : undefined
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
                onGenerateDesc={() => setIsAIModalOpen(true)}
                isGeneratingDesc={generateDescMutation.isPending}
                onUndoDesc={handleUndoDesc}
                canUndoDesc={previousDesc !== null}
              />
            )}
          </TabsContent>

          {/* Detail */}
          <TabsContent value="detail" className="mt-0">
            {activeView.type === "detail" && (
              <ExperienceDetailSection
                experience={activeView.experience}
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
