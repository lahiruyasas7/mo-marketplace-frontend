import { createProduct } from '@/api/product.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate the products query to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
