import type {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
} from "../types/entities/auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const registerUser = async (
  data: RegisterUserRequest,
): Promise<LoginUserResponse> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
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

export const loginUser = async (
  data: LoginUserRequest,
): Promise<LoginUserResponse> => {
  const response = await fetch(`${API_BASE_URL}/users/_login`, {
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
