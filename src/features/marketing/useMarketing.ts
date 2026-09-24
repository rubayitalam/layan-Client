import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';

export interface MarketingCampaign {
  _id?: string;
  business_id: string;
  channel: 'sms' | 'email' | 'push';
  template: string;
  segment_definition: {
    type: 'all' | 'inactive_30_days' | 'inactive_60_days' | 'inactive_90_days' | 'vip' | 'birthday';
    [key: string]: any;
  };
  status: 'draft' | 'scheduled' | 'sent' | 'cancelled';
  scheduled_at?: string;
  is_ai_generated?: boolean;
}

export const useMarketingCampaigns = (businessId?: string) => {
  return useQuery({
    queryKey: ['marketing-campaign', businessId],
    queryFn: async () => {
      const res = await ApiClient.get<MarketingCampaign[]>('/marketing-campaign');
      const campaigns = res.data || [];
      return businessId ? campaigns.filter(c => c.business_id === businessId) : campaigns;
    }
  });
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (campaignData: MarketingCampaign) => {
      return await ApiClient.post<MarketingCampaign>('/marketing-campaign', campaignData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing-campaign'] });
    }
  });
};
