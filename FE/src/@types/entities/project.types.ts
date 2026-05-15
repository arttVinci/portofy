interface ProjectFeature {
  title: string;
  items: string[];
}

export interface ProjectGallery {
  image_url: string;
  caption: string;
}

export interface ProjectResponse {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  featured: boolean;
  challenges: string;
  solution: string;
  tools: string[];
  gallery: ProjectGallery[];
  features: ProjectFeature[];
  created_at?: number;
  updated_at?: number;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  image_url?: string;
  link_url?: string;
  featured?: boolean;
  challenges?: string;
  solution?: string;
  tools?: string[];
  gallery?: ProjectGallery[];
  features?: ProjectFeature[];
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  featured?: boolean;
  challenges?: string;
  solution?: string;
  tools?: string[];
  gallery?: ProjectGallery[];
  features?: ProjectFeature[];
}

export interface BulkDeleteProjectRequest {
  ids: string[];
}

export interface BulkCreateProjectRequest {
  items: CreateProjectRequest[];
}
