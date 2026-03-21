import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseDeleteEducationOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteEducation = (options?: UseDeleteEducationOptions) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id) => educationService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
