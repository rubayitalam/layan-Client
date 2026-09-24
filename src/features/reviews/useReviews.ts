import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';
import { Review } from '@/types/api';

export const useReviews = (businessId?: string) => {
  return useQuery({
    queryKey: ['reviews', businessId],
    queryFn: async () => {
      const res = await ApiClient.get<Review[]>('/review');
      const reviews = res.data || [];
      return businessId ? reviews.filter(r => r.business_id === businessId) : reviews;
    }
  });
};
