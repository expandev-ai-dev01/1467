import { useState, useCallback, useMemo, useEffect } from 'react';
import type { UsePriceFilterOptions, UsePriceFilterReturn } from './types';

/**
 * @hook usePriceFilter
 * @summary Hook for managing price range filtering with session persistence
 * @domain product
 * @type domain-hook
 * @category filter
 *
 * @description
 * Manages price filter functionality with:
 * - Dynamic catalog price limits calculation
 * - Real-time product filtering by price range
 * - Session persistence (maintains filter during navigation)
 * - Integration with text search filters
 * - Automatic filter state management
 */
export const usePriceFilter = (options: UsePriceFilterOptions): UsePriceFilterReturn => {
  const { products = [], onFilterChange } = options;

  // Calculate catalog price limits from products
  const catalogMinPrice = useMemo(() => {
    if (products.length === 0) return 0;
    return Math.min(...products.map((p) => p.price));
  }, [products]);

  const catalogMaxPrice = useMemo(() => {
    if (products.length === 0) return 0;
    return Math.max(...products.map((p) => p.price));
  }, [products]);

  // Initialize from sessionStorage or catalog limits
  const [minPrice, setMinPrice] = useState<number>(() => {
    try {
      const saved = sessionStorage.getItem('monster_price_filter_min');
      return saved ? parseFloat(saved) : catalogMinPrice;
    } catch (error: unknown) {
      return catalogMinPrice;
    }
  });

  const [maxPrice, setMaxPrice] = useState<number>(() => {
    try {
      const saved = sessionStorage.getItem('monster_price_filter_max');
      return saved ? parseFloat(saved) : catalogMaxPrice;
    } catch (error: unknown) {
      return catalogMaxPrice;
    }
  });

  // Update prices when catalog limits change
  useEffect(() => {
    if (catalogMinPrice > 0 && catalogMaxPrice > 0) {
      const savedMin = sessionStorage.getItem('monster_price_filter_min');
      const savedMax = sessionStorage.getItem('monster_price_filter_max');

      if (!savedMin) setMinPrice(catalogMinPrice);
      if (!savedMax) setMaxPrice(catalogMaxPrice);
    }
  }, [catalogMinPrice, catalogMaxPrice]);

  // Check if filter is active
  const isFilterActive = useMemo(() => {
    return minPrice !== catalogMinPrice || maxPrice !== catalogMaxPrice;
  }, [minPrice, maxPrice, catalogMinPrice, catalogMaxPrice]);

  // Filter products by price range
  const filteredProducts = useMemo(() => {
    if (!isFilterActive) {
      return products;
    }

    return products.filter((product) => {
      return product.price >= minPrice && product.price <= maxPrice;
    });
  }, [products, minPrice, maxPrice, isFilterActive]);

  // Handle price change
  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      // Validate price range
      const validMin = Math.max(catalogMinPrice, Math.min(min, max));
      const validMax = Math.min(catalogMaxPrice, Math.max(min, max));

      setMinPrice(validMin);
      setMaxPrice(validMax);

      // Save to sessionStorage
      try {
        sessionStorage.setItem('monster_price_filter_min', validMin.toString());
        sessionStorage.setItem('monster_price_filter_max', validMax.toString());
      } catch (error: unknown) {
        console.error('Failed to save price filter to sessionStorage:', error);
      }

      if (onFilterChange) {
        onFilterChange(validMin, validMax);
      }
    },
    [catalogMinPrice, catalogMaxPrice, onFilterChange]
  );

  // Clear filter
  const clearFilter = useCallback(() => {
    setMinPrice(catalogMinPrice);
    setMaxPrice(catalogMaxPrice);

    // Remove from sessionStorage
    try {
      sessionStorage.removeItem('monster_price_filter_min');
      sessionStorage.removeItem('monster_price_filter_max');
    } catch (error: unknown) {
      console.error('Failed to clear price filter from sessionStorage:', error);
    }

    if (onFilterChange) {
      onFilterChange(catalogMinPrice, catalogMaxPrice);
    }
  }, [catalogMinPrice, catalogMaxPrice, onFilterChange]);

  return {
    minPrice,
    maxPrice,
    catalogMinPrice,
    catalogMaxPrice,
    isFilterActive,
    filteredProducts,
    handlePriceChange,
    clearFilter,
    totalResults: filteredProducts.length,
  };
};
