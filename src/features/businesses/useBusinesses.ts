import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';
import { Business } from '@/types/api';

export const useBusinesses = () => {
  return useQuery({
    queryKey: ['businesses'],
    queryFn: async () => {
      const res = await ApiClient.get<Business[]>('/business');
      return res.data || [];
    }
  });
};
