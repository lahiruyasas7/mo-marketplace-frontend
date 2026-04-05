import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';

import VariantSelector from '../components/product/VariantSelector';
import { useProduct } from '@/hooks/products/useProduct';
import QuickBuy from '@/components/product/QuickBuy';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useProduct(id!);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleSelect = (key: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Find selected variant
  const selectedVariant = useMemo(() => {
    if (!data) return null;

    return data.variants.find((variant: (typeof data.variants)[0]) =>
      Object.entries(selectedOptions).every(([k, v]) => variant.options[k] === v)
    );
  }, [selectedOptions, data]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!data) return <p>Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Responsive grid: image left, details right on large screens */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="lg:w-1/2 w-full h-96 rounded-lg overflow-hidden shadow-sm flex items-center justify-center">
          {data.productImageUrl ? (
            <img
              src={data.productImageUrl}
              alt={data.name}
              className="w-full h-full object-contain transform transition-transform duration-300 ease-in-out hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 w-full flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
          <p className="text-gray-500 mb-4">{data.description}</p>

          {/* Variant Selector */}
          <VariantSelector
            options={data.options}
            selected={selectedOptions}
            onChange={handleSelect}
            variants={data.variants}
          />

          {/* Clear Selection */}
          {Object.keys(selectedOptions).length > 0 && (
            <button
              onClick={() => setSelectedOptions({})}
              className="mt-2 text-sm text-gray-500 underline cursor-pointer"
            >
              Clear selection
            </button>
          )}

          {/* Variant Info */}
          {selectedVariant ? (
            <div className="mt-6 border p-4 rounded">
              <p className="text-lg font-semibold">Rs. {selectedVariant.price}</p>

              {selectedVariant.stock > 0 ? (
                <p className="text-green-600">In Stock ({selectedVariant.stock})</p>
              ) : (
                <p className="text-red-500">Out of Stock</p>
              )}
            </div>
          ) : (
            <p className="mt-4 text-gray-400">Select options to see price and availability</p>
          )}

          {/* Quick Buy */}
          <div className="mt-4">
            <QuickBuy productId={id} variant={selectedVariant} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
