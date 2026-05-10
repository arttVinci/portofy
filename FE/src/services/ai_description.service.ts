import type {
  GenerateAboutDescriptionRequest,
  GenerateAboutDescriptionResponse,
  GenerateExperienceDescRequest,
  GenerateExperienceDescResponse,
  GenerateEducationDescRequest,
  GenerateEducationDescResponse,
  GenerateProjectDescRequest,
  GenerateProjectDescResponse,
  ApiResponse,
} from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

class AIGenerateDescriptionService {
  private readonly BASE_PATH = "/agent/description";

  async generateAboutDescription(
    payload: GenerateAboutDescriptionRequest,
  ): Promise<GenerateAboutDescriptionResponse> {
    const response: AxiosResponse<
      ApiResponse<GenerateAboutDescriptionResponse>
    > = await apiClient.post(`${this.BASE_PATH}/about`, payload);
    return response.data.data;
  }

  async generateExperienceDescription(
    payload: GenerateExperienceDescRequest,
  ): Promise<GenerateExperienceDescResponse> {
    const response: AxiosResponse<ApiResponse<GenerateExperienceDescResponse>> =
      await apiClient.post(`${this.BASE_PATH}/experience`, payload);
    return response.data.data;
  }

  async generateEducationDescription(
    payload: GenerateEducationDescRequest,
  ): Promise<GenerateEducationDescResponse> {
    const response: AxiosResponse<ApiResponse<GenerateEducationDescResponse>> =
      await apiClient.post(`${this.BASE_PATH}/education`, payload);
    return response.data.data;
  }

  async generateProjectDescription(
    payload: GenerateProjectDescRequest,
  ): Promise<GenerateProjectDescResponse> {
    const response: AxiosResponse<ApiResponse<GenerateProjectDescResponse>> =
      await apiClient.post(`${this.BASE_PATH}/project`, payload);
    return response.data.data;
  }
}

export default new AIGenerateDescriptionService();
