export interface SkillResponse {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  created_at?: number;
  updated_at?: number;
}

export interface CreateSkillRequest {
  title: string; // min=1, max=50
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface UpdateSkillRequest {
  title?: string; // min=1, max=50
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}
