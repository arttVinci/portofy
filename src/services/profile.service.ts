import type { WebResponse } from "../types/base/api";
import type {
  CreateProfileRequest,
  ProfileResponse,
} from "../types/entities/profile";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const createProfile = async (
  data: CreateProfileRequest,
): Promise<WebResponse<ProfileResponse>> => {
  const response = await fetch(`${API_BASE_URL}/profiles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors || "Registration failed");
  }

  const responseData = await response.json();

  return responseData;
};
