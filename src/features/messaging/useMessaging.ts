import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';

export const useMessages = (threadId?: string) => {
  return useQuery({
    queryKey: ['messages', threadId],
    queryFn: async () => {
      const res = await ApiClient.get<any[]>(`/message`);
      return res.data || [];
    }
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (msgData: { thread_id: string; body: string }) => {
      return await ApiClient.post('/message', msgData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });
};
