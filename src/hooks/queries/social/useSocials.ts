import { useQuery } from "@tanstack/react-query";
import type { SocialResponse } from "@/@types";
import { socialService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseSocialsOptions {
  enabled?: boolean;
  onSuccess?: (data: SocialResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useSocials = (username: string, options?: UseSocialsOptions) => {
  return useQuery<SocialResponse[], ApiError>({
    queryKey: ["public-socials", username],
    queryFn: () => socialService.getAllByUsername(username),
    enabled: !!username && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
