import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Loader2Icon,
  SparklesIcon,
  UserIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  FolderOpenIcon,
  WrenchIcon,
  Trash2Icon,
  PencilIcon,
  SendIcon,
  XCircleIcon,
  CheckCircle2Icon,
} from "lucide-react";

import { useCreateParsedCV } from "@/hooks/mutations/agent/useCreateParsedCV";
import { useUpdateProfile } from "@/hooks/mutations/profile/useUpdateProfile";
import { useCreateExperience } from "@/hooks/mutations/experience/useCreateExperience";
import { useCreateEducation } from "@/hooks/mutations/education/useCreateEducation";
import { useCreateProject } from "@/hooks/mutations/project/useCreateProject";
import { useCreateSkill } from "@/hooks/mutations/skill/useCreateSkill";
import { useToast } from "@/hooks/ui/useToast";
import { ApiError } from "@/api/apiError";

import type {
  ParsedCVResponse,
  ProfileResponse,
  ExperienceResponse,
  EducationResponse,
  ProjectResponse,
  SkillResponse,
  UpdateProfileRequest,
  CreateExperienceRequest,
  CreateEducationRequest,
  CreateProjectRequest,
  CreateSkillRequest,
} from "@/@types";

type PageState = "idle" | "parsing" | "preview" | "submitting";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 5 * 1024 * 1024;

export default function CVBuilderPage() {
  const [pageState, setPageState] = useState<PageState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedCVResponse | null>(null);
  const [submitProgress, setSubmitProgress] = useState("");
  const { toast, renderToasts } = useToast();

  const parseMutation = useCreateParsedCV({
    onSuccess: (data) => {
      setParsedData(data);
      setPageState("preview");
      toast("success", "Berhasil", "CV berhasil di-parse oleh AI!");
    },
    onError: (error: ApiError) => {
      setPageState("idle");
      toast("error", "Gagal", error.message);
    },
  });

  const updateProfileMutation = useUpdateProfile();
  const createExperienceMutation = useCreateExperience();
  const createEducationMutation = useCreateEducation();
  const createProjectMutation = useCreateProject();
  const createSkillMutation = useCreateSkill();

  const validateFile = (f: File): string | null => {
    if (!ALLOWED_TYPES.includes(f.type))
      return "Hanya file PDF dan DOCX yang diperbolehkan";
    if (f.size > MAX_SIZE) return "Ukuran file maksimal 5MB";
    return null;
  };

  const handleFileSelect = (f: File) => {
    const err = validateFile(f);
    if (err) {
      toast("error", "File tidak valid", err);
      return;
    }
    setFile(f);
  };

  const handleBuild = () => {
    if (!file) return;
    setPageState("parsing");
    const fd = new FormData();
    fd.append("cv", file);
    parseMutation.mutate(fd);
  };

  const handleProfileChange = <K extends keyof ProfileResponse>(
    key: K,
    value: ProfileResponse[K],
  ) => {
    if (!parsedData) return;
    setParsedData({
      ...parsedData,
      profile: { ...parsedData.profile, [key]: value },
    });
  };

  const handleExperienceChange = (
    idx: number,
    key: keyof ExperienceResponse,
    value: string,
  ) => {
    if (!parsedData) return;
    const updated = [...parsedData.experiences];
    updated[idx] = { ...updated[idx], [key]: value };
    setParsedData({ ...parsedData, experiences: updated });
  };

  const handleEducationChange = (
    idx: number,
    key: keyof EducationResponse,
    value: string,
  ) => {
    if (!parsedData) return;
    const updated = [...parsedData.educations];
    updated[idx] = { ...updated[idx], [key]: value };
    setParsedData({ ...parsedData, educations: updated });
  };

  const handleProjectChange = (
    idx: number,
    key: keyof ProjectResponse,
    value: string,
  ) => {
    if (!parsedData) return;
    const updated = [...parsedData.projects];
    updated[idx] = { ...updated[idx], [key]: value };
    setParsedData({ ...parsedData, projects: updated });
  };

  const handleSkillChange = (
    idx: number,
    key: keyof SkillResponse,
    value: string,
  ) => {
    if (!parsedData) return;
    const updated = [...parsedData.skills];
    updated[idx] = { ...updated[idx], [key]: value };
    setParsedData({ ...parsedData, skills: updated });
  };

  const removeExperience = (idx: number) => {
    if (!parsedData) return;
    setParsedData({
      ...parsedData,
      experiences: parsedData.experiences.filter((_, i) => i !== idx),
    });
  };
  const removeEducation = (idx: number) => {
    if (!parsedData) return;
    setParsedData({
      ...parsedData,
      educations: parsedData.educations.filter((_, i) => i !== idx),
    });
  };
  const removeProject = (idx: number) => {
    if (!parsedData) return;
    setParsedData({
      ...parsedData,
      projects: parsedData.projects.filter((_, i) => i !== idx),
    });
  };
  const removeSkill = (idx: number) => {
    if (!parsedData) return;
    setParsedData({
      ...parsedData,
      skills: parsedData.skills.filter((_, i) => i !== idx),
    });
  };

  const handleSubmitAll = async () => {
    if (!parsedData) return;
    setPageState("submitting");

    try {
      setSubmitProgress("Menyimpan profil...");
      const profilePayload: UpdateProfileRequest = {
        full_name: parsedData.profile.full_name,
        image_url: parsedData.profile.image_url || "",
        address: parsedData.profile.address || "",
        about: parsedData.profile.about || "",
        bio: parsedData.profile.bio || "",
        theme: parsedData.profile.theme || "",
        tags: parsedData.profile.tags || [],
      };
      await updateProfileMutation.mutateAsync(profilePayload);

      for (let i = 0; i < parsedData.experiences.length; i++) {
        setSubmitProgress(
          `Menyimpan experience ${i + 1}/${parsedData.experiences.length}...`,
        );
        const exp = parsedData.experiences[i];
        const payload: CreateExperienceRequest = {
          position: exp.position,
          company_name: exp.company_name,
          location: exp.location || undefined,
          employment_type:
            (exp.employment_type as CreateExperienceRequest["employment_type"]) ||
            undefined,
          location_type:
            (exp.location_type as CreateExperienceRequest["location_type"]) ||
            undefined,
          start_date: exp.start_date,
          end_date: exp.end_date || undefined,
          description: exp.description || undefined,
        };
        await createExperienceMutation.mutateAsync(payload);
      }

      for (let i = 0; i < parsedData.educations.length; i++) {
        setSubmitProgress(
          `Menyimpan education ${i + 1}/${parsedData.educations.length}...`,
        );
        const edu = parsedData.educations[i];
        const payload: CreateEducationRequest = {
          institution: edu.institution,
          degree: edu.degree || undefined,
          field_of_study: edu.field_of_study || undefined,
          grade: edu.grade || undefined,
          location: edu.location || undefined,
          start_date: edu.start_date,
          end_date: edu.end_date || undefined,
          description: edu.description || undefined,
        };
        await createEducationMutation.mutateAsync(payload);
      }

      for (let i = 0; i < parsedData.projects.length; i++) {
        setSubmitProgress(
          `Menyimpan project ${i + 1}/${parsedData.projects.length}...`,
        );
        const proj = parsedData.projects[i];
        const payload: CreateProjectRequest = {
          title: proj.title,
          description: proj.description,
          tools: proj.tools || undefined,
        };
        await createProjectMutation.mutateAsync(payload);
      }

      for (let i = 0; i < parsedData.skills.length; i++) {
        setSubmitProgress(
          `Menyimpan skill ${i + 1}/${parsedData.skills.length}...`,
        );
        const skill = parsedData.skills[i];
        const payload: CreateSkillRequest = {
          title: skill.title,
          level: skill.level || "Intermediate",
        };
        await createSkillMutation.mutateAsync(payload);
      }

      toast(
        "success",
        "Berhasil!",
        "Semua data CV berhasil disimpan ke portofolio kamu.",
      );
      setPageState("idle");
      setFile(null);
      setParsedData(null);
    } catch (err) {
      const apiErr = err as ApiError;
      toast(
        "error",
        "Gagal Menyimpan",
        apiErr?.message || "Terjadi kesalahan saat menyimpan data",
      );
      setPageState("preview");
    }
  };

  const handleReset = () => {
    setPageState("idle");
    setFile(null);
    setParsedData(null);
    setSubmitProgress("");
  };

  return (
    <div className="flex flex-col gap-6">
      {renderToasts()}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <SparklesIcon className="size-6 text-violet-500" />
            CV Builder
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload CV kamu dan biarkan AI mengisi semua data portofolio secara
            otomatis
          </p>
        </div>
        {pageState === "preview" && (
          <Button variant="outline" size="sm" onClick={handleReset}>
            Upload Ulang
          </Button>
        )}
      </div>

      <Separator />

      {/* ── IDLE: Upload Area ── */}
      {pageState === "idle" && (
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="w-full max-w-lg">
            <FileUpload
              onChange={(files) => {
                const f = files[0];
                if (f) handleFileSelect(f);
              }}
            />
          </div>

          {file && (
            <Button
              onClick={handleBuild}
              size="lg"
              className="gap-2 px-8 cursor-pointer"
            >
              <SparklesIcon className="size-4" />
              Generate with AI
            </Button>
          )}
        </div>
      )}

      {/* ── PARSING: Skeleton Loading ── */}
      {pageState === "parsing" && <ParsingSkeletonView />}

      {/* ── SUBMITTING: Progress ── */}
      {pageState === "submitting" && (
        <div className="flex flex-col items-center gap-4 py-16">
          <Loader2Icon className="size-10 animate-spin text-violet-500" />
          <p className="text-sm font-medium">{submitProgress}</p>
          <p className="text-xs text-muted-foreground">
            Mohon tunggu, sedang menyimpan data ke portofolio...
          </p>
        </div>
      )}

      {/* ── PREVIEW: Editable Sections ── */}
      {pageState === "preview" && parsedData && (
        <div className="flex flex-col gap-6">
          {/* Profile */}
          <PreviewSection
            icon={<UserIcon className="size-5" />}
            title="Profile"
            count={1}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LabeledInput
                label="Nama Lengkap"
                value={parsedData.profile.full_name}
                onChange={(v) => handleProfileChange("full_name", v)}
              />
              <LabeledInput
                label="Alamat"
                value={parsedData.profile.address}
                onChange={(v) => handleProfileChange("address", v)}
              />
              <div className="md:col-span-2">
                <LabeledTextarea
                  label="Bio"
                  value={parsedData.profile.bio}
                  onChange={(v) => handleProfileChange("bio", v)}
                />
              </div>
              <div className="md:col-span-2">
                <LabeledTextarea
                  label="About"
                  value={parsedData.profile.about}
                  onChange={(v) => handleProfileChange("about", v)}
                  rows={4}
                />
              </div>
            </div>
          </PreviewSection>

          {/* Experiences */}
          <PreviewSection
            icon={<BriefcaseIcon className="size-5" />}
            title="Experience"
            count={parsedData.experiences.length}
          >
            {parsedData.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="relative rounded-lg border p-4 space-y-3"
              >
                <button
                  onClick={() => removeExperience(idx)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2Icon className="size-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <LabeledInput
                    label="Posisi"
                    value={exp.position}
                    onChange={(v) => handleExperienceChange(idx, "position", v)}
                  />
                  <LabeledInput
                    label="Perusahaan"
                    value={exp.company_name}
                    onChange={(v) =>
                      handleExperienceChange(idx, "company_name", v)
                    }
                  />
                  <LabeledInput
                    label="Lokasi"
                    value={exp.location}
                    onChange={(v) => handleExperienceChange(idx, "location", v)}
                  />
                  <LabeledInput
                    label="Tipe"
                    value={exp.employment_type}
                    onChange={(v) =>
                      handleExperienceChange(idx, "employment_type", v)
                    }
                  />
                </div>
                <LabeledTextarea
                  label="Deskripsi"
                  value={exp.description}
                  onChange={(v) =>
                    handleExperienceChange(idx, "description", v)
                  }
                />
              </div>
            ))}
            {parsedData.experiences.length === 0 && (
              <EmptyNotice text="Tidak ada data experience ditemukan" />
            )}
          </PreviewSection>

          {/* Educations */}
          <PreviewSection
            icon={<GraduationCapIcon className="size-5" />}
            title="Education"
            count={parsedData.educations.length}
          >
            {parsedData.educations.map((edu, idx) => (
              <div
                key={idx}
                className="relative rounded-lg border p-4 space-y-3"
              >
                <button
                  onClick={() => removeEducation(idx)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2Icon className="size-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <LabeledInput
                    label="Institusi"
                    value={edu.institution}
                    onChange={(v) =>
                      handleEducationChange(idx, "institution", v)
                    }
                  />
                  <LabeledInput
                    label="Gelar"
                    value={edu.degree}
                    onChange={(v) => handleEducationChange(idx, "degree", v)}
                  />
                  <LabeledInput
                    label="Bidang Studi"
                    value={edu.field_of_study}
                    onChange={(v) =>
                      handleEducationChange(idx, "field_of_study", v)
                    }
                  />
                  <LabeledInput
                    label="IPK"
                    value={edu.grade}
                    onChange={(v) => handleEducationChange(idx, "grade", v)}
                  />
                </div>
                <LabeledTextarea
                  label="Deskripsi"
                  value={edu.description}
                  onChange={(v) => handleEducationChange(idx, "description", v)}
                />
              </div>
            ))}
            {parsedData.educations.length === 0 && (
              <EmptyNotice text="Tidak ada data education ditemukan" />
            )}
          </PreviewSection>

          {/* Projects */}
          <PreviewSection
            icon={<FolderOpenIcon className="size-5" />}
            title="Projects"
            count={parsedData.projects.length}
          >
            {parsedData.projects.map((proj, idx) => (
              <div
                key={idx}
                className="relative rounded-lg border p-4 space-y-3"
              >
                <button
                  onClick={() => removeProject(idx)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2Icon className="size-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <LabeledInput
                    label="Judul"
                    value={proj.title}
                    onChange={(v) => handleProjectChange(idx, "title", v)}
                  />
                  <LabeledInput
                    label="Tools"
                    value={(proj.tools || []).join(", ")}
                    onChange={(v) => {
                      if (!parsedData) return;
                      const updated = [...parsedData.projects];
                      updated[idx] = {
                        ...updated[idx],
                        tools: v
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      };
                      setParsedData({ ...parsedData, projects: updated });
                    }}
                  />
                </div>
                <LabeledTextarea
                  label="Deskripsi"
                  value={proj.description}
                  onChange={(v) => handleProjectChange(idx, "description", v)}
                />
              </div>
            ))}
            {parsedData.projects.length === 0 && (
              <EmptyNotice text="Tidak ada data project ditemukan" />
            )}
          </PreviewSection>

          {/* Skills */}
          <PreviewSection
            icon={<WrenchIcon className="size-5" />}
            title="Skills"
            count={parsedData.skills.length}
          >
            <div className="flex flex-wrap gap-2">
              {parsedData.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors hover:border-violet-500/50"
                >
                  <input
                    className="bg-transparent outline-none w-auto min-w-[60px] max-w-[140px]"
                    value={skill.title}
                    onChange={(e) =>
                      handleSkillChange(idx, "title", e.target.value)
                    }
                    style={{
                      width: `${Math.max(60, skill.title.length * 8)}px`,
                    }}
                  />
                  <select
                    className="bg-transparent text-xs text-muted-foreground outline-none cursor-pointer"
                    value={skill.level}
                    onChange={(e) =>
                      handleSkillChange(idx, "level", e.target.value)
                    }
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    onClick={() => removeSkill(idx)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <XCircleIcon className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
            {parsedData.skills.length === 0 && (
              <EmptyNotice text="Tidak ada data skill ditemukan" />
            )}
          </PreviewSection>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-2 pb-8">
            <Button variant="outline" onClick={handleReset}>
              Batal
            </Button>
            <Button onClick={handleSubmitAll} className="gap-2">
              <SendIcon className="size-4" />
              Simpan Semua ke Portofolio
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Sub Components ── */

function ParsingSkeletonView() {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex items-center gap-3 justify-center py-4">
        <Loader2Icon className="size-5 animate-spin text-violet-500" />
        <p className="text-sm font-medium animate-pulse">
          Sedang mem-parsing CV kamu dengan AI...
        </p>
      </div>
      {["Profile", "Experience", "Education", "Projects", "Skills"].map(
        (label) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Skeleton className="size-5 rounded" />
                <Skeleton className="h-4 w-24" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-9 rounded-md" />
                <Skeleton className="h-9 rounded-md" />
              </div>
              <Skeleton className="h-16 rounded-md" />
            </CardContent>
          </Card>
        ),
      )}
    </div>
  );
}

function PreviewSection({
  icon,
  title,
  count,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {count} item
          </span>
        </div>
        <CardDescription className="flex items-center gap-1 text-xs">
          <PencilIcon className="size-3" /> Klik field untuk mengedit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <Input value={value || ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <textarea
        className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
      />
    </div>
  );
}

function EmptyNotice({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
      <CheckCircle2Icon className="size-4 mr-2 text-emerald-500" />
      {text}
    </div>
  );
}
