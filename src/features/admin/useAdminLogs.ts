import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';

export interface AdminActionLog {
  _id?: string;
  admin_user_id: string;
  action_type: string;
  target_collection: string;
  target_id: string;
  details?: Record<string, any>;
  created_at?: string;
}

export const useAdminLogs = () => {
  return useQuery({
    queryKey: ['admin-action-log'],
    queryFn: async () => {
      const res = await ApiClient.get<AdminActionLog[]>('/admin-action-log');
      return res.data || [];
    }
  });
};

export const useCreateAdminLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (logData: AdminActionLog) => {
      return await ApiClient.post<AdminActionLog>('/admin-action-log', logData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-action-log'] });
    }
  });
};
