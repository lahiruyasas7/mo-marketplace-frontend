import type { GetProductsParams, GetProductsResponse } from '@/types/product.types';
import { api } from './axios'; // your interceptor

export const getProducts = async (params: GetProductsParams): Promise<GetProductsResponse> => {
  const { data } = await api.get('/product', {
    params,
  });

  return data;
};
