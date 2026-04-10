import type {
  SocialResponse,
  CreateSocialRequest,
  UpdateSocialRequest,
  ApiResponse,
} from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

class SocialService {
  private readonly BASE_PATH = "/socials";
  private readonly PUBLIC_PATH = "/public";

  async getAll(): Promise<SocialResponse[]> {
    const response: AxiosResponse<ApiResponse<SocialResponse[]>> =
      await apiClient.get(this.BASE_PATH);

    return response.data.data;
  }

  async getById(id: string): Promise<SocialResponse> {
    const response: AxiosResponse<ApiResponse<SocialResponse>> =
      await apiClient.get(`${this.BASE_PATH}/${id}`);

    return response.data.data;
  }

  async create(payload: CreateSocialRequest): Promise<SocialResponse> {
    const response: AxiosResponse<ApiResponse<SocialResponse>> =
      await apiClient.post(this.BASE_PATH, payload);

    return response.data.data;
  }

  async update(
    id: string,
    payload: UpdateSocialRequest,
  ): Promise<SocialResponse> {
    const response: AxiosResponse<ApiResponse<SocialResponse>> =
      await apiClient.put(`${this.BASE_PATH}/${id}`, payload);

    return response.data.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  async getAllByUsername(username: string): Promise<SocialResponse[]> {
    const response: AxiosResponse<ApiResponse<SocialResponse[]>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}/socials`);

    return response.data.data;
  }

  async getByUsername(username: string, id: string): Promise<SocialResponse> {
    const response: AxiosResponse<ApiResponse<SocialResponse>> =
      await apiClient.get(`${this.PUBLIC_PATH}/${username}/socials/${id}`);

    return response.data.data;
  }
}

export default new SocialService();
