import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { SkillListSection } from "@/sections/dashboard/skills/SkillListSection";
import { SkillFormSection } from "@/sections/dashboard/skills/SkillFormSection";

import { ApiError } from "@/api/apiError";
import type {
  SkillResponse,
  UpdateSkillRequest,
  CreateSkillRequest,
} from "@/@types";
import { useAdminSkills } from "@/hooks/queries";
import { useCreateSkill } from "@/hooks/mutations/skill/useCreateSkill";
import { useUpdateSkill } from "@/hooks/mutations/skill/useUpdateSkill";
import { useDeleteSkill } from "@/hooks/mutations/skill/useDeleteSkill";
import { useFormData } from "@/hooks/ui/useFormData";
import { useToast } from "@/hooks/ui/useToast";

type ActiveView =
  | { type: "list" }
  | { type: "add" }
  | { type: "edit"; skill: SkillResponse };

const EMPTY_FORM: UpdateSkillRequest = {
  title: "",
  level: "Beginner",
};

export default function SkillPage() {
  const [activeView, setActiveView] = useState<ActiveView>({ type: "list" });
  const [activeTab, setActiveTab] = useState("list");
  const { toast, renderToasts } = useToast();

  const [skill, setSkill] = useState<SkillResponse>();
  const { data: skills, isLoading, refetch } = useAdminSkills();

  const form = useFormData<UpdateSkillRequest>({
    initialValues: EMPTY_FORM,
    onSubmit: () => {},
  });

  /* Sync form saat edit */
  useEffect(() => {
    if (!skill) return;
    form.setValues({
      title: skill.title ?? "",
      level: skill.level ?? "Beginner",
    });
  }, [skill]);

  /* Mutations */
  const createMutation = useCreateSkill({
    onSuccess: () => {
      toast("success", "Berhasil", "Skill berhasil ditambahkan");
      refetch();
      goList();
    },
    onError: (error: ApiError) => toast("error", "Error", error.message),
  });

  const updateMutation = useUpdateSkill({
    onSuccess: () => {
      toast("success", "Berhasil", "Skill berhasil diperbarui");
      refetch();
      goList();
    },
    onError: (error: ApiError) => toast("error", "Error", error.message),
  });

  const deleteMutation = useDeleteSkill({
    onSuccess: () => {
      toast("success", "Berhasil", "Skill berhasil dihapus");
      refetch();
    },
    onError: (error: ApiError) => toast("error", "Error", error.message),
  });

  const isSaving =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  /* Save handler */
  const handleSave = async () => {
    try {
      const payload = { ...form.values };

      if (activeView.type === "edit" && skill) {
        await updateMutation.mutateAsync({ id: skill.id, payload });
      } else if (activeView.type === "add") {
        await createMutation.mutateAsync(payload as CreateSkillRequest);
      }
    } catch (err) {
      toast("error", "Error", "Gagal menyimpan data");
    }
  };

  /* Reset form */
  const handleCancel = () => {
    form.setValues(EMPTY_FORM);
    setSkill(undefined);
  };

  /* Navigation */
  const goList = () => {
    handleCancel();
    setActiveView({ type: "list" });
    setActiveTab("list");
  };

  const handleAdd = () => {
    setActiveView({ type: "add" });
    setActiveTab("form");
  };

  const handleEdit = (skill: SkillResponse) => {
    setSkill(skill);
    setActiveView({ type: "edit", skill });
    setActiveTab("form");
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleTabChange = (value: string) => {
    if (value === "list") goList();
  };

  return (
    <div className="flex flex-col gap-6">
      {renderToasts()}

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Skills</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola keahlian dan kemampuan portofolio kamu
        </p>
      </div>

      <Separator />

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList variant="line">
          <TabsTrigger value="list">Skills</TabsTrigger>
          <TabsTrigger value="form" disabled={activeView.type === "list"}>
            {activeView.type === "edit" ? "Edit Skill" : "Add Skill"}
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          {/* List */}
          <TabsContent value="list" className="mt-0">
            <SkillListSection
              skills={skills ?? []}
              isLoading={
                isLoading &&
                !((skills as unknown as SkillResponse[])?.length ?? 0)
              }
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>

          {/* Add / Edit */}
          <TabsContent value="form" className="mt-0">
            {(activeView.type === "add" || activeView.type === "edit") && (
              <SkillFormSection
                mode={activeView.type}
                initialData={
                  activeView.type === "edit" ? activeView.skill : undefined
                }
                onBack={goList}
                onSave={handleSave}
                values={form.values}
                onChange={(field, value) => form.handleChange(field, value)}
                isSaving={isSaving}
              />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
