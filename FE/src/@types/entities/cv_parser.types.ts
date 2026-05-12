import type { ProfileResponse } from "./profile.types";
import type { ExperienceResponse } from "./experience.types";
import type { EducationResponse } from "./education.types";
import type { ProjectResponse } from "./project.types";
import type { SkillResponse } from "./skill.types";

export interface ParsedCVResponse {
  profile: ProfileResponse;
  experiences: ExperienceResponse[];
  educations: EducationResponse[];
  projects: ProjectResponse[];
  skills: SkillResponse[];
}
