import type { UserResponse } from "./user";

export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface LoginUserResponse {
  user: UserResponse;
  token: string;
}

export interface RegisterUserRequest {
  id: string;
  password: string;
  username: string;
  email: string;
  no_telp?: string;
}

export interface LogoutUserRequest {
  id: string;
}
