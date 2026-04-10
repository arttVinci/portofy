export interface TemplateResponse {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  badge: string;
  used_count: string; // e.g. "8.2k"
  is_pro: boolean;
}

export interface CreateTemplateRequest {
  title: string; // min=3, max=50
  category: string; // max=50
  tags?: string[]; // max=10 items, each max=20 chars
  description: string; // max=255
  badge?: string; // max=50
  is_pro: boolean;
}

export interface UpdateTemplateRequest {
  title: string; // min=3, max=50
  category: string; // max=50
  tags?: string[]; // max=10 items, each max=20 chars
  description: string; // max=255
  badge?: string; // max=50
  is_pro: boolean;
}
