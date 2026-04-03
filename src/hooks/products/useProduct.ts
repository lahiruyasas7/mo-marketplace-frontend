import { getProductById } from '@/api/product.api';
import { useQuery } from '@tanstack/react-query';

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};