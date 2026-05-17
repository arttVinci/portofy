import {
  useGetPublicProfile,
  useAchievements,
  useEducations,
  useExperiences,
  useProjects,
  useSkills,
  useSocials,
} from "@/hooks/queries";

export function usePortfolioData(username: string) {
  const profile = useGetPublicProfile(username);
  const achievements = useAchievements(username);
  const educations = useEducations(username);
  const experiences = useExperiences(username);
  const projects = useProjects(username);
  const skills = useSkills(username);
  const socials = useSocials(username);

  const isLoading =
    profile.isLoading ||
    achievements.isLoading ||
    educations.isLoading ||
    experiences.isLoading ||
    projects.isLoading ||
    skills.isLoading ||
    socials.isLoading;

  const isError =
    profile.isError ||
    achievements.isError ||
    educations.isError ||
    experiences.isError ||
    projects.isError ||
    skills.isError ||
    socials.isError;

  return {
    profile: profile.data,
    achievements: achievements.data ?? [],
    educations: educations.data ?? [],
    experiences: experiences.data ?? [],
    projects: projects.data ?? [],
    skills: skills.data ?? [],
    socials: socials.data ?? [],
    isLoading,
    isError,
    isProfileNotFound: profile.isError,
  };
}
