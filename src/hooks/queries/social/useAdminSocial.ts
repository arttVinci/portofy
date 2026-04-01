import { useQuery } from "@tanstack/react-query";
import type { SocialResponse } from "@/@types";
import { socialService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAdminSocialOptions {
  enabled?: boolean;
  onSuccess?: (data: SocialResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminSocial = (id: string, options?: UseAdminSocialOptions) => {
  return useQuery<SocialResponse, ApiError>({
    queryKey: ["socials", "admin", id],
    queryFn: () => socialService.getById(id),
    enabled: !!id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
