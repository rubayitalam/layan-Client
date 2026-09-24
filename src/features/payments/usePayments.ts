import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';

export const usePayments = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await ApiClient.get<any[]>('/payment');
      return res.data || [];
    }
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payData: any) => {
      return await ApiClient.post('/payment', payData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    }
  });
};
