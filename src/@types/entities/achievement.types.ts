export interface AchievementResponse {
  id: string;
  title: string;
  image_url: string;
  organization: string;
  issued_date?: string; // ISO 8601
  credential_url: string;
  credential_id: string;
  created_at?: number;
  updated_at?: number;
}

export interface CreateAchievementRequest {
  title: string;
  image_url?: string;
  organization: string;
  issued_date?: string;
  credential_url?: string;
  credential_id?: string;
}

export interface UpdateAchievementRequest {
  title?: string;
  image_url?: string;
  organization?: string;
  issued_date?: string;
  credential_url?: string;
  credential_id?: string;
}
