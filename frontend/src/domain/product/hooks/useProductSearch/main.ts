import { useState, useCallback, useMemo, useEffect } from 'react';
import type { UseProductSearchOptions, UseProductSearchReturn } from './types';
import type { Product } from '../../types';

/**
 * @hook useProductSearch
 * @summary Hook for managing text-based product search with debounce and history
 * @domain product
 * @type domain-hook
 * @category search
 *
 * @description
 * Manages text search functionality with:
 * - Real-time search with debounce (300ms)
 * - Case-insensitive and accent-insensitive matching
 * - Search history (last 5 terms)
 * - Partial match support
 * - Integration with price filters
 */
export const useProductSearch = (options: UseProductSearchOptions): UseProductSearchReturn => {
  const { products = [], onSearchChange } = options;

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('monster_search_history');
      return saved ? JSON.parse(saved) : [];
    } catch (error: unknown) {
      return [];
    }
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Normalize text for search (remove accents, lowercase, special chars)
  const normalizeText = useCallback((text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '');
  }, []);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < 3) {
      return products;
    }

    const normalizedSearch = normalizeText(debouncedSearchTerm);

    return products.filter((product) => {
      const searchableText = [product.name, product.shortDescription, product.category || ''].join(
        ' '
      );

      const normalizedProduct = normalizeText(searchableText);
      return normalizedProduct.includes(normalizedSearch);
    });
  }, [products, debouncedSearchTerm, normalizeText]);

  // Save search term to history
  const saveToHistory = useCallback((term: string) => {
    if (term.length < 3) return;

    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item !== term);
      const updated = [term, ...filtered].slice(0, 5);

      try {
        localStorage.setItem('monster_search_history', JSON.stringify(updated));
      } catch (error: unknown) {
        console.error('Failed to save search history:', error);
      }

      return updated;
    });
  }, []);

  // Handle search term change
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);

      if (value.length >= 3) {
        saveToHistory(value);
      }

      if (onSearchChange) {
        onSearchChange(value);
      }
    },
    [saveToHistory, onSearchChange]
  );

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setShowSuggestions(false);

    if (onSearchChange) {
      onSearchChange('');
    }
  }, [onSearchChange]);

  // Select suggestion from history
  const selectSuggestion = useCallback(
    (suggestion: string) => {
      setSearchTerm(suggestion);
      setDebouncedSearchTerm(suggestion);
      setShowSuggestions(false);

      if (onSearchChange) {
        onSearchChange(suggestion);
      }
    },
    [onSearchChange]
  );

  // Toggle suggestions visibility
  const toggleSuggestions = useCallback((show: boolean) => {
    setShowSuggestions(show);
  }, []);

  return {
    searchTerm,
    debouncedSearchTerm,
    filteredProducts,
    searchHistory,
    showSuggestions,
    handleSearchChange,
    clearSearch,
    selectSuggestion,
    toggleSuggestions,
    totalResults: filteredProducts.length,
  };
};
