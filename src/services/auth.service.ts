import type {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
} from "../@types/entities/auth";
import type { AxiosResponse } from "axios";

import apiClient from "../api/apiClient";

import type { ApiResponse } from "../@types/base/api";

class AuthService {
  private readonly BASE_PATH = "/users";

  async loginUser(payload: LoginUserRequest): Promise<LoginUserResponse> {
    const response: AxiosResponse<ApiResponse<LoginUserResponse>> =
      await apiClient.post(this.BASE_PATH, payload);

    return response.data.data;
  }

  async createUser(payload: RegisterUserRequest): Promise<LoginUserResponse> {
    const response: AxiosResponse<ApiResponse<LoginUserResponse>> =
      await apiClient.post(this.BASE_PATH, payload);

    return response.data.data;
  }
}

export default new AuthService();
