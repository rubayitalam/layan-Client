import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';

export const useReferrals = () => {
  return useQuery({
    queryKey: ['referral'],
    queryFn: async () => {
      const res = await ApiClient.get<any[]>('/referral');
      return res.data || [];
    }
  });
};
