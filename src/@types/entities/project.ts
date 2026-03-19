// ── Sub-types ──────────────────────────────────────────────

export interface ProjectFeature {
  title: string;
  items: string[];
}

export interface TechItem {
  name: string;
  icon: string;
  color: string;
}

export interface ProjectGallery {
  url: string;
  caption: string;
}

// ── Response ───────────────────────────────────────────────

export interface ProjectResponse {
  id: string;
  title: string;
  description: string;
  image: string;
  github_url: string;
  live_url: string;
  featured: boolean;
  challenges: string;
  solution: string;

  tags: string[];
  tech_stack: TechItem[];
  gallery: ProjectGallery[];
  features: ProjectFeature[];

  createdAt: number;
}

// ── Requests ───────────────────────────────────────────────

export interface CreateProjectRequest {
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  challenges?: string;
  solution?: string;
  featured: boolean;

  tags: string[];
  techStack: TechItem[];
  gallery: ProjectGallery[];
  features: ProjectFeature[];
}

export interface UpdateProjectRequest extends CreateProjectRequest {
  id: string;
}

export interface DeleteProjectRequest {
  id: string;
}
