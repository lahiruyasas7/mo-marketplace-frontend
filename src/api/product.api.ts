import type { GetProductsParams, GetProductsResponse } from '@/types/product.types';
import { api } from './axios'; // your interceptor
import type { CreateProductFormValues } from '@/schemas/product.schema';

export const getProducts = async (params: GetProductsParams): Promise<GetProductsResponse> => {
  const { data } = await api.get('/product', {
    params,
  });

  return data;
};

export const createProduct = async (data: CreateProductFormValues) => {
  const res = await api.post('/product', data);
  return res.data;
};
