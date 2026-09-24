import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';
import { CustomerWallet, GiftCard, MembershipPlan } from '@/types/api';

export const useCustomerWallet = (customerId: string) => {
  return useQuery({
    queryKey: ['customer-wallet', customerId],
    queryFn: async () => {
      const res = await ApiClient.get<CustomerWallet[]>(`/customer-wallet`);
      return res.data || [];
    }
  });
};

export const useGiftCards = () => {
  return useQuery({
    queryKey: ['gift-card'],
    queryFn: async () => {
      const res = await ApiClient.get<GiftCard[]>(`/gift-card`);
      return res.data || [];
    }
  });
};
