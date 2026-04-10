import type {
  EducationResponse,
  CreateEducationRequest,
  UpdateEducationRequest,
  ApiResponse,
} from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

class EducationService {
  private readonly BASE_PATH = "/educations";
  private readonly PUBLIC_PATH = "/public";

  async getAll(): Promise<EducationResponse[]> {
    const response: AxiosResponse<ApiResponse<EducationResponse[]>> =
      await apiClient.get(this.BASE_PATH);

    return response.data.data;
  }

  async getById(id: string): Promise<EducationResponse> {
    const response: AxiosResponse<ApiResponse<EducationResponse>> =
      await apiClient.get(`${this.BASE_PATH}/${id}`);

    return response.data.data;
  }

  async create(payload: CreateEducationRequest): Promise<EducationResponse> {
    const response: AxiosResponse<ApiResponse<EducationResponse>> =
      await apiClient.post(this.BASE_PATH, payload);

    return response.data.data;
  }

  async update(
    id: string,
    payload: UpdateEducationRequest,
  ): Promise<EducationResponse> {
    const response: AxiosResponse<ApiResponse<EducationResponse>> =
      await apiClient.put(`${this.BASE_PATH}/${id}`, payload);

    return response.data.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  async getAllByUsername(username: string): Promise<EducationResponse[]> {
    const response: AxiosResponse<ApiResponse<EducationResponse[]>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}/educations`);

    return response.data.data;
  }

  async getByUsername(
    username: string,
    id: string,
  ): Promise<EducationResponse> {
    const response: AxiosResponse<ApiResponse<EducationResponse>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}/educations/${id}`);

    return response.data.data;
  }
}

export default new EducationService();
