import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductListOptions, UseProductListReturn } from './types';

/**
 * @hook useProductList
 * @summary Hook for fetching paginated product list
 * @domain product
 * @type domain-hook
 * @category data
 *
 * @description
 * Manages product list fetching with pagination support using TanStack Query.
 * Provides loading states, error handling, and automatic caching.
 */
export const useProductList = (options: UseProductListOptions = {}): UseProductListReturn => {
  const { params = { page: 1, pageSize: 16 }, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.list(params),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
