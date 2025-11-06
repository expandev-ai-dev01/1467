import type { ProductListParams, ProductListResponse } from '../../types';

/**
 * @interface UseProductListOptions
 * @summary Options for useProductList hook
 */
export interface UseProductListOptions {
  params?: ProductListParams;
  enabled?: boolean;
}

/**
 * @interface UseProductListReturn
 * @summary Return type for useProductList hook
 */
export interface UseProductListReturn {
  data: ProductListResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
