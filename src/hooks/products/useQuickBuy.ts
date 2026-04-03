import { quickBuy } from '@/api/product.api';
import { useMutation } from '@tanstack/react-query';

export const useQuickBuy = () => {
  return useMutation({
    mutationFn: quickBuy,
  });
};
