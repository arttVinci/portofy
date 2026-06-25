import type {
  CreateExperienceRequest,
  ExperienceResponse,
  UpdateExperienceRequest,
  ApiResponse,
  BulkDeleteExperienceRequest,
} from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

class ExperienceService {
  private readonly BASE_PATH = "/experiences";

  async create(payload: CreateExperienceRequest): Promise<ExperienceResponse> {
    const response: AxiosResponse<ApiResponse<ExperienceResponse>> =
      await apiClient.post(this.BASE_PATH, payload);
    return response.data.data;
  }

  async update(
    id: string,
    payload: UpdateExperienceRequest,
  ): Promise<ExperienceResponse> {
    const response: AxiosResponse<ApiResponse<ExperienceResponse>> =
      await apiClient.put(`${this.BASE_PATH}/${id}`, payload);
    return response.data.data;
  }

  async delete(id: string): Promise<boolean> {
    const response: AxiosResponse<ApiResponse<boolean>> =
      await apiClient.delete(`${this.BASE_PATH}/${id}`);
    return response.data.data;
  }

  async bulkDelete(payload: BulkDeleteExperienceRequest): Promise<boolean> {
    const response: AxiosResponse<ApiResponse<boolean>> =
      await apiClient.delete(`${this.BASE_PATH}/_bulk`, {
        data: payload,
      });
    return response.data.data;
  }

  async get(): Promise<ExperienceResponse[]> {
    const response: AxiosResponse<ApiResponse<ExperienceResponse[]>> =
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

export default new ExperienceService();
