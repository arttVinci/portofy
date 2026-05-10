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

/* ── Experience ── */
export interface GenerateExperienceDescRequest {
  company: string;
  role: string;
  start_date: string; /* "Jan 2022" */
  end_date: string;   /* "Present" | "Dec 2023" */
  tone: string;
  language: string;
  user_notes: string;
}

export interface DescBullet {
  title: string;
  description: string;
}

export interface GenerateExperienceDescResponse {
  summary: string;
  bullets: DescBullet[];
}

/* ── Education ── */
export interface GenerateEducationDescRequest {
  institution: string;
  degree: string;     /* "S1 Teknik Informatika" */
  start_year: string; /* "2017" */
  end_year: string;   /* "2021" | "Present" */
  gpa: string;        /* optional, "3.7/4.0" */
  tone: string;
  language: string;
  user_notes: string;
}

export interface GenerateEducationDescResponse {
  summary: string;
  bullets: DescBullet[];
}

/* ── Project ── */
export interface GenerateProjectDescRequest {
  title: string;
  role: string;
  stack: string[];
  duration: string;
  tone: string;
  language: string;
  user_notes: string;
}

export interface ProjectFeatureGroup {
  group_title: string;
  items: string[];
}

export interface GenerateProjectDescResponse {
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  key_features: ProjectFeatureGroup[];
  tags: string[];
}
