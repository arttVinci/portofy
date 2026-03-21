import type {
  CreateProfileRequest,
  ImageProfileResponse,
  ProfileResponse,
  UpdateProfileRequest,
  ApiResponse,
} from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

class ProfileService {
  private readonly BASE_PATH = "/profiles";
  private readonly PUBLIC_PATH = "/public";

  async createProfile(payload: CreateProfileRequest): Promise<ProfileResponse> {
    const response: AxiosResponse<ApiResponse<ProfileResponse>> =
      await apiClient.post(this.BASE_PATH, payload);

    return response.data.data;
  }

  async updateProfile(payload: UpdateProfileRequest): Promise<ProfileResponse> {
    const response: AxiosResponse<ApiResponse<ProfileResponse>> =
      await apiClient.put(`${this.BASE_PATH}`, payload);

    return response.data.data;
  }

  async handleImageProfile(payload: FormData): Promise<ImageProfileResponse> {
    const response: AxiosResponse<ApiResponse<ImageProfileResponse>> =
      await apiClient.post(`${this.BASE_PATH}/image`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    return response.data.data;
  }

  async getProfile(): Promise<ProfileResponse> {
    const response: AxiosResponse<ApiResponse<ProfileResponse>> =
      await apiClient.get(`${this.BASE_PATH}`);

    return response.data.data;
  }

  async getPublicProfile(username: string): Promise<ProfileResponse> {
    const response: AxiosResponse<ApiResponse<ProfileResponse>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}`);

    return response.data.data;
  }
}

export default new ProfileService();
