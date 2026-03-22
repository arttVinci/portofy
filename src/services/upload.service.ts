import apiClient from "@/api/apiClient";

export interface UploadResponse {
  urls: string[];
}

export const uploadService = {
  async uploadImages(payload: FormData): Promise<UploadResponse> {
    const response = await apiClient.post(`/upload`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  },
};
