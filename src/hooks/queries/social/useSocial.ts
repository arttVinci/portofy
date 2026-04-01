import { useQuery } from "@tanstack/react-query";
import type { SocialResponse } from "@/@types";
import { socialService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseSocialOptions {
  enabled?: boolean;
  onSuccess?: (data: SocialResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useSocial = (
  username: string,
  id: string,
  options?: UseSocialOptions,
) => {
  return useQuery<SocialResponse, ApiError>({
    queryKey: ["socials", "public", username, id],
    queryFn: () => socialService.getByUsername(username, id),
    enabled: !!username && !!id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
