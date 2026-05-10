import type {
  GenerateAboutDescriptionRequest,
  GenerateAboutDescriptionResponse,
  ApiResponse,
} from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

class AIDescriptionService {
  private readonly BASE_PATH = "/agent/description";

  async generateAboutDescription(
    payload: GenerateAboutDescriptionRequest,
  ): Promise<GenerateAboutDescriptionResponse> {
    const response: AxiosResponse<
      ApiResponse<GenerateAboutDescriptionResponse>
    > = await apiClient.post(`${this.BASE_PATH}/about`, payload);

    return response.data.data;
  }
}

export default new AIDescriptionService();
