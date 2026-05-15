import { useMutation, useQueryClient } from "@tanstack/react-query";
import { skillService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { BulkDeleteSkillRequest } from "@/@types";

interface UseBulkDeleteSkillOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useBulkDeleteSkill = (
  options?: UseBulkDeleteSkillOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, BulkDeleteSkillRequest>({
    mutationFn: (payload: BulkDeleteSkillRequest) =>
      skillService.bulkDelete(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });

      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
