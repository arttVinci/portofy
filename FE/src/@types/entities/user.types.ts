export interface UserResponse {
  id: string;
  username: string;
  email?: string;
  auth_provider?: string;
  created_at?: number;
  updated_at?: number;
}

export interface UpdateUserRequest {
  username?: string;
  password?: string;
  email?: string;
}
