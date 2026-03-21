import { useMutation, useQueryClient } from "@tanstack/react-query";
import { skillService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseDeleteSkillOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteSkill = (options?: UseDeleteSkillOptions) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id) => skillService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
