import type {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  ApiResponse,
  UserResponse,
  SendOtpRequest,
} from "@/@types";
import type { AxiosResponse } from "axios";

import apiClient from "@/api/apiClient";

class AuthService {
  private readonly BASE_PATH = "/users";

  async currentUser(): Promise<UserResponse> {
    const response: AxiosResponse<ApiResponse<UserResponse>> =
      await apiClient.get(`${this.BASE_PATH}/_current`);

    return response.data.data;
  }

  async createUser(payload: RegisterUserRequest): Promise<LoginUserResponse> {
    const response: AxiosResponse<ApiResponse<LoginUserResponse>> =
      await apiClient.post(this.BASE_PATH, payload);

    return response.data.data;
  }

  async loginUser(payload: LoginUserRequest): Promise<LoginUserResponse> {
    const response: AxiosResponse<ApiResponse<LoginUserResponse>> =
      await apiClient.post(`${this.BASE_PATH}/_login`, payload);

    return response.data.data;
  }

  async logoutUser(): Promise<void> {
    const response: AxiosResponse<ApiResponse<void>> = await apiClient.delete(
      this.BASE_PATH,
    );

    return response.data.data;
  }

  async sendOtp(payload: SendOtpRequest): Promise<void> {
    const response: AxiosResponse<ApiResponse<void>> = await apiClient.post(
      `${this.BASE_PATH}/_otp`,
      payload,
    );

    return response.data.data;
  }
}

export default new AuthService();
