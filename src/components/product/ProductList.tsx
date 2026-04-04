import type { Product } from '@/types/product.types';
import ProductCard from './ProductCard';

const ProductList = ({ products }: { products: Product[] }) => {
  if (!products.length) {
    return <p className="text-center text-gray-500">No products found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;
