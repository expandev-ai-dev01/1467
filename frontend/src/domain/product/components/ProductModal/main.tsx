import { useEffect, useState } from 'react';
import { cn } from '@/core/utils/cn';
import type { ProductModalProps } from './types';

/**
 * @component ProductModal
 * @summary Modal for displaying detailed product information
 * @domain product
 * @type domain-component
 * @category feedback
 *
 * @description
 * Displays complete product details including images, description,
 * nutritional information, and quantity controls.
 */
export const ProductModal = ({ product, isOpen, onClose, className }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={cn(
            'text-2xl',
            i <= Math.round(rating) ? 'text-monster-green' : 'text-gray-600'
          )}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleIncrement = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className={cn(
          'bg-monster-gray border border-monster-green rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-monster-gray border-b border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-monster-green">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="w-full h-96 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(product.averageRating)}</div>
                <span className="text-gray-400">({product.reviewCount} avaliações)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Descrição</h3>
                <p className="text-gray-300">{product.fullDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 text-sm">Volume:</span>
                  <p className="text-white font-semibold">{product.volume}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Categoria:</span>
                  <p className="text-white font-semibold">{product.category}</p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Informações Nutricionais</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Porção:</span>
                    <span className="text-white font-semibold">
                      {product.nutritionalInfo.servingSize}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Calorias:</span>
                    <span className="text-white font-semibold">
                      {product.nutritionalInfo.calories} kcal
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Açúcares:</span>
                    <span className="text-white font-semibold">
                      {product.nutritionalInfo.sugars}g
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cafeína:</span>
                    <span className="text-white font-semibold">
                      {product.nutritionalInfo.caffeine}mg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Taurina:</span>
                    <span className="text-white font-semibold">
                      {product.nutritionalInfo.taurine}mg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sódio:</span>
                    <span className="text-white font-semibold">
                      {product.nutritionalInfo.sodium}mg
                    </span>
                  </div>
                </div>

                {product.nutritionalInfo.caffeine > 150 && (
                  <div className="mt-3 p-2 bg-yellow-900/30 border border-yellow-600 rounded">
                    <p className="text-yellow-400 text-sm font-semibold">⚠️ Alto teor de cafeína</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Ingredientes</h3>
                <p className="text-gray-300 text-sm">
                  {product.nutritionalInfo.ingredients.join(', ')}
                </p>
              </div>

              {product.nutritionalInfo.allergens &&
                product.nutritionalInfo.allergens.length > 0 && (
                  <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-400 mb-2">Alérgenos</h3>
                    <p className="text-red-300 text-sm">
                      {product.nutritionalInfo.allergens.join(', ')}
                    </p>
                  </div>
                )}
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-400 text-sm">Preço:</span>
                <p className="text-3xl font-bold text-white">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity === 1}
                    className={cn(
                      'w-10 h-10 rounded font-bold text-xl',
                      quantity === 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-monster-green text-black hover:bg-green-400'
                    )}
                  >
                    -
                  </button>
                  <span className="text-white font-bold text-xl w-12 text-center">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity === 99}
                    className={cn(
                      'w-10 h-10 rounded font-bold text-xl',
                      quantity === 99
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-monster-green text-black hover:bg-green-400'
                    )}
                  >
                    +
                  </button>
                </div>

                <button
                  disabled={!product.available}
                  className={cn(
                    'px-8 py-3 rounded font-bold transition-colors',
                    product.available
                      ? 'bg-monster-green text-black hover:bg-green-400'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  )}
                >
                  {product.available ? 'Adicionar ao Carrinho' : 'Indisponível'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
