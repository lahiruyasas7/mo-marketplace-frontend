import { getProducts } from '@/api/product.api';
import type { GetProductsParams } from '@/types/product.types';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useProducts = (params: GetProductsParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    placeholderData: keepPreviousData, // smooth pagination
  });
};
