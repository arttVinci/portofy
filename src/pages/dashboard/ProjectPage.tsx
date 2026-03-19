import { useState } from "react";
import type { ProjectResponse } from "@/@types/entities/project";
import type { ProjectFormData } from "@/components/dashboard/projects/ProjectFormDialog";
import { DUMMY_PROJECTS } from "@/data/dummyProjects";
import { generateId } from "@/utils/generateId";

import ProjectHeaderSection from "@/sections/dashboard/projects/ProjectHeaderSection";
import ProjectListSection from "@/sections/dashboard/projects/ProjectListSection";
import ProjectFormDialog from "@/components/dashboard/projects/ProjectFormDialog";
import ProjectDeleteDialog from "@/components/dashboard/projects/ProjectDeleteDialog";

export default function ProjectPage() {
  // ── State ──────────────────────────────────────────────

  const [projects, setProjects] =
    useState<ProjectResponse[]>(DUMMY_PROJECTS);

  // Dialog states
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectResponse | null>(null);

  // ── Handlers ───────────────────────────────────────────

  const handleAddClick = () => {
    setSelectedProject(null);
    setFormOpen(true);
  };

  const handleEditClick = (project: ProjectResponse) => {
    setSelectedProject(project);
    setFormOpen(true);
  };

  const handleDeleteClick = (project: ProjectResponse) => {
    setSelectedProject(project);
    setDeleteOpen(true);
  };

  const handleFormSubmit = (data: ProjectFormData) => {
    if (selectedProject) {
      // Edit existing
      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id
            ? {
                ...p,
                title: data.title,
                description: data.description,
                image: data.image,
                github_url: data.githubUrl,
                live_url: data.liveUrl,
                featured: data.featured,
                challenges: data.challenges,
                solution: data.solution,
                tags: data.tags,
                tech_stack: data.techStack,
                features: data.features,
              }
            : p
        )
      );
    } else {
      // Create new
      const newProject: ProjectResponse = {
        id: generateId(),
        title: data.title,
        description: data.description,
        image: data.image,
        github_url: data.githubUrl,
        live_url: data.liveUrl,
        featured: data.featured,
        challenges: data.challenges,
        solution: data.solution,
        tags: data.tags,
        tech_stack: data.techStack,
        gallery: [],
        features: data.features,
        createdAt: Date.now(),
      };
      setProjects((prev) => [newProject, ...prev]);
    }
    setSelectedProject(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedProject) {
      setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id));
      setSelectedProject(null);
      setDeleteOpen(false);
    }
  };

  // ── Render ─────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-6">
      <ProjectHeaderSection
        totalProjects={projects.length}
        onAddProject={handleAddClick}
      />

      <ProjectListSection
        projects={projects}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Dialogs */}
      <ProjectFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        project={selectedProject}
        onSubmit={handleFormSubmit}
      />

      <ProjectDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        projectTitle={selectedProject?.title ?? ""}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
