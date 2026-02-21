import { motion } from "framer-motion";
import { CodeXml } from "lucide-react";
import TechStackCard from "../components/TechStackCard";
import FeaturedSection from "./FeaturedSection";
import type {
  ProfileItem,
  ProjectItem,
  SkillItem,
} from "../../../types/ui.types";

export interface HomeViewProps {
  profile: ProfileItem;
  skills: SkillItem[];
  projects: ProjectItem[];
}

export default function HomeView({ profile, skills, projects }: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 font-body"
    >
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-mono tracking-tight">
          Hi, I'm {profile.fullName ?? "Welcome to my portfolio"}
        </h2>
        <p className="text-gray-400 mt-1 font-sans text-md">
          I live in {profile.address ?? "Indonesia"}
        </p>
        <div className="border-b border-zinc-700 mt-3 mb-6"></div>
      </div>

      <div className="space-y-6 text-gray-300 leading-relaxed font-normal text-base">
        {profile?.bio ? (
          profile.bio.split("\n").map((text, i) => (
            <p key={i} className="mb-4">
              {text}
            </p>
          ))
        ) : (
          <p>-</p>
        )}
      </div>

      <div className="mt-16">
        <div className="border-b border-zinc-700 mt-3 mb-6"></div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 font-mono tracking-tight">
            <CodeXml className="w-7 h-7 text-cyan-400" />
            Tech Stack
          </h3>
          <p className="text-gray-400 mt-1 font-sans text-md">
            This is the technology i used to build an application.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 pb-1">
          {skills.map((skill, index) => (
            <TechStackCard
              key={skill.title || index}
              skill={skill}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="border-b border-zinc-700 mt-3"></div>
        <FeaturedSection profile={profile} projects={projects} />
      </div>
    </motion.div>
  );
}
