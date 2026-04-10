import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  LoginUserRequest,
  LoginUserResponse,
} from "@/@types/entities/auth.types";
import { STORAGE_KEYS } from "@/config/api.config";
import { ApiError } from "@/api/apiError";
import authService from "@/services/auth.service";

interface UseLoginOptions {
  onSuccess?: (data: LoginUserResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useLogin = (options?: UseLoginOptions) => {
  const queryClient = useQueryClient();

  return useMutation<LoginUserResponse, ApiError, LoginUserRequest>({
    mutationFn: (payload: LoginUserRequest) => authService.loginUser(payload),

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
