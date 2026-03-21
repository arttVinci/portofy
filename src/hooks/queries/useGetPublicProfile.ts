import { useQuery } from "@tanstack/react-query";
import type { ProfileResponse } from "@/@types";
import { profileService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseGetPublicProfileOptions {
  enabled?: boolean;
  onSuccess?: (data: ProfileResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useGetPublicProfile = (
  username: string,
  options?: UseGetPublicProfileOptions,
) => {
  return useQuery<ProfileResponse, ApiError>({
    queryKey: ["public-profile", username],
    queryFn: () => profileService.getPublicProfile(username),
    enabled: !!username && options?.enabled !== false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
