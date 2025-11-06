import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductDetailOptions, UseProductDetailReturn } from './types';

/**
 * @hook useProductDetail
 * @summary Hook for fetching product details
 * @domain product
 * @type domain-hook
 * @category data
 *
 * @description
 * Manages product detail fetching with automatic caching and loading states.
 */
export const useProductDetail = (options: UseProductDetailOptions): UseProductDetailReturn => {
  const { productId, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productService.getById(productId!),
    enabled: enabled && productId !== null,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
