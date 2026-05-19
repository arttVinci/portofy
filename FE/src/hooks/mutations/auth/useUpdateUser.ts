import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { UpdateUserRequest, UserResponse } from "@/@types";

interface UseUpdateUserOptions {
  onSuccess?: (data: UserResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateUser = (options?: UseUpdateUserOptions) => {
  const queryClient = useQueryClient();
  return useMutation<UserResponse, ApiError, UpdateUserRequest>({
    mutationFn: (payload) => authService.updateUser(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "currentUser"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
