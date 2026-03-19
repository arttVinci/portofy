import { Button } from "@/components/ui/button";
import { Plus, FolderKanban } from "lucide-react";

interface ProjectHeaderSectionProps {
  totalProjects: number;
  onAddProject: () => void;
}

export default function ProjectHeaderSection({
  totalProjects,
  onAddProject,
}: ProjectHeaderSectionProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
          <FolderKanban className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            {totalProjects} project{totalProjects !== 1 ? "s" : ""} in your
            portfolio
          </p>
        </div>
      </div>

      <Button onClick={onAddProject} className="mt-3 sm:mt-0">
        <Plus className="mr-2 size-4" />
        Add Project
      </Button>
    </div>
  );
}
