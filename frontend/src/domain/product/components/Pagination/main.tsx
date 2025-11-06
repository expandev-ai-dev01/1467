import { cn } from '@/core/utils/cn';
import type { PaginationProps } from './types';

/**
 * @component Pagination
 * @summary Pagination controls for product list
 * @domain product
 * @type domain-component
 * @category navigation
 *
 * @description
 * Provides pagination controls with first, previous, next, and last page buttons.
 * Displays current page and total pages.
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrevious,
  className,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <button
        onClick={() => handlePageChange(1)}
        disabled={!hasPrevious}
        className={cn(
          'px-4 py-2 rounded font-semibold transition-colors',
          hasPrevious
            ? 'bg-monster-green text-black hover:bg-green-400'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        )}
      >
        Primeira
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className={cn(
          'px-4 py-2 rounded font-semibold transition-colors',
          hasPrevious
            ? 'bg-monster-green text-black hover:bg-green-400'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        )}
      >
        Anterior
      </button>

      <span className="px-4 py-2 text-white font-semibold">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNext}
        className={cn(
          'px-4 py-2 rounded font-semibold transition-colors',
          hasNext
            ? 'bg-monster-green text-black hover:bg-green-400'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        )}
      >
        Próxima
      </button>

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={!hasNext}
        className={cn(
          'px-4 py-2 rounded font-semibold transition-colors',
          hasNext
            ? 'bg-monster-green text-black hover:bg-green-400'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        )}
      >
        Última
      </button>
    </div>
  );
};
