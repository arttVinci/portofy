import type {
  ExperienceResponse,
  CreateExperienceRequest,
  UpdateExperienceRequest,
  ApiResponse,
} from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

class ExperienceService {
  private readonly BASE_PATH = "/experiences";
  private readonly PUBLIC_PATH = "/public";

  async getAll(): Promise<ExperienceResponse[]> {
    const response: AxiosResponse<ApiResponse<ExperienceResponse[]>> =
      await apiClient.get(this.BASE_PATH);

    return response.data.data;
  }

  async getById(id: string): Promise<ExperienceResponse> {
    const response: AxiosResponse<ApiResponse<ExperienceResponse>> =
      await apiClient.get(`${this.BASE_PATH}/${id}`);

    return response.data.data;
  }

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

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  async bulkDelete(payload: { ids: string[] }): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/_bulk`, {
      data: payload,
    });
  }

  async bulkCreate(payload: {
    items: CreateExperienceRequest[];
  }): Promise<ExperienceResponse[]> {
    const response: AxiosResponse<ApiResponse<ExperienceResponse[]>> =
      await apiClient.post(`${this.BASE_PATH}/_bulk`, payload);

    return response.data.data;
  }

  async getAllByUsername(username: string): Promise<ExperienceResponse[]> {
    const response: AxiosResponse<ApiResponse<ExperienceResponse[]>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}/experiences`);

    return response.data.data;
  }

  async getByUsername(
    username: string,
    id: string,
  ): Promise<ExperienceResponse> {
    const response: AxiosResponse<ApiResponse<ExperienceResponse>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}/experiences/${id}`);

    return response.data.data;
  }

  async uploadImage(id: string, payload: FormData): Promise<string> {
    const response: AxiosResponse<ApiResponse<string>> = await apiClient.post(
      `${this.BASE_PATH}/${id}/_image`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  }
}

export default new ExperienceService();
