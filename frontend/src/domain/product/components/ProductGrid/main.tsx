import { cn } from '@/core/utils/cn';
import { ProductCard } from '../ProductCard';
import type { ProductGridProps } from './types';

/**
 * @component ProductGrid
 * @summary Responsive grid layout for product cards
 * @domain product
 * @type domain-component
 * @category layout
 *
 * @description
 * Displays products in a responsive grid:
 * - 4 columns on desktop (>= 1024px)
 * - 3 columns on tablet (>= 768px)
 * - 2 columns on mobile (< 768px)
 */
export const ProductGrid = ({
  products,
  onProductClick,
  isLoading = false,
  className,
}: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6', className)}>
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className="bg-monster-gray border border-gray-700 rounded-lg overflow-hidden animate-pulse"
          >
            <div className="w-full h-64 bg-gray-800" />
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-800 rounded" />
              <div className="h-4 bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-800 rounded w-1/2" />
              <div className="h-8 bg-gray-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6', className)}>
      {products.map((product) => (
        <ProductCard key={product.idProduct} product={product} onProductClick={onProductClick} />
      ))}
    </div>
  );
};
