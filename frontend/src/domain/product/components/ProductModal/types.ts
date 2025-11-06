import type { ProductDetail } from '../../types';

/**
 * @interface ProductModalProps
 * @summary Props for ProductModal component
 */
export interface ProductModalProps {
  product: ProductDetail | null;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}
