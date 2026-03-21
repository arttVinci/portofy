import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { UpdateEducationRequest, EducationResponse } from "@/@types";

interface UseUpdateEducationOptions {
  onSuccess?: (data: EducationResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateEducation = (options?: UseUpdateEducationOptions) => {
  const queryClient = useQueryClient();

  return useMutation<
    EducationResponse,
    ApiError,
    { id: string; payload: UpdateEducationRequest }
  >({
    mutationFn: ({ id, payload }) => educationService.update(id, payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
