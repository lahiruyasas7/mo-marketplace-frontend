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

export const getProductById = async (id: string) => {
  const { data } = await api.get(`/product/${id}`);
  return data;
};

export const quickBuy = async (payload: {
  productId: string;
  variantId: string;
  quantity: number;
}) => {
  const { data } = await api.post('/order/quick-buy', payload);
  return data;
};
