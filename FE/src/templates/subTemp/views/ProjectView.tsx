import { motion } from "framer-motion";
import ProjectCards from "../components/ProjectCards";
import { FolderOpen } from "lucide-react";
import type { ProfileItem, ProjectItem } from "../../../types/ui.types";

export interface ProjectViewProps {
  profile: ProfileItem;
  projects: ProjectItem[];
  username: string;
}
export default function ProjectView({ projects, username }: ProjectViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 font-body"
    >
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono tracking-tight">
          <FolderOpen className="w-7 h-7 text-cyan-400" />
          Projects
        </h2>
        <p className="text-gray-400 mt-1 font-sans text-md">
          Here are some of the selected projects that showcase my passion for
          building impactful software solutions.
        </p>
        <div className="border-b border-zinc-700 mt-3 mb-6"></div>
        <ProjectCards projects={projects} username={username} />
      </div>
    </motion.div>
  );
}
