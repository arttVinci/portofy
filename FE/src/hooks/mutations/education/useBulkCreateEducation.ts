import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationService } from "@/services";
import { ApiError } from "@/api/apiError";
import type {
  BulkCreateEducationRequest,
  EducationResponse,
} from "@/@types";

interface UseBulkCreateEducationOptions {
  onSuccess?: (data: EducationResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useBulkCreateEducation = (
  options?: UseBulkCreateEducationOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    EducationResponse[],
    ApiError,
    BulkCreateEducationRequest
  >({
    mutationFn: (payload: BulkCreateEducationRequest) =>
      educationService.bulkCreate(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
