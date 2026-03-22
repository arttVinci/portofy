import type {
  SkillResponse,
  CreateSkillRequest,
  UpdateSkillRequest,
  ApiResponse,
} from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

class SkillService {
  private readonly BASE_PATH = "/skills";
  private readonly PUBLIC_PATH = "/public";

  async getAll(): Promise<SkillResponse[]> {
    const response: AxiosResponse<ApiResponse<SkillResponse[]>> =
      await apiClient.get(this.BASE_PATH);

    return response.data.data;
  }

  async getById(id: string): Promise<SkillResponse> {
    const response: AxiosResponse<ApiResponse<SkillResponse>> =
      await apiClient.get(`${this.BASE_PATH}/${id}`);

    return response.data.data;
  }

  async create(payload: CreateSkillRequest): Promise<SkillResponse> {
    const response: AxiosResponse<ApiResponse<SkillResponse>> =
      await apiClient.post(this.BASE_PATH, payload);

    return response.data.data;
  }

  async update(
    id: string,
    payload: UpdateSkillRequest,
  ): Promise<SkillResponse> {
    const response: AxiosResponse<ApiResponse<SkillResponse>> =
      await apiClient.put(`${this.BASE_PATH}/${id}`, payload);

    return response.data.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  async getAllByUsername(username: string): Promise<SkillResponse[]> {
    const response: AxiosResponse<ApiResponse<SkillResponse[]>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}/skills`);

    return response.data.data;
  }

  async getByUsername(username: string, id: string): Promise<SkillResponse> {
    const response: AxiosResponse<ApiResponse<SkillResponse>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}/skills/${id}`);

    return response.data.data;
  }
}

export default new SkillService();
