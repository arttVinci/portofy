import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, CodeXml } from "lucide-react";
import TechStackCard from "../components/TechStackCard";
import FeaturedSection from "./FeaturedSection";
import {
  SiBootstrap,
  SiComposer,
  SiCss,
  SiDocker,
  SiFilament,
  SiGit,
  SiGithub,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiLivewire,
  SiMysql,
  SiPhp,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiDependabot,
} from "@icons-pack/react-simple-icons";
import type {
  ProfileItem,
  ProjectItem,
  SkillItem,
} from "../../../types/ui.types";

const techStack = [
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", Icon: SiCss, color: "#1572B6" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Golang", Icon: SiGo, color: "#00ADD8" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
  { name: "Livewire", Icon: SiLivewire, color: "#4E56A6" },
  { name: "Filament", Icon: SiFilament, color: "#F59E0B" },
  { name: "Composer", Icon: SiComposer, color: "#885630" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "AI", Icon: SiDependabot, color: "#412991" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
  { name: "GitHub", Icon: SiGithub, color: "#f7f7f7" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
];

export interface HomePageProps {
  profile: ProfileItem;
  skills: SkillItem[];
  projects: ProjectItem[];
}

export default function HomePage({ profile, skills, projects }: HomePageProps) {
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
          I live in I{profile.address ?? "Indonesia"}
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
        <FeaturedSection />
      </div>
    </motion.div>
  );
}
