import type { WebResponse } from "../types/base/api";
import type {
  CreateProfileRequest,
  ImageProfileResponse,
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

export const handleImageProfile = async (
  data: FormData,
): Promise<WebResponse<ImageProfileResponse>> => {
  const response = await fetch(`${API_BASE_URL}/images/profile`, {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed get url profile");
  }

  const responseData = await response.json();

  return responseData;
};
