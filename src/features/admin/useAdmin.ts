import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';

export const useAdminVerifications = () => {
  return useQuery({
    queryKey: ['admin-verifications'],
    queryFn: async () => {
      const res = await ApiClient.get<any[]>(`/business`);
      return res.data?.filter(b => b.verification_status === 'pending') || [];
    }
  });
};

export const useVerifyBusiness = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ businessId, status }: { businessId: string; status: 'verified' | 'rejected' }) => {
      return await ApiClient.put(`/business/${businessId}`, { verification_status: status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-verifications'] });
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
    }
  });
};
