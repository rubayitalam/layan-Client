import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';
import { Service } from '@/types/api';

export const useServices = (businessId?: string) => {
  return useQuery({
    queryKey: ['services', businessId],
    queryFn: async () => {
      const res = await ApiClient.get<Service[]>('/service');
      const services = res.data || [];
      return businessId ? services.filter(s => s.business_id === businessId) : services;
    }
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (serviceData: Partial<Service>) => {
      return await ApiClient.post<Service>('/service', serviceData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    }
  });
};
