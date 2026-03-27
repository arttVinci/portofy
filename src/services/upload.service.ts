import type { ApiResponse } from "@/@types";
import type { AxiosResponse } from "axios";
import apiClient from "@/api/apiClient";

export interface UploadResponse {
  image_url: string[];
}

export const uploadService = {
  async uploadImages(payload: FormData): Promise<UploadResponse> {
    const response: AxiosResponse<ApiResponse<UploadResponse>> =
      await apiClient.post(`/upload/image`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    return response.data.data;
  },
};
