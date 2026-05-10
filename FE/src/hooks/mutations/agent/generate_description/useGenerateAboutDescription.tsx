import type {
  GenerateAboutDescriptionRequest,
  GenerateAboutDescriptionResponse,
} from "@/@types";
import { useMutation } from "@tanstack/react-query";
import { aiDescriptionService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseGenerateAboutDescriptionOptions {
  onSuccess?: (data: GenerateAboutDescriptionResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useGenerateAboutDescription = (
  options?: UseGenerateAboutDescriptionOptions,
) => {
  return useMutation<
    GenerateAboutDescriptionResponse,
    ApiError,
    GenerateAboutDescriptionRequest
  >({
    mutationFn: (payload: GenerateAboutDescriptionRequest) =>
      aiDescriptionService.generateAboutDescription(payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
