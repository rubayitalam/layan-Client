import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';

export const useLoyaltyProgram = () => {
  return useQuery({
    queryKey: ['loyalty-program'],
    queryFn: async () => {
      const res = await ApiClient.get<any[]>('/loyalty-program');
      return res.data || [];
    }
  });
};
