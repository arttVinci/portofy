import { useMutation, useQueryClient } from "@tanstack/react-query";
import { experienceService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { UpdateExperienceRequest, ExperienceResponse } from "@/@types";

interface UseUpdateExperienceOptions {
  onSuccess?: (data: ExperienceResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateExperience = (options?: UseUpdateExperienceOptions) => {
  const queryClient = useQueryClient();

  return useMutation<
    ExperienceResponse,
    ApiError,
    { id: string; payload: UpdateExperienceRequest }
  >({
    mutationFn: ({ id, payload }) => experienceService.update(id, payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
