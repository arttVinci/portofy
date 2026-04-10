import type {
  AchievementResponse,
  CreateAchievementRequest,
  UpdateAchievementRequest,
  ApiResponse,
} from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

class AchievementService {
  private readonly BASE_PATH = "/achievements";
  private readonly PUBLIC_PATH = "/public";

  async getAll(): Promise<AchievementResponse[]> {
    const response: AxiosResponse<ApiResponse<AchievementResponse[]>> =
      await apiClient.get(this.BASE_PATH);

    return response.data.data;
  }

  async getById(id: string): Promise<AchievementResponse> {
    const response: AxiosResponse<ApiResponse<AchievementResponse>> =
      await apiClient.get(`${this.BASE_PATH}/${id}`);

    return response.data.data;
  }

  async create(
    payload: CreateAchievementRequest,
  ): Promise<AchievementResponse> {
    const response: AxiosResponse<ApiResponse<AchievementResponse>> =
      await apiClient.post(this.BASE_PATH, payload);

    return response.data.data;
  }

  async update(
    id: string,
    payload: UpdateAchievementRequest,
  ): Promise<AchievementResponse> {
    const response: AxiosResponse<ApiResponse<AchievementResponse>> =
      await apiClient.put(`${this.BASE_PATH}/${id}`, payload);

    return response.data.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  async getAllByUsername(username: string): Promise<AchievementResponse[]> {
    const response: AxiosResponse<ApiResponse<AchievementResponse[]>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}/achievements`);

    return response.data.data;
  }

  async getByUsername(
    username: string,
    id: string,
  ): Promise<AchievementResponse> {
    const response: AxiosResponse<ApiResponse<AchievementResponse>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}/achievements/${id}`);

    return response.data.data;
  }
}

export default new AchievementService();
