import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/lib/apiClient';
import { Appointment } from '@/types/api';

export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const res = await ApiClient.get<Appointment[]>('/appointment');
      return res.data || [];
    }
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Appointment>) => {
      return await ApiClient.post<Appointment>('/appointment', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    }
  });
};
