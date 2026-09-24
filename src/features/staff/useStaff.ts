import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';
import { Staff } from '@/types/api';

export const useStaff = (businessId?: string) => {
  return useQuery({
    queryKey: ['staff', businessId],
    queryFn: async () => {
      const res = await ApiClient.get<Staff[]>('/staff');
      const staffList = res.data || [];
      return businessId ? staffList.filter(s => s.business_id === businessId) : staffList;
    }
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (staffData: Partial<Staff>) => {
      return await ApiClient.post<Staff>('/staff', staffData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    }
  });
};
