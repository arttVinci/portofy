export interface ExperienceResponse {
  id: string;
  position: string;
  company_name: string;
  link_url: string;
  image_url: string;
  location: string;
  employment_type: string;
  location_type: string;
  start_date: string;
  end_date?: string;
  description: string;
  created_at?: number;
  updated_at?: number;
}

export interface CreateExperienceRequest {
  position: string;
  company_name: string;
  link_url?: string;
  image_url?: string;
  location?: string;
  employment_type?:
    | "Full-time"
    | "Part-time"
    | "Freelance"
    | "Contract"
    | "Internship"
    | "Self-employed";
  location_type?: "Remote" | "On-site" | "Hybrid";
  start_date: string;
  end_date?: string | null;
  description?: string;
}

export interface UpdateExperienceRequest {
  position?: string;
  company_name?: string;
  link_url?: string;
  image_url?: string;
  location?: string;
  employment_type?:
    | "Full-time"
    | "Part-time"
    | "Freelance"
    | "Contract"
    | "Internship"
    | "Self-employed";
  location_type?: "Remote" | "On-site" | "Hybrid";
  start_date?: string;
  end_date?: string;
  description?: string;
}

export interface BulkDeleteExperienceRequest {
  ids: string[];
}

export interface BulkCreateExperienceRequest {
  items: CreateExperienceRequest[];
}
