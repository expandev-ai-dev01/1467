import type { ProductDetail } from '../../types';

/**
 * @interface UseProductDetailOptions
 * @summary Options for useProductDetail hook
 */
export interface UseProductDetailOptions {
  productId: number | null;
  enabled?: boolean;
}

/**
 * @interface UseProductDetailReturn
 * @summary Return type for useProductDetail hook
 */
export interface UseProductDetailReturn {
  data: ProductDetail | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
