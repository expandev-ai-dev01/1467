import type { Product } from '../../types';

/**
 * @interface UsePriceFilterOptions
 * @summary Options for usePriceFilter hook
 */
export interface UsePriceFilterOptions {
  products?: Product[];
  onFilterChange?: (minPrice: number, maxPrice: number) => void;
}

/**
 * @interface UsePriceFilterReturn
 * @summary Return type for usePriceFilter hook
 */
export interface UsePriceFilterReturn {
  minPrice: number;
  maxPrice: number;
  catalogMinPrice: number;
  catalogMaxPrice: number;
  isFilterActive: boolean;
  filteredProducts: Product[];
  handlePriceChange: (min: number, max: number) => void;
  clearFilter: () => void;
  totalResults: number;
}
