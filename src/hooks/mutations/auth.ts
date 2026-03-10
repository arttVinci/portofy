import { useState } from "react";
import { registerUser } from "../../services/auth.service";
import type {
  LoginUserResponse,
  RegisterUserRequest,
} from "../../types/entities/auth";

export const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    data: RegisterUserRequest,
  ): Promise<LoginUserResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await registerUser(data);
      console.log("Registration successful:", response.data);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.message || "Unknown error";
      setError("Registration failed: " + errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
};
