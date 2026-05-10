import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { EducationListSection } from "@/sections/dashboard/education/EducationListSection";
import { EducationFormSection } from "@/sections/dashboard/education/EducationFormSection";
import { AIGenerateDescModal } from "@/components/dashboard/common/AIGenerateDescModal";

import { ApiError } from "@/api/apiError";
import type {
  EducationResponse,
  UpdateEducationRequest,
  CreateEducationRequest,
  GenerateEducationDescRequest,
} from "@/@types";
import { useAdminEducations } from "@/hooks/queries";
import { useCreateEducation } from "@/hooks/mutations/education/useCreateEducation";
import { useUpdateEducation } from "@/hooks/mutations/education/useUpdateEducation";
import { useDeleteEducation } from "@/hooks/mutations/education/useDeleteEducation";
import { useUploadImage } from "@/hooks/mutations/useUploadImage";
import { useGenerateEducationDescription } from "@/hooks/mutations/agent/generate_description/useGenerateEducationDesc";
import { useFormData } from "@/hooks/ui/useFormData";
import { useToast } from "@/hooks/ui/useToast";

type ActiveView =
  | { type: "list" }
  | { type: "add" }
  | { type: "edit"; education: EducationResponse };

const EMPTY_FORM: UpdateEducationRequest = {
  institution: "",
  degree: "",
  field_of_study: "",
  grade: "",
  image_url: "",
  location: "",
  start_date: "",
  end_date: "",
  description: "",
};

export default function EducationPage() {
  const [activeView, setActiveView] = useState<ActiveView>({ type: "list" });
  const [activeTab, setActiveTab] = useState("list");
  const { toast, renderToasts } = useToast();

  const [education, setEducation] = useState<EducationResponse>();

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailBlob, setThumbnailBlob] = useState<string | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [previousDesc, setPreviousDesc] = useState<string | null>(null);

  const { data: educations, isLoading, refetch } = useAdminEducations();

  const form = useFormData<UpdateEducationRequest>({
    initialValues: EMPTY_FORM,
    onSubmit: () => {},
  });

  // Sync form saat edit
  useEffect(() => {
    if (!education) return;
    form.setValues({
      institution: education.institution ?? "",
      degree: education.degree ?? "",
      field_of_study: education.field_of_study ?? "",
      grade: education.grade ?? "",
      image_url: education.image_url ?? "",
      location: education.location ?? "",
      start_date: education.start_date
        ? education.start_date.split("T")[0]
        : "",
      end_date: education.end_date ? education.end_date.split("T")[0] : "",
      description: education.description ?? "",
    });
  }, [education]);

  // ── Mutations ─────────────────────────────────────────────────────────────
  const createMutation = useCreateEducation({
    onSuccess: () => {
      toast("success", "Berhasil", "Education berhasil ditambahkan");
      refetch();
      goList();
    },
    onError: (error: ApiError) => toast("error", "Error", error.message),
  });

  const updateMutation = useUpdateEducation({
    onSuccess: () => {
      toast("success", "Berhasil", "Education berhasil diperbarui");
      refetch();
      goList();
    },
    onError: (error: ApiError) => toast("error", "Error", error.message),
  });

  const deleteMutation = useDeleteEducation({
    onSuccess: () => {
      toast("success", "Berhasil", "Education berhasil dihapus");
      refetch();
    },
    onError: (error: ApiError) => toast("error", "Error", error.message),
  });

  const uploadMutation = useUploadImage({
    onError: (error: ApiError) => toast("error", "Gagal Upload", error.message),
  });

  const generateDescMutation = useGenerateEducationDescription({
    onSuccess: (response) => {
      const combined = `${response.summary}\n\n${response.bullets.map((b) => `• ${b.title}: ${b.description}`).join("\n")}`;
      setPreviousDesc(form.values.description ?? "");
      form.handleChange("description", combined);
      toast(
        "success",
        "Berhasil",
        "Deskripsi Education berhasil digenerate oleh AI!",
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
    uploadMutation.isPending;

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
        fd.append("images", thumbnailFile);
        const res = await uploadMutation.mutateAsync(fd);
        payload.image_url = res.image_url[0];
      }

      if (activeView.type === "edit" && education) {
        await updateMutation.mutateAsync({ id: education.id, payload });
      } else if (activeView.type === "add") {
        await createMutation.mutateAsync(payload as CreateEducationRequest);
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
    const payload: GenerateEducationDescRequest = {
      institution: form.values.institution ?? "",
      degree: form.values.degree ?? "",
      start_year: form.values.start_date?.split("-")?.[0] ?? "",
      end_year: form.values.end_date?.split("-")?.[0] ?? "Present",
      gpa: form.values.grade ?? "",
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
    setEducation(undefined);
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

  const handleEdit = (e: EducationResponse) => {
    setEducation(e);
    setActiveView({ type: "edit", education: e });
    setActiveTab("form");
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
        title="Generate Education Description"
        description="Biarkan AI menyusun deskripsi pendidikan kamu berdasarkan data yang sudah diisi."
      />

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Education</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola riwayat pendidikan portofolio kamu
        </p>
      </div>

      <Separator />

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList variant="line">
          <TabsTrigger value="list">Education</TabsTrigger>
          <TabsTrigger value="form" disabled={activeView.type === "list"}>
            {activeView.type === "edit" ? "Edit Education" : "Add Education"}
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          {/* List */}
          <TabsContent value="list" className="mt-0">
            <EducationListSection
              educations={
                ((educations as unknown as EducationResponse[])?.length ?? 0) >
                0
                  ? (educations as unknown as EducationResponse[])
                  : []
              }
              isLoading={
                isLoading &&
                !((educations as unknown as EducationResponse[])?.length ?? 0)
              }
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>

          {/* Add / Edit */}
          <TabsContent value="form" className="mt-0">
            {(activeView.type === "add" || activeView.type === "edit") && (
              <EducationFormSection
                mode={activeView.type}
                initialData={
                  activeView.type === "edit" ? activeView.education : undefined
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
        </div>
      </Tabs>
    </div>
  );
}
