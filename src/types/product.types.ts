export interface Product {
  id: string;
  name: string;
  description: string;
  min_price: number;
  max_price: number;
  total_variants: number;
}

export interface ProductMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface GetProductsResponse {
  data: Product[];
  meta: ProductMeta;
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
}
