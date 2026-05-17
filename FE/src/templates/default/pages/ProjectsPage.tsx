import { useOutletContext } from "react-router-dom";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { SectionHeading } from "../components/SectionHeading";
import { ProjectGrid } from "../components/ProjectGrid";

export default function ProjectsPage() {
  const { username } = useOutletContext<{ username: string }>();
  const { projects } = usePortfolioData(username);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        title="Projects"
        subtitle="All my projects and works"
      />

      {projects.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          No projects yet.
        </p>
      ) : (
        <div className="mt-10">
          <ProjectGrid projects={projects} username={username} />
        </div>
      )}
    </div>
  );
}
