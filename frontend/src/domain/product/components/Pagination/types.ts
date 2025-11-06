/**
 * @interface PaginationProps
 * @summary Props for Pagination component
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrevious: boolean;
  className?: string;
}
