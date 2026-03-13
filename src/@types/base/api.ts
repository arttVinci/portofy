export interface ApiResponse<T = any> {
  data: T;
  paging?: PageMetadata;
  errors?: string;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
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
