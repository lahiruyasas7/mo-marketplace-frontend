import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';

import VariantSelector from '../components/product/VariantSelector';
import { useProduct } from '@/hooks/products/useProduct';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useProduct(id!);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    {}
  );

  const handleSelect = (key: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Find selected variant
  const selectedVariant = useMemo(() => {
    if (!data) return null;

    return data.variants.find((variant: typeof data.variants[0]) =>
      Object.entries(selectedOptions).every(
        ([k, v]) => variant.options[k] === v
      )
    );
  }, [selectedOptions, data]);

  if (isLoading) return <p className='text-center mt-10'>Loading...</p>;
  if (!data) return <p>Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <p className="text-gray-500 mb-4">{data.description}</p>

      {/* Variant Selector */}
      <VariantSelector
        options={data.options}
        selected={selectedOptions}
        onChange={handleSelect}
        variants={data.variants}
      />

      {/* Variant Info */}
      {selectedVariant ? (
        <div className="mt-6 border p-4 rounded">
          <p className="text-lg font-semibold">
            Rs. {selectedVariant.price}
          </p>

          {selectedVariant.stock > 0 ? (
            <p className="text-green-600">
              In Stock ({selectedVariant.stock})
            </p>
          ) : (
            <p className="text-red-500">Out of Stock</p>
          )}
        </div>
      ) : (
        <p className="mt-4 text-gray-400">
          Select options to see price and availability
        </p>
      )}
    </div>
  );
};

export default ProductDetailPage;