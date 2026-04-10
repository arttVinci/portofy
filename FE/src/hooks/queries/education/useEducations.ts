import { useQuery } from "@tanstack/react-query";
import type { EducationResponse } from "@/@types";
import { educationService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseEducationsOptions {
  enabled?: boolean;
  onSuccess?: (data: EducationResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useEducations = (
  username: string,
  options?: UseEducationsOptions,
) => {
  return useQuery<EducationResponse[], ApiError>({
    queryKey: ["educations", "public", username],
    queryFn: () => educationService.getAllByUsername(username),
    enabled: !!username && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
