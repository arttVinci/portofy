import { useState, useCallback } from "react";
import authService from "../../services/auth.service";
import { ApiError } from "../../api/apiError";
import type {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
} from "../../@types/entities/auth";

interface UseAuthProps {
  loginUser: (payload: LoginUserRequest) => Promise<LoginUserResponse | null>;
  createUser: (
    payload: RegisterUserRequest,
  ) => Promise<LoginUserResponse | null>;
  loading: boolean;
  error: string | null;
  validationErrors: Record<string, string[]> | null;
  clearError: () => void;
}

export const useAuth = (): UseAuthProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  const clearError = useCallback(() => {
    setError(null);
    setValidationErrors(null);
  }, []);

  const loginUser = useCallback(
    async (payload: LoginUserRequest): Promise<LoginUserResponse | null> => {
      setLoading(true);
      clearError();

      try {
        const result = await authService.loginUser(payload);
        return result;
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
          if (err.errors) {
            setValidationErrors(err.errors);
          }
        } else {
          setError("An unexpected error occurred");
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    [clearError],
  );

  const createUser = useCallback(
    async (payload: RegisterUserRequest): Promise<LoginUserResponse | null> => {
      setLoading(true);
      clearError();

      try {
        const result = await authService.createUser(payload);
        return result;
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
          if (err.errors) {
            setValidationErrors(err.errors);
          }
        } else {
          setError("An unexpected error occurred");
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    [clearError],
  );

  return {
    loginUser,
    createUser,
    loading,
    error,
    validationErrors,
    clearError,
  };
};
