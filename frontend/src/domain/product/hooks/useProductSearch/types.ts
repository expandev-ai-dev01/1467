import type { Product } from '../../types';

/**
 * @interface UseProductSearchOptions
 * @summary Options for useProductSearch hook
 */
export interface UseProductSearchOptions {
  products?: Product[];
  onSearchChange?: (searchTerm: string) => void;
}

/**
 * @interface UseProductSearchReturn
 * @summary Return type for useProductSearch hook
 */
export interface UseProductSearchReturn {
  searchTerm: string;
  debouncedSearchTerm: string;
  filteredProducts: Product[];
  searchHistory: string[];
  showSuggestions: boolean;
  handleSearchChange: (value: string) => void;
  clearSearch: () => void;
  selectSuggestion: (suggestion: string) => void;
  toggleSuggestions: (show: boolean) => void;
  totalResults: number;
}
