import type { UserResponse } from "../index";

export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface LoginUserResponse {
  user: UserResponse;
  token: string;
}

export interface RegisterUserRequest {
  password: string;
  username: string;
  email: string;
  no_telp?: string;
  otp_code: string;
}

export interface LogoutUserRequest {
  id: string;
}

export interface SendOtpRequest {
  username: string;
  email: string;
}
