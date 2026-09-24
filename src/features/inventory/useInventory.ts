import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';

export const useInventory = (businessId?: string) => {
  return useQuery({
    queryKey: ['inventory-item', businessId],
    queryFn: async () => {
      const res = await ApiClient.get<any[]>(`/inventory-item`);
      return res.data || [];
    }
  });
};

export const useAddInventoryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemData: any) => {
      return await ApiClient.post('/inventory-item', itemData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-item'] });
    }
  });
};
