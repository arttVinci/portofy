// hooks/mutations/auth/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "../../../services/auth.service";
import { ApiError } from "../../../api/apiError";
import { STORAGE_KEYS } from "../../../config/api.config";

interface UseLogoutOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useLogout = (options?: UseLogoutOptions) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationFn: () => authService.logoutUser(),

    onSuccess: () => {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);

      queryClient.clear();

      options?.onSuccess?.();
    },

    onError: (error) => {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      queryClient.clear();

      options?.onError?.(error);
    },
  });
};
