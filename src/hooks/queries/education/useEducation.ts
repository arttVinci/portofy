import { useQuery } from "@tanstack/react-query";
import type { EducationResponse } from "@/@types";
import { educationService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseEducationOptions {
  enabled?: boolean;
  onSuccess?: (data: EducationResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useEducation = (
  username: string,
  id: string,
  options?: UseEducationOptions,
) => {
  return useQuery<EducationResponse, ApiError>({
    queryKey: ["educations", "public", username, id],
    queryFn: () => educationService.getByUsername(username, id),
    enabled: !!username && !!id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
