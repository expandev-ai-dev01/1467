/**
 * @interface SearchResultsProps
 * @summary Props for SearchResults component
 */
export interface SearchResultsProps {
  totalResults: number;
  searchTerm: string;
  isSearching: boolean;
  className?: string;
}
