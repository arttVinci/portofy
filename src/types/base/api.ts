export interface WebResponse<T = any> {
  data: T;
  paging?: PageMetadata;
  errors?: string;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PageMetadata {
  page: number;
  size: number;
  total_item: number;
  total_page: number;
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PageMetadata;
}
