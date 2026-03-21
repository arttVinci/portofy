export interface ProfileResponse {
  id?: string;
  full_name: string;
  image_url: string;
  address: string;
  about: string;
  bio: string;
  theme: string;
  tags: string[];
}
export interface CreateProfileRequest {
  user_id: string;
  full_name: string;
  image_url: string;
  address: string;
  about: string;
  bio: string;
  theme: string;
  tags: string[];
}

export interface UpdateProfileRequest {
  full_name: string;
  image_url: string;
  address: string;
  about: string;
  bio: string;
  theme: string;
  tags: string[];
}

export interface HandleImageProfile {
  user_id: string;
  image: string;
}

export interface ImageProfileResponse {
  image_url: string;
}
