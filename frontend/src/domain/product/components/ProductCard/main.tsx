import { cn } from '@/core/utils/cn';
import type { ProductCardProps } from './types';

/**
 * @component ProductCard
 * @summary Card component for displaying product information
 * @domain product
 * @type domain-component
 * @category display
 *
 * @description
 * Displays product information including image, name, price, rating,
 * and nutritional summary in a card format.
 */
export const ProductCard = ({ product, onProductClick, className }: ProductCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={cn(
            'text-xl',
            i <= Math.round(rating) ? 'text-monster-green' : 'text-gray-600'
          )}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      className={cn(
        'bg-monster-gray border border-gray-700 rounded-lg overflow-hidden cursor-pointer transition-all hover:border-monster-green hover:shadow-lg hover:shadow-monster-green/20',
        !product.available && 'opacity-60',
        className
      )}
      onClick={() => onProductClick(product.idProduct)}
    >
      <div className="relative w-full h-64 bg-gray-800 flex items-center justify-center overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Indisponível</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-xl font-bold text-monster-green line-clamp-2">{product.name}</h3>

        <p className="text-gray-400 text-sm line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(product.averageRating)}</div>
          <span className="text-gray-400 text-sm">({product.reviewCount})</span>
        </div>

        <div className="bg-gray-800 rounded p-2 space-y-1">
          <p className="text-xs text-gray-400">Informações Nutricionais:</p>
          <div className="flex justify-between text-xs">
            <span className="text-gray-300">Calorias:</span>
            <span className="text-white font-semibold">{product.nutritionalSummary.calories}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-300">Açúcares:</span>
            <span className="text-white font-semibold">{product.nutritionalSummary.sugars}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-300">Cafeína:</span>
            <span className="text-white font-semibold">{product.nutritionalSummary.caffeine}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <span className="text-2xl font-bold text-white">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
    </div>
  );
};
