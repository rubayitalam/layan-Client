import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';

export interface FraudFlag {
  _id?: string;
  user_id?: string;
  business_id?: string;
  flag_type: 'excessive_cancellations' | 'suspicious_activity' | 'chargeback_risk' | 'fake_reviews';
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'investigating' | 'resolved' | 'dismissed';
  notes?: string;
  created_at?: string;
}

export const useFraudFlags = () => {
  return useQuery({
    queryKey: ['fraud-flag'],
    queryFn: async () => {
      const res = await ApiClient.get<FraudFlag[]>('/fraud-flag');
      return res.data || [];
    }
  });
};

export const useUpdateFraudFlag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ flagId, status }: { flagId: string; status: FraudFlag['status'] }) => {
      return await ApiClient.put<FraudFlag>(`/fraud-flag/${flagId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fraud-flag'] });
    }
  });
};
