import { useMutation, useQueryClient } from "@tanstack/react-query";
import { experienceService } from "@/services";
import { ApiError } from "@/api/apiError";
import type {
  BulkCreateExperienceRequest,
  ExperienceResponse,
} from "@/@types";

interface UseBulkCreateExperienceOptions {
  onSuccess?: (data: ExperienceResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useBulkCreateExperience = (
  options?: UseBulkCreateExperienceOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    ExperienceResponse[],
    ApiError,
    BulkCreateExperienceRequest
  >({
    mutationFn: (payload: BulkCreateExperienceRequest) =>
      experienceService.bulkCreate(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
