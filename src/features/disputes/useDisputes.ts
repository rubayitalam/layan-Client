import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';

export interface Dispute {
  _id?: string;
  payment_id: string;
  raised_by: 'customer' | 'business';
  reason: string;
  status: 'open' | 'under_review' | 'resolved_merchant_payout' | 'resolved_customer_refund' | 'dismissed';
  resolution?: string;
  created_at?: string;
}

export const useDisputes = () => {
  return useQuery({
    queryKey: ['dispute'],
    queryFn: async () => {
      const res = await ApiClient.get<Dispute[]>('/dispute');
      return res.data || [];
    }
  });
};

export const useResolveDispute = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ disputeId, status, resolution }: { disputeId: string; status: Dispute['status']; resolution: string }) => {
      return await ApiClient.put<Dispute>(`/dispute/${disputeId}`, { status, resolution });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dispute'] });
    }
  });
};
