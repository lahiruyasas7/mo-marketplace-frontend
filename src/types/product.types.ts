export interface Product {
  id: string;
  name: string;
  description: string;
  min_price: number;
  max_price: number;
  total_variants: number;
  productImageUrl?: string; 
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

export interface Variant {
  id: string;
  combination_key: string;
  options: Record<string, string>;
  price: number;
  stock: number;
  is_active: boolean;
}

export interface ProductDetail {
  id: string;
  name: string;
  description: string;
  options: Record<string, string[]>;
  variants: Variant[];
}
