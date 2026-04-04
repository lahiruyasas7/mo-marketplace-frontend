import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProduct } from '@/hooks/products/useProduct';
import { useQuickBuy } from '@/hooks/products/useQuickBuy';
import type { ProductDetail } from '@/types/product.types';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const productId = params.get('productId');
  const variantId = params.get('variantId');

  const { data: product, isLoading } = useProduct(productId || '') as {
    data: ProductDetail | undefined;
    isLoading: boolean;
  };

  const { mutate, isPending } = useQuickBuy();
  const [quantity, setQuantity] = useState(1);

  if (!productId || !variantId) {
    return <p>Invalid checkout request</p>;
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  const variant = product?.variants.find((v) => v.id === variantId);

  if (!variant) {
    return <p>Variant not found</p>;
  }

  const handleConfirm = () => {
    mutate(
      {
        productId,
        variantId,
        quantity,
      },
      {
        onSuccess: () => {
          toast.success('Order placed successfully!');
          navigate('/products');
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || 'Failed to order');
        },
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>

      {/* Product Info */}
      <div className="border p-4 rounded mb-4">
        <h2 className="font-semibold">{product?.name}</h2>

        <div className="text-sm mt-2">
          {Object.entries(variant.options).map(([k, v]) => (
            <p key={k}>
              {k}: {v}
            </p>
          ))}
        </div>

        <p className="mt-2 font-medium">Price: Rs. {variant.price}</p>
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <label className="block mb-1">Quantity</label>
        <input
          type="number"
          min={1}
          max={variant.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>

      {/* Total */}
      <div className="mb-4 font-semibold">Total: Rs. {variant.price * quantity}</div>

      {/* Button */}
      <button
        onClick={handleConfirm}
        disabled={isPending}
        className="w-full bg-green-600 text-white py-2 rounded cursor-pointer"
      >
        {isPending ? 'Processing...' : 'Confirm Order'}
      </button>
    </div>
  );
};

export default CheckoutPage;
