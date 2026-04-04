import { Link } from 'react-router-dom';
import type { Product } from '@/types/product.types';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="block border rounded-xl p-4 shadow-sm hover:shadow-md hover:border-black transition cursor-pointer"
    >
      {/* Image container */}
      <div className="w-full h-48 overflow-hidden rounded-lg">
        {product.productImageUrl ? (
          <img
            src={product.productImageUrl}
            alt={product.name}
            className="w-full h-full object-contain transform transition-transform duration-300 ease-in-out hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      <h3 className="font-semibold text-lg mt-2">{product.name}</h3>

      <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

      <div className="mt-2 text-sm">
        <span className="font-medium">
          Rs. {product.min_price} - {product.max_price}
        </span>
      </div>

      <div className="text-xs text-gray-400 mt-1">{product.total_variants} variants</div>
    </Link>
  );
};

export default ProductCard;
