export interface SocialResponse {
  id: string;
  platform:
    | "github"
    | "linkedin"
    | "instagram"
    | "x"
    | "twitter"
    | "facebook"
    | "youtube"
    | "discord"
    | "website";
  link_url: string;
  created_at?: number;
  updated_at?: number;
}

export interface CreateSocialRequest {
  platform:
    | "github"
    | "linkedin"
    | "instagram"
    | "x"
    | "twitter"
    | "facebook"
    | "youtube"
    | "discord"
    | "website";
  link_url: string;
}

export interface UpdateSocialRequest {
  platform?:
    | "github"
    | "linkedin"
    | "instagram"
    | "x"
    | "twitter"
    | "facebook"
    | "youtube"
    | "discord"
    | "website";
  link_url?: string;
}
