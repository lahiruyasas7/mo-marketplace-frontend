import { useNavigate } from 'react-router-dom';
import type { Variant } from '@/types/product.types';
import { toast } from 'sonner';

interface Props {
  productId: string | undefined;
  variant: Variant | null;
}

const QuickBuy = ({ productId, variant }: Props) => {
  const navigate = useNavigate();

  const handleBuy = () => {
    if (!variant) {
      toast('Please select a variant');
      return;
    }

    if (variant.stock === 0) {
      toast.error('Out of stock');
      return;
    }

    navigate(`/checkout?productId=${productId}&variantId=${variant.id}`);
  };

  return (
    <button
      onClick={handleBuy}
      disabled={!variant || variant.stock === 0}
      className="w-full mt-4 bg-black text-white py-2 rounded disabled:opacity-50 cursor-pointer"
    >
      Quick Buy
    </button>
  );
};

export default QuickBuy;
