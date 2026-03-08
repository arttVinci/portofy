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
  ): Promise<LoginUserResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await registerUser(data);
      console.log("Registration successful:", result);
      return result;
    } catch (err: any) {
      setError("Registration failed :" + (err.message || "Unknown error"));
      throw null;
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
