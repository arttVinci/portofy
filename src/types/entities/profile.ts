export interface ProfileResponse {
  id: string;
  full_name: string;
  url_profile: string;
  address: string;
  about: string;
  bio: string;
  theme: string;
  tags: string[];
}

export interface CreateProfileRequest {
  user_id: string;
  full_name: string;
  url_profile: string;
  address: string;
  about: string;
  bio: string;
  theme: string;
  tags: string[];
}
