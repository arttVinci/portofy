export interface UserResponse {
  id: string;
  username: string;
  no_telp?: string;
  email?: string;
  created_at?: number;
  updated_at?: number;
}

export interface UpdateUserRequest {
  id: string;
  password?: string;
  username?: string;
  no_telp?: string;
  email?: string;
}

export interface GetUserRequest {
  id: string;
}
