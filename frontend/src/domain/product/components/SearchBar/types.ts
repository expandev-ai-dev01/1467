/**
 * @interface SearchBarProps
 * @summary Props for SearchBar component
 */
export interface SearchBarProps {
  searchTerm: string;
  searchHistory: string[];
  showSuggestions: boolean;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  onSelectSuggestion: (suggestion: string) => void;
  onToggleSuggestions: (show: boolean) => void;
  className?: string;
}
