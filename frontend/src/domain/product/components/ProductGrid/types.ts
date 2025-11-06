import type { Product } from '../../types';

/**
 * @interface ProductGridProps
 * @summary Props for ProductGrid component
 */
export interface ProductGridProps {
  products: Product[];
  onProductClick: (productId: number) => void;
  isLoading?: boolean;
  className?: string;
}
