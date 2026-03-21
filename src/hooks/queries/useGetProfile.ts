import { useQuery } from "@tanstack/react-query";
import type { ProfileResponse } from "@/@types/entities/profile.types";
import profileService from "@/services/profile.service";
import { ApiError } from "@/api/apiError";

interface UseGetProfileOptions {
  enabled?: boolean;
  onSuccess?: (data: ProfileResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useGetProfile = (options?: UseGetProfileOptions) => {
  return useQuery<ProfileResponse, ApiError>({
    queryKey: ["user-profile"],
    queryFn: () => profileService.getProfile(),
    enabled: options?.enabled !== false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
