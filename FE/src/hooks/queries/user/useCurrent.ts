import type { UserResponse } from "@/@types";
import type { ApiError } from "@/api/apiError";
import { authService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { STORAGE_KEYS } from "@/config/api.config";

interface UseCurrentUserOptions {
  enabled?: boolean;
  onSuccess?: (data: UserResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useCurrent = (options: UseCurrentUserOptions) => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

  return useQuery<UserResponse, ApiError>({
    queryKey: ["auth", "currentUser"],
    queryFn: async () => authService.currentUser(),
    enabled: !!token && options?.enabled !== false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
