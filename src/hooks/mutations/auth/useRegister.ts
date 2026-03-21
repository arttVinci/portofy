// hooks/mutations/auth/useRegister.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "../../../services/auth.service";
import { ApiError } from "../../../api/apiError";
import { STORAGE_KEYS } from "../../../config/api.config";
import type {
  RegisterUserRequest,
  LoginUserResponse,
} from "../../../@types/entities/auth.types";

interface UseRegisterOptions {
  onSuccess?: (data: LoginUserResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useRegister = (options?: UseRegisterOptions) => {
  const queryClient = useQueryClient();

  return useMutation<LoginUserResponse, ApiError, RegisterUserRequest>({
    mutationFn: (payload: RegisterUserRequest) =>
      authService.createUser(payload),

    onSuccess: (data) => {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);

      queryClient.setQueryData(["auth", "currentUser"], data.user);

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
