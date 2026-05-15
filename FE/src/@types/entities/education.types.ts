export interface EducationResponse {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  grade: string;
  image_url: string;
  location: string;
  start_date: string; // ISO 8601
  end_date?: string; // ISO 8601
  description: string;
  created_at?: number;
  updated_at?: number;
}

export interface CreateEducationRequest {
  institution: string; // min=3, max=100
  degree?: string; // max=100
  field_of_study?: string; // max=100
  grade?: string; // max=20
  image_url?: string;
  location?: string; // max=100
  start_date: string; // ISO 8601, required
  end_date?: string; // ISO 8601, must be after start_date
  description?: string; // max=1000
}

export interface UpdateEducationRequest {
  institution?: string; // min=3, max=100
  degree?: string; // max=100
  field_of_study?: string; // max=100
  grade?: string; // max=20
  image_url?: string;
  location?: string; // max=100
  start_date?: string; // ISO 8601
  end_date?: string; // ISO 8601
  description?: string; // max=1000
}

export interface BulkDeleteEducationRequest {
  ids: string[];
}

export interface BulkCreateEducationRequest {
  items: CreateEducationRequest[];
}
