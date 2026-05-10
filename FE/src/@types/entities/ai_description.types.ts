export interface GenerateAboutDescriptionRequest {
  name: string;
  role: string;
  tone: string;
  language: string;

  user_notes: string;
}

export interface GenerateAboutDescriptionResponse {
  paragraphs: string[];
}
