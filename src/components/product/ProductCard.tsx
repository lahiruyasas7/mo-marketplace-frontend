import type { Product } from '@/types/product.types';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{product.name}</h3>

      <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

      <div className="mt-2 text-sm">
        <span className="font-medium">
          Rs. {product.min_price} - {product.max_price}
        </span>
      </div>

      <div className="text-xs text-gray-400 mt-1">{product.total_variants} variants</div>
    </div>
  );
};

export default ProductCard;
