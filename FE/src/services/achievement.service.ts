import type {
  CreateAchievementRequest,
  AchievementResponse,
  UpdateAchievementRequest,
  ApiResponse,
  BulkDeleteAchievementRequest,
  SearchParams,
} from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

class AchievementService {
  private readonly BASE_PATH = "/achievements";

  async search(
    params: SearchParams,
  ): Promise<ApiResponse<AchievementResponse[]>> {
    const response = await apiClient.get<ApiResponse<AchievementResponse[]>>(
      this.BASE_PATH,
      {
        params: params,
      },
    );

    return response.data;
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

  async delete(id: string): Promise<boolean> {
    const response: AxiosResponse<ApiResponse<boolean>> =
      await apiClient.delete(`${this.BASE_PATH}/${id}`);
    return response.data.data;
  }

  async bulkDelete(payload: BulkDeleteAchievementRequest): Promise<boolean> {
    const response: AxiosResponse<ApiResponse<boolean>> =
      await apiClient.delete(`${this.BASE_PATH}/_bulk`, {
        data: payload,
      });
    return response.data.data;
  }

  async get(): Promise<AchievementResponse[]> {
    const response: AxiosResponse<ApiResponse<AchievementResponse[]>> =
      await apiClient.get(this.BASE_PATH);
    return response.data.data;
  }

  async uploadImage(payload: FormData): Promise<string> {
    const response: AxiosResponse<ApiResponse<string>> = await apiClient.post(
      `${this.BASE_PATH}/_image`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.data;
  }
}

export default new AchievementService();
