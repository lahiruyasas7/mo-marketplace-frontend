import { useState } from 'react';
import ProductList from '../components/product/ProductList';
import ProductSearch from '../components/product/ProductSearch';
import ProductPagination from '../components/product/ProductPagination';
import { useProducts } from '@/hooks/products/useProducts';

const ProductListPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useProducts({
    page,
    limit: 10,
    search,
  });

  const handleSearch = (value: string) => {
    setPage(1); // reset page
    setSearch(value);
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (isError || !data) {
    return <p className="text-center text-red-500">Failed to load products</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <ProductSearch onSearch={handleSearch} />

      <ProductList products={data.data} />

      <ProductPagination
        page={data.meta.page}
        totalPages={data.meta.total_pages}
        onChange={setPage}
      />
    </div>
  );
};

export default ProductListPage;
