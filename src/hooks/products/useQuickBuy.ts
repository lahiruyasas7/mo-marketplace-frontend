import { quickBuy } from '@/api/product.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useQuickBuy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: quickBuy,
    onSuccess: () => {
      // Invalidate the products query to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
};
