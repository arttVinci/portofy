import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { ExperienceListSection } from "@/sections/dashboard/experience/ExperienceListSection";
import { ExperienceFormSection } from "@/sections/dashboard/experience/ExperienceFormSection";
import { ExperienceDetailSection } from "@/sections/dashboard/experience/ExperienceDetailSection";

import { ApiError } from "@/api/apiError";
import type {
  ExperienceResponse,
  UpdateExperienceRequest,
  CreateExperienceRequest,
} from "@/@types";
import { useAdminExperiences } from "@/hooks/queries";
import { useCreateExperience } from "@/hooks/mutations/experience/useCreateExperience";
import { useUpdateExperience } from "@/hooks/mutations/experience/useUpdateExperience";
import { useDeleteExperience } from "@/hooks/mutations/experience/useDeleteExperience";
import { useUploadImage } from "@/hooks/mutations/useUploadImage";
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

const DUMMY_EXPERIENCES: ExperienceResponse[] = [
  {
    id: "dummy-1",
    position: "Senior Frontend Engineer",
    company_name: "Gojek",
    link_url: "https://gojek.com",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Gojek_logo_%282019%29.svg/1200px-Gojek_logo_%282019%29.svg.png",
    location: "Jakarta, Indonesia",
    employment_type: "Full-time",
    location_type: "Hybrid",
    start_date: "2022-08-01T00:00:00Z",
    end_date: "",
    description:
      "Memimpin tim frontend yang terdiri dari 5 engineer untuk produk merchant dashboard.\nMeningkatkan performa web sebesar 40%.\nMigrasi arsitektur dari Vue ke React dengan Next.js.",
  },
  {
    id: "dummy-2",
    position: "Frontend Web Developer",
    company_name: "Tokopedia",
    link_url: "https://tokopedia.com",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_of_Tokopedia.svg/1200px-Logo_of_Tokopedia.svg.png",
    location: "Jakarta, Indonesia",
    employment_type: "Full-time",
    location_type: "On-site",
    start_date: "2020-09-15T00:00:00Z",
    end_date: "2022-07-31T00:00:00Z",
    description:
      "Mengembangkan fitur di halaman detail produk (PDP) yang digunakan jutaan pengunjung per bulan.\nDianugerahi 'Best Rookie Engineer' pada Q4 2020.",
  },
  {
    id: "dummy-3",
    position: "Web Developer Intern",
    company_name: "Traveloka",
    link_url: "https://traveloka.com",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/4/4b/Traveloka_logo_2022.png",
    location: "Jakarta, Indonesia",
    employment_type: "Internship",
    location_type: "Remote",
    start_date: "2019-06-01T00:00:00Z",
    end_date: "2019-08-31T00:00:00Z",
    description:
      "Membantu pembuatan internal dashboard untuk tim Customer Service menggunakan React.\nMemperbaiki 50+ bug UI layout.",
  },
];

export default function ExperiencePage() {
  const [activeView, setActiveView] = useState<ActiveView>({ type: "list" });
  const [activeTab, setActiveTab] = useState("list");
  const { toast, renderToasts } = useToast();

  const [experience, setExperience] = useState<ExperienceResponse>();

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailBlob, setThumbnailBlob] = useState<string | null>(null);

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
      start_date: experience.start_date ?? "",
      end_date: experience.end_date ?? "",
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

  const isSaving =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending ||
    uploadMutation.isPending;

  // ── Save handler ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    try {
      let payload = { ...form.values };

      // Upload thumbnail jika ada file baru
      if (thumbnailFile) {
        const fd = new FormData();
        fd.append("images", thumbnailFile);
        const res = await uploadMutation.mutateAsync(fd);
        payload.image_url = res.urls[0];
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
                  : DUMMY_EXPERIENCES
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
