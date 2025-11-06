import type { Product } from '../../types';

/**
 * @interface ProductCardProps
 * @summary Props for ProductCard component
 */
export interface ProductCardProps {
  product: Product;
  onProductClick: (productId: number) => void;
  className?: string;
}
