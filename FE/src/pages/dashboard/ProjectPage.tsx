import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { ProjectListSection } from "@/sections/dashboard/projects/ProjectListSection";
import { ProjectFormSection } from "@/sections/dashboard/projects/ProjectFormSection";
import { ProjectDetailSection } from "@/sections/dashboard/projects/ProjectDetailSection";
import { AIGenerateDescModal } from "@/components/dashboard/common/AIGenerateDescModal";

import { ApiError } from "@/api/apiError";

import type {
  ProjectResponse,
  UpdateProjectRequest,
  CreateProjectRequest,
  GenerateProjectDescRequest,
} from "@/@types";
import { useAdminProjects } from "@/hooks/queries";
import { useUpdateProject } from "@/hooks/mutations/project/useUpdateProject";
import { useCreateProject } from "@/hooks/mutations/project/useCreateProject";
import { useDeleteProject } from "@/hooks/mutations/project/useDeleteProject";
import { useUploadProjectThumbnail } from "@/hooks/mutations/project/useUploadProjectThumbnail";
import { useUploadProjectGallery } from "@/hooks/mutations/project/useUploadProjectGallery";
import { useGenerateProjectDescription } from "@/hooks/mutations/agent/generate_description/useGenerateProjectDesc";
import { useFormData } from "@/hooks/ui/useFormData";
import { useToast } from "@/hooks/ui/useToast";

type ActiveView =
  | { type: "list" }
  | { type: "add" }
  | { type: "edit"; project: ProjectResponse }
  | { type: "detail"; project: ProjectResponse };

export default function ProjectPage() {
  const [page, setPage] = useState(1);
  const [search] = useState("");

  const [activeView, setActiveView] = useState<ActiveView>({ type: "list" });
  const [activeTab, setActiveTab] = useState("list");

  const { toast, renderToasts } = useToast();

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [thumbnailBlob, setThumbnailBlob] = useState<string | null>(null);
  const [galleryBlobs, setGalleryBlobs] = useState<string[]>([]);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [previousDesc, setPreviousDesc] = useState<string | null>(null);

  const {
    data: projects,
    isLoading,
    refetch,
  } = useAdminProjects({
    page: page,
    size: 8,
    title: search,
  });

  const totalPage = projects?.paging?.total_page || 1;
  const [project, setProject] = useState<ProjectResponse>();

  const form = useFormData<UpdateProjectRequest>({
    initialValues: {
      title: "",
      description: "",
      image_url: "",
      link_url: "",
      challenges: "",
      solution: "",
      featured: false,
      features: [],
      gallery: [],
      tools: [],
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    if (!project) return;
    form.setValues({
      title: project.title ?? "",
      description: project.description ?? "",
      image_url: project.image_url ?? "",
      link_url: project.link_url ?? "",
      challenges: project.challenges ?? "",
      solution: project.solution ?? "",
      featured: project.featured ?? false,
      features: project.features ?? [],
      gallery: project.gallery ?? [],
      tools: project.tools ?? [],
    });
  }, [project]);

  const createProjectMutation = useCreateProject({
    onSuccess: () => {
      toast("success", "Berhasil", "Project berhasil ditambahkan");
      refetch();
      goList();
    },
    onError: (error: ApiError) => {
      toast("error", "Error", error.message);
    },
  });

  const updateProjectMutation = useUpdateProject({
    onSuccess: () => {
      toast("success", "Berhasil", "Project berhasil diperbarui");
      refetch();
      goList();
    },
    onError: (error: ApiError) => {
      toast("error", "Error", error.message);
    },
  });

  const deleteProjectMutation = useDeleteProject({
    onSuccess: () => {
      toast("success", "Berhasil", "Project berhasil dihapus");
      refetch();
    },
    onError: (error: ApiError) => {
      toast("error", "Error", error.message);
    },
  });

  const uploadThumbnailMutation = useUploadProjectThumbnail({
    onError: (error: ApiError) => {
      toast("error", "Gagal Upload Thumbnail", error.message);
    },
  });

  const uploadGalleryMutation = useUploadProjectGallery({
    onError: (error: ApiError) => {
      toast("error", "Gagal Upload Gallery", error.message);
    },
  });

  const generateDescMutation = useGenerateProjectDescription({
    onSuccess: (response) => {
      const formattedArray = response.key_features.map((feature) => ({
        title: feature.group_title,
        items: feature.items,
      }));

      setPreviousDesc(form.values.description ?? "");
      form.handleChange("description", response.summary);
      form.handleChange("challenges", response.challenge);
      form.handleChange("solution", response.solution);
      form.handleChange("features", formattedArray);

      toast(
        "success",
        "Berhasil",
        "Deskripsi Project berhasil digenerate oleh AI!",
      );
    },
    onError: (error: ApiError) => {
      toast("error", "Gagal Generate", error.message);
    },
  });

  const handleSave = async () => {
    try {
      let payload = { ...form.values };

      // Upload Thumbnail
      if (thumbnailFile) {
        const formData = new FormData();
        formData.append("image", thumbnailFile);

        if (activeView.type === "edit" && project) {
          formData.append("id", project.id);
        }

        const resUrl = await uploadThumbnailMutation.mutateAsync(formData);
        payload.image_url = resUrl;
      }

      // Upload Gallery Images
      if (galleryFiles && galleryFiles.length > 0) {
        const formData = new FormData();
        galleryFiles.forEach((file) => formData.append("gallery", file));

        if (activeView.type === "edit" && project) {
          formData.append("id", project.id);
        }

        const newImageUrls = await uploadGalleryMutation.mutateAsync(formData);

        let urlIndex = 0;
        payload.gallery =
          payload.gallery?.map((item) => {
            if (item.image_url.startsWith("blob:")) {
              return {
                ...item,
                image_url: newImageUrls[urlIndex++],
              };
            }
            return item;
          }) ?? [];
      }

      // Last Hit Endpoint
      if (activeView.type === "edit" && project) {
        await updateProjectMutation.mutateAsync({
          id: project.id,
          payload,
        });
      } else if (activeView.type === "add") {
        await createProjectMutation.mutateAsync(
          payload as CreateProjectRequest,
        );
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
    const payload: GenerateProjectDescRequest = {
      title: form.values.title ?? "",
      role: "",
      stack: form.values.tools ?? [],
      duration: "",
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

  const isSaving =
    updateProjectMutation.isPending ||
    createProjectMutation.isPending ||
    deleteProjectMutation.isPending ||
    uploadThumbnailMutation.isPending ||
    uploadGalleryMutation.isPending;

  const handleCancel = () => {
    form.setValues({
      title: "",
      description: "",
      image_url: "",
      link_url: "",
      challenges: "",
      solution: "",
      featured: false,
      features: [],
      gallery: [],
      tools: [],
    });
    setThumbnailFile(null);
    setGalleryFiles([]);
    setThumbnailBlob(null);
    setGalleryBlobs([]);
    setProject(undefined);
  };

  // ── Handlers ─────────────────────────────────────────────────────────────
  const goList = () => {
    handleCancel();
    setActiveView({ type: "list" });
    setActiveTab("list");
  };

  const handleAdd = () => {
    setActiveView({ type: "add" });
    setActiveTab("form");
  };

  const handleEdit = (project: ProjectResponse) => {
    setActiveView({ type: "edit", project });
    setProject(project);
    setActiveTab("form");
  };

  const handleViewDetail = (project: ProjectResponse) => {
    setActiveView({ type: "detail", project });
    setActiveTab("detail");
  };

  const handleDelete = (id: string) => {
    deleteProjectMutation.mutate(id);
  };

  const handleTabChange = (val: string) => {
    if (val === "list") goList();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      {renderToasts()}

      <AIGenerateDescModal
        open={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onGenerate={handleGenerateDesc}
        isGenerating={generateDescMutation.isPending}
        title="Generate Project Description"
        description="Biarkan AI menyusun deskripsi project kamu berdasarkan data yang sudah diisi."
      />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola karya dan proyek portofolio kamu
        </p>
      </div>

      <Separator />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList variant="line">
          <TabsTrigger value="list">Project</TabsTrigger>
          <TabsTrigger value="form" disabled={activeView.type === "list"}>
            {activeView.type === "edit" ? "Edit Project" : "Add Project"}
          </TabsTrigger>
          <TabsTrigger value="detail" disabled={activeView.type !== "detail"}>
            Detail
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          {/* List */}
          <TabsContent value="list" className="mt-0">
            <ProjectListSection
              projects={projects?.data ?? []}
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

          {/* Add / Edit form */}
          <TabsContent value="form" className="mt-0">
            {(activeView.type === "add" || activeView.type === "edit") && (
              <ProjectFormSection
                mode={activeView.type}
                initialData={
                  activeView.type === "edit" ? activeView.project : undefined
                }
                onBack={goList}
                onSave={handleSave}
                values={form.values}
                onChange={form.handleChange}
                thumbnailFile={thumbnailFile}
                setThumbnailFile={setThumbnailFile}
                thumbnailBlob={thumbnailBlob}
                setThumbnailBlob={setThumbnailBlob}
                galleryFiles={galleryFiles}
                setGalleryFiles={setGalleryFiles}
                galleryBlobs={galleryBlobs}
                setGalleryBlobs={setGalleryBlobs}
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
              <ProjectDetailSection
                project={activeView.project}
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
