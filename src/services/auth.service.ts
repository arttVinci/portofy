import type {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
} from "../@types/entities/auth";

import { apiClient } from "../api/apiClient";

import type { WebResponse } from "../@types/base/api";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const registerUser = async (
  payload: RegisterUserRequest,
): Promise<WebResponse<LoginUserResponse>> => {
  try {
    const response = await apiClient.post("/users", payload);
    return response.data;
  } catch (error) {
    throw new ApiError(
      error.response?.data?.message || "Failed to create user",
      error.response?.status || 500,
    );
  }
};

export const loginUser = async (
  data: LoginUserRequest,
): Promise<WebResponse<LoginUserResponse>> => {
  const response = await fetch(`${API_BASE_URL}/users/_login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors || "Login failed");
  }

  const responseData = await response.json();

  return responseData;
};
