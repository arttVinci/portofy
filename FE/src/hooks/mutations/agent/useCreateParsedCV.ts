import type { ParsedCVResponse } from "@/@types";
import { useMutation } from "@tanstack/react-query";
import parsedCVService from "@/services/parsed_cv.service";
import { ApiError } from "@/api/apiError";

interface UseCreateParsedCVOptions {
  onSuccess?: (data: ParsedCVResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useCreateParsedCV = (options?: UseCreateParsedCVOptions) => {
  return useMutation<ParsedCVResponse, ApiError, FormData>({
    mutationFn: (payload: FormData) => parsedCVService.parseCV(payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
