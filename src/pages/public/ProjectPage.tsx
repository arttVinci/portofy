import { useOutletContext } from "react-router-dom";
import type { ProjectViewProps } from "../../templates/subTemp/views/ProjectView";
import ProjectView from "../../templates/subTemp/views/ProjectView";

export default function ProjectPage() {
  const contextData = useOutletContext<ProjectViewProps>();

  const template = contextData?.profile?.theme || "default";

  if (template === "subTemp") {
    return <ProjectView {...contextData} />;
  }

  return null;
}
