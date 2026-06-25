import type {
  CreateProjectRequest,
  ProjectResponse,
  UpdateProjectRequest,
  ApiResponse,
  BulkDeleteProjectRequest,
  SearchParams,
} from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

class ProjectService {
  private readonly BASE_PATH = "/projects";

  async search(params: SearchParams): Promise<ApiResponse<ProjectResponse[]>> {
    const response = await apiClient.get<ApiResponse<ProjectResponse[]>>(
      this.BASE_PATH,
      {
        params: params,
      },
    );

    return response.data;
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

  async delete(id: string): Promise<boolean> {
    const response: AxiosResponse<ApiResponse<boolean>> =
      await apiClient.delete(`${this.BASE_PATH}/${id}`);
    return response.data.data;
  }

  async bulkDelete(payload: BulkDeleteProjectRequest): Promise<boolean> {
    const response: AxiosResponse<ApiResponse<boolean>> =
      await apiClient.delete(`${this.BASE_PATH}/_bulk`, {
        data: payload,
      });
    return response.data.data;
  }

  async get(): Promise<ProjectResponse[]> {
    const response: AxiosResponse<ApiResponse<ProjectResponse[]>> =
      await apiClient.get(this.BASE_PATH);
    return response.data.data;
  }

  async uploadThumbnail(payload: FormData): Promise<string> {
    const response: AxiosResponse<ApiResponse<string>> = await apiClient.post(
      `${this.BASE_PATH}/_thumbnail`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.data;
  }

  async uploadGallery(payload: FormData): Promise<string[]> {
    const response: AxiosResponse<ApiResponse<string[]>> = await apiClient.post(
      `${this.BASE_PATH}/_gallery`,
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

export default new ProjectService();
