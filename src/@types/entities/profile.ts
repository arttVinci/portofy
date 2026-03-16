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

export interface UpdateProfileRequest {
  full_name: string;
  url_profile: string;
  address: string;
  about: string;
  bio: string;
  theme: string;
  tags: string[];
}

export interface HandleImageProfile {
  user_id: string;
  image_profile: File;
}

export interface ImageProfileResponse {
  url_profile: string;
}

export interface ProfileFormValues {
  full_name: string;
  url_profile: string;
  address: string;
  about: string;
  bio: string;
  tags: string[];
}

export const PROFILE_FORM_DEFAULT: ProfileFormValues = {
  full_name: "",
  url_profile: "",
  address: "",
  about: "",
  bio: "",
  tags: [],
};
