import apiClient from "@/api/apiClient";
import type { ParsedCVResponse } from "@/@types/entities/cv_parser.types";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/@types";

class AIParsedCVService {
  private readonly BASE_PATH = "/agent/cv";

  async parseCV(payload: FormData): Promise<ParsedCVResponse> {
    const response: AxiosResponse<ApiResponse<ParsedCVResponse>> =
      await apiClient.post(`${this.BASE_PATH}/parse`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });
    return response.data.data;
  }
}

export default new AIParsedCVService();
