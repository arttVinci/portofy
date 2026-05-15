import { useMutation, useQueryClient } from "@tanstack/react-query";
import { skillService } from "@/services";
import { ApiError } from "@/api/apiError";
import type {
  BulkCreateSkillRequest,
  SkillResponse,
} from "@/@types";

interface UseBulkCreateSkillOptions {
  onSuccess?: (data: SkillResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useBulkCreateSkill = (
  options?: UseBulkCreateSkillOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    SkillResponse[],
    ApiError,
    BulkCreateSkillRequest
  >({
    mutationFn: (payload: BulkCreateSkillRequest) =>
      skillService.bulkCreate(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
