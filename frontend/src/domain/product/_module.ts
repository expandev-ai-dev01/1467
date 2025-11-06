/**
 * @module product
 * @summary Product catalog domain module for Monster Energy products
 * @domain functional
 * @dependencies TanStack Query, Axios, React Router
 * @version 1.1.0
 * @author Development Team
 * @lastModified 2024-01-15
 */

export * from './components';
export * from './hooks';
export * from './services';
export * from './types';

export const moduleMetadata = {
  name: 'product',
  domain: 'functional',
  version: '1.1.0',
  publicComponents: [
    'ProductCard',
    'ProductGrid',
    'Pagination',
    'ProductModal',
    'SearchBar',
    'SearchResults',
  ],
  publicHooks: ['useProductList', 'useProductDetail', 'useProductSearch'],
  publicServices: ['productService'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/lib/queryClient', '@/core/utils/cn'],
    external: ['react', 'react-router-dom', '@tanstack/react-query', 'axios'],
    domains: [],
  },
  exports: {
    components: [
      'ProductCard',
      'ProductGrid',
      'Pagination',
      'ProductModal',
      'SearchBar',
      'SearchResults',
    ],
    hooks: ['useProductList', 'useProductDetail', 'useProductSearch'],
    services: ['productService'],
    types: [
      'Product',
      'ProductDetail',
      'NutritionalSummary',
      'NutritionalInfo',
      'RatingDistribution',
      'ProductListParams',
      'ProductListResponse',
    ],
  },
} as const;
