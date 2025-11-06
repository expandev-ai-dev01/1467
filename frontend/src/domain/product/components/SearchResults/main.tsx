import { cn } from '@/core/utils/cn';
import type { SearchResultsProps } from './types';

/**
 * @component SearchResults
 * @summary Displays search results count and highlights search terms
 * @domain product
 * @type domain-component
 * @category search
 *
 * @description
 * Shows the number of products found and provides feedback when no results are found.
 * Integrates with ProductGrid to display filtered products with highlighted search terms.
 */
export const SearchResults = ({
  totalResults,
  searchTerm,
  isSearching,
  className,
}: SearchResultsProps) => {
  if (!isSearching) {
    return (
      <div className={cn('text-center py-4', className)}>
        <p className="text-gray-400 text-lg">Todos os produtos</p>
      </div>
    );
  }

  if (totalResults === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="max-w-md mx-auto space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-bold text-white">Nenhum produto encontrado</h3>
          <p className="text-gray-400">
            Não encontramos produtos para sua busca:{' '}
            <span className="text-white font-semibold">"{searchTerm}"</span>
          </p>
          <p className="text-gray-500 text-sm">Tente usar termos diferentes ou mais genéricos</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('text-center py-4', className)}>
      <p className="text-gray-400 text-lg">
        <span className="text-monster-green font-bold">{totalResults}</span>{' '}
        {totalResults === 1 ? 'produto encontrado' : 'produtos encontrados'}
        {searchTerm && (
          <span>
            {' '}
            para <span className="text-white font-semibold">"{searchTerm}"</span>
          </span>
        )}
      </p>
    </div>
  );
};
