import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type {
  CareerItem,
  ProfileItem,
  ProjectItem,
  AchievementItem,
  SkillItem,
  SocialItem,
} from "../../types/ui.types";
import {
  transformProfile,
  transformExperiences,
  transformEducations,
  transformAchievements,
  transformProjects,
  // transformSkill,
  // transformSocial,
} from "../../utils/transformer";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const usePortfolio = () => {
  const { username } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [profile, setProfile] = useState<ProfileItem | null>(null);
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [experiences, setExperiences] = useState<CareerItem[]>([]);
  const [educations, setEducations] = useState<CareerItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [socials, setSocials] = useState<SocialItem[]>([]);

  const [error, setError] = useState("");

  useEffect(() => {
    setProfile(null);
    setSkills([]);
    setExperiences([]);
    setEducations([]);
    setProjects([]);
    setAchievements([]);
    setSocials([]);
    setError("");
    setIsLoading(true);

    if (!username) return;

    const fetchData = async () => {
      try {
        const [
          resProfile,
          // resSkills,
          resExperience,
          resEducation,
          resProject,
          resAchievement,
          // resSocials,
        ] = await Promise.all([
          fetch(`${API_BASE_URL}/public/${username}`),
          // fetch(`${API_BASE_URL}/public/${username}/skills`),
          fetch(`${API_BASE_URL}/public/${username}/experiences`),
          fetch(`${API_BASE_URL}/public/${username}/educations`),
          fetch(`${API_BASE_URL}/public/${username}/projects`),
          fetch(`${API_BASE_URL}/public/${username}/achievements`),
          // fetch(`${API_BASE_URL}/public/${username}/socials`),
        ]);

        if (resProfile.status === 404)
          throw new Error(`User @${username} not found`);
        if (!resProfile.ok) throw new Error("Failed to load profile");

        const [
          jsonProfile,
          // jsonSkills,
          jsonExperiences,
          jsonEducations,
          jsonProjects,
          jsonAchievements,
          // jsonSocials,
        ] = await Promise.all([
          resProfile.json(),
          // resSkills.ok ? resSkills.json() : [],
          resExperience.ok ? resExperience.json() : [],
          resEducation.ok ? resEducation.json() : [],
          resProject.ok ? resProject.json() : [],
          resAchievement.ok ? resAchievement.json() : [],
          // resSocials.ok ? resSocials.json() : [],
        ]);

        console.log("plss masuk:", jsonProfile);

        setProfile(transformProfile(jsonProfile.data));
        // setSkills(transformSkill(jsonSkills));
        setExperiences(transformExperiences(jsonExperiences.data));
        setEducations(transformEducations(jsonEducations.data));
        setAchievements(transformAchievements(jsonAchievements.data));
        setProjects(transformProjects(jsonProjects.data));
        // setSocials(transformSocial(jsonSocials));\
      } catch (err) {
        console.error(err);
        setError("Failed to load portfolio.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [username]);

  console.log("plss ada datanya :", profile);

  return {
    username,
    profile,
    skills,
    experiences,
    educations,
    projects,
    achievements,
    socials,
    error,
    isLoading,
  };
};
