import type { ApiResponse } from "../@types/base/api";
import type {
  CreateProfileRequest,
  ImageProfileResponse,
  ProfileResponse,
} from "../@types/entities/profile";
import type { AxiosResponse } from "axios";
import apiClient from "../api/apiClient";

class ProfileService {
  private readonly BASE_PATH = "/profiles";

  async createProfile(
    payload: CreateProfileRequest,
  ): Promise<ProfileResponse | null> {
    const response: AxiosResponse<ApiResponse<ProfileResponse>> =
      await apiClient.post(this.BASE_PATH, payload);

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
}

export default new ProfileService();
