import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api';

// Custom hook for fetching users
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.getUsers(),
  });
}

// Custom hook for creating a user
export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: Parameters<typeof apiClient.createUser>[0]) => 
      apiClient.createUser(userData),
    onSuccess: () => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Custom hook for AI chat
export function useAIChat() {
  return useMutation({
    mutationFn: (request: Parameters<typeof apiClient.chatWithAI>[0]) => 
      apiClient.chatWithAI(request),
  });
}