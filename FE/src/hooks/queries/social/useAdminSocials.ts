import { useQuery } from "@tanstack/react-query";
import type { SocialResponse } from "@/@types";
import { socialService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAdminSocialsOptions {
  enabled?: boolean;
  onSuccess?: (data: SocialResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminSocials = (options?: UseAdminSocialsOptions) => {
  return useQuery<SocialResponse[], ApiError>({
    queryKey: ["socials", "admin"],
    queryFn: () => socialService.getAll(),
    enabled: options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
