export interface GenerateAboutDescriptionRequest {
  name: string;
  role: string;
  years_exp: number;
  skill: string;
  tone: string;
  location: string;
  language: string;

  user_notes: string;
}

export interface GenerateAboutDescriptionResponse {
  paragraphs: string[];
}
