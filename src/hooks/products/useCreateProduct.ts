import { createProduct } from '@/api/product.api';
import { useMutation } from '@tanstack/react-query';

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
  });
};
