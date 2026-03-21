import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { ProjectListSection } from "@/sections/dashboard/projects/ProjectListSection";
import { ProjectFormSection } from "@/sections/dashboard/projects/ProjectFormSection";
import { ProjectDetailSection } from "@/sections/dashboard/projects/ProjectDetailSection";

import type {
  ProjectResponse,
  ProjectFormValues,
} from "@/@types/entities/project.types";
import { DUMMY_PROJECTS } from "@/@types/projects";

// ── View state ────────────────────────────────────────────────────────────────
type ActiveView =
  | { type: "list" }
  | { type: "add" }
  | { type: "edit"; project: ProjectResponse }
  | { type: "detail"; project: ProjectResponse };

export default function ProjectPage() {
  const [projects, setProjects] = useState<ProjectResponse[]>(DUMMY_PROJECTS);
  const [activeView, setActiveView] = useState<ActiveView>({ type: "list" });
  const [activeTab, setActiveTab] = useState("list");

  // ── Handlers ─────────────────────────────────────────────────────────────
  const goList = () => {
    setActiveView({ type: "list" });
    setActiveTab("list");
  };

  const handleAdd = () => {
    setActiveView({ type: "add" });
    setActiveTab("form");
  };

  const handleEdit = (project: ProjectResponse) => {
    setActiveView({ type: "edit", project });
    setActiveTab("form");
  };

  const handleViewDetail = (project: ProjectResponse) => {
    setActiveView({ type: "detail", project });
    setActiveTab("detail");
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (values: ProjectFormValues) => {
    if (activeView.type === "add") {
      const newProject: ProjectResponse = {
        ...values,
        id: Date.now().toString(),
        github_url: values.githubUrl ?? "",
        live_url: values.liveUrl ?? "",
        challenges: values.challenges ?? "",
        solution: values.solution ?? "",
        tech_stack: values.techStack,
        createdAt: Date.now(),
      };
      setProjects((prev) => [newProject, ...prev]);
    } else if (activeView.type === "edit") {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === activeView.project.id
            ? {
                ...p,
                ...values,
                github_url: values.githubUrl ?? "",
                live_url: values.liveUrl ?? "",
                challenges: values.challenges ?? "",
                solution: values.solution ?? "",
                tech_stack: values.techStack,
              }
            : p,
        ),
      );
    }
    goList();
  };

  // ── Tab change guard (prevent navigating to form/detail via tab click) ───
  const handleTabChange = (val: string) => {
    if (val === "list") goList();
    // "form" and "detail" tabs are controlled programmatically only
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
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
              projects={projects}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetail={handleViewDetail}
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
