import type {
  ProjectResponse,
  CreateProjectRequest,
  UpdateProjectRequest,
  ApiResponse,
} from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

class ProjectService {
  private readonly BASE_PATH = "/projects";
  private readonly PUBLIC_PATH = "/public";

  async getAll(): Promise<ProjectResponse[]> {
    const response: AxiosResponse<ApiResponse<ProjectResponse[]>> =
      await apiClient.get(this.BASE_PATH);

    return response.data.data;
  }

  async getById(id: string): Promise<ProjectResponse> {
    const response: AxiosResponse<ApiResponse<ProjectResponse>> =
      await apiClient.get(`${this.BASE_PATH}/${id}`);

    return response.data.data;
  }

  async create(payload: CreateProjectRequest): Promise<ProjectResponse> {
    const response: AxiosResponse<ApiResponse<ProjectResponse>> =
      await apiClient.post(this.BASE_PATH, payload);

    return response.data.data;
  }

  async update(
    id: string,
    payload: UpdateProjectRequest,
  ): Promise<ProjectResponse> {
    const response: AxiosResponse<ApiResponse<ProjectResponse>> =
      await apiClient.put(`${this.BASE_PATH}/${id}`, payload);

    return response.data.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  async getAllByUsername(username: string): Promise<ProjectResponse[]> {
    const response: AxiosResponse<ApiResponse<ProjectResponse[]>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}/projects`);

    return response.data.data;
  }

  async getByUsername(username: string, id: string): Promise<ProjectResponse> {
    const response: AxiosResponse<ApiResponse<ProjectResponse>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}/projects/${id}`);

    return response.data.data;
  }
}

export default new ProjectService();
