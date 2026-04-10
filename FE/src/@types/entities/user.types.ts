export interface UserResponse {
  id: string;
  username: string;
  phone?: string;
  email?: string;
  created_at?: number;
  updated_at?: number;
}

export interface UpdateUserRequest {
  id: string;
  password: string;
  username: string;
  phone?: string;
  email?: string;
}
