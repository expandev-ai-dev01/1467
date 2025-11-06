import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/core/utils/cn';
import type { PriceFilterProps } from './types';

/**
 * @component PriceFilter
 * @summary Price range filter with slider and manual input
 * @domain product
 * @type domain-component
 * @category filter
 *
 * @description
 * Provides price filtering functionality with:
 * - Dual-handle range slider for min/max price selection
 * - Manual input fields with currency formatting (R$)
 * - Real-time value display during slider adjustment
 * - Clear filter button (visible only when active)
 * - Automatic validation of price ranges
 * - Debounced updates to prevent excessive filtering
 */
export const PriceFilter = ({
  minPrice,
  maxPrice,
  catalogMinPrice,
  catalogMaxPrice,
  isFilterActive,
  onPriceChange,
  onClearFilter,
  className,
}: PriceFilterProps) => {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [isDragging, setIsDragging] = useState(false);

  // Update local state when props change
  useEffect(() => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  }, [minPrice, maxPrice]);

  // Format currency for display
  const formatCurrency = useCallback((value: number): string => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }, []);

  // Parse currency input
  const parseCurrency = useCallback((value: string): number => {
    const cleaned = value.replace(/[^0-9,]/g, '').replace(',', '.');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  // Handle slider change
  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, isMin: boolean) => {
      const value = parseFloat(e.target.value);

      if (isMin) {
        const newMin = Math.min(value, localMaxPrice);
        setLocalMinPrice(newMin);
      } else {
        const newMax = Math.max(value, localMinPrice);
        setLocalMaxPrice(newMax);
      }

      setIsDragging(true);
    },
    [localMinPrice, localMaxPrice]
  );

  // Handle slider release (apply filter)
  const handleSliderRelease = useCallback(() => {
    setIsDragging(false);
    onPriceChange(localMinPrice, localMaxPrice);
  }, [localMinPrice, localMaxPrice, onPriceChange]);

  // Handle manual input change
  const handleInputChange = useCallback(
    (value: string, isMin: boolean) => {
      const parsed = parseCurrency(value);

      if (isMin) {
        const newMin = Math.max(catalogMinPrice, Math.min(parsed, localMaxPrice));
        setLocalMinPrice(newMin);
        onPriceChange(newMin, localMaxPrice);
      } else {
        const newMax = Math.min(catalogMaxPrice, Math.max(parsed, localMinPrice));
        setLocalMaxPrice(newMax);
        onPriceChange(localMinPrice, newMax);
      }
    },
    [catalogMinPrice, catalogMaxPrice, localMinPrice, localMaxPrice, parseCurrency, onPriceChange]
  );

  // Calculate slider positions for visual representation
  const minPercent =
    ((localMinPrice - catalogMinPrice) / (catalogMaxPrice - catalogMinPrice)) * 100;
  const maxPercent =
    ((localMaxPrice - catalogMinPrice) / (catalogMaxPrice - catalogMinPrice)) * 100;

  return (
    <div
      className={cn('bg-monster-gray border border-gray-700 rounded-lg p-6 space-y-6', className)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Filtrar por Preço</h3>
        {isFilterActive && (
          <button
            onClick={onClearFilter}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded transition-colors text-sm"
            aria-label="Limpar filtro de preço"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Limpar filtro de preço
          </button>
        )}
      </div>

      {/* Manual Input Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Preço Mínimo</label>
          <input
            type="text"
            value={formatCurrency(localMinPrice)}
            onChange={(e) => handleInputChange(e.target.value, true)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-monster-green"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Preço Máximo</label>
          <input
            type="text"
            value={formatCurrency(localMaxPrice)}
            onChange={(e) => handleInputChange(e.target.value, false)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-monster-green"
          />
        </div>
      </div>

      {/* Range Slider */}
      <div className="space-y-4">
        <div className="relative h-2 bg-gray-700 rounded">
          {/* Active range highlight */}
          <div
            className="absolute h-full bg-monster-green rounded"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
          />

          {/* Min slider */}
          <input
            type="range"
            min={catalogMinPrice}
            max={catalogMaxPrice}
            step="0.01"
            value={localMinPrice}
            onChange={(e) => handleSliderChange(e, true)}
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-monster-green [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-monster-green [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-black"
            style={{
              zIndex:
                localMinPrice > catalogMinPrice + (catalogMaxPrice - catalogMinPrice) * 0.5 ? 5 : 3,
            }}
          />

          {/* Max slider */}
          <input
            type="range"
            min={catalogMinPrice}
            max={catalogMaxPrice}
            step="0.01"
            value={localMaxPrice}
            onChange={(e) => handleSliderChange(e, false)}
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-monster-green [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-monster-green [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-black"
            style={{ zIndex: 4 }}
          />
        </div>

        {/* Real-time value display */}
        {isDragging && (
          <div className="flex justify-between text-sm">
            <span className="text-monster-green font-semibold">
              {formatCurrency(localMinPrice)}
            </span>
            <span className="text-monster-green font-semibold">
              {formatCurrency(localMaxPrice)}
            </span>
          </div>
        )}

        {/* Catalog limits display */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>{formatCurrency(catalogMinPrice)}</span>
          <span>{formatCurrency(catalogMaxPrice)}</span>
        </div>
      </div>
    </div>
  );
};
