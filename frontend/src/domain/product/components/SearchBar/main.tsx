import { useRef, useEffect } from 'react';
import { cn } from '@/core/utils/cn';
import type { SearchBarProps } from './types';

/**
 * @component SearchBar
 * @summary Search input component with suggestions and clear button
 * @domain product
 * @type domain-component
 * @category search
 *
 * @description
 * Provides text search functionality with:
 * - Search icon on the left
 * - Clear button (X) on the right when text is present
 * - Dropdown suggestions from search history
 * - Minimum 3 characters validation
 * - Keyboard navigation support (ESC to close suggestions)
 */
export const SearchBar = ({
  searchTerm,
  searchHistory,
  showSuggestions,
  onSearchChange,
  onClear,
  onSelectSuggestion,
  onToggleSuggestions,
  className,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onToggleSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onToggleSuggestions]);

  // Handle ESC key to close suggestions
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onToggleSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showSuggestions, onToggleSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchHistory.length > 0) {
      onToggleSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSelectSuggestion(suggestion);
  };

  return (
    <div ref={containerRef} className={cn('relative w-full max-w-2xl mx-auto', className)}>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Buscar produtos Monster Energy..."
          maxLength={100}
          className={cn(
            'w-full h-12 pl-12 pr-12 bg-monster-gray border border-gray-700 rounded-lg',
            'text-white placeholder-gray-500',
            'focus:outline-none focus:border-monster-green focus:ring-2 focus:ring-monster-green/20',
            'transition-all'
          )}
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={onClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            aria-label="Limpar busca"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && searchHistory.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-monster-gray border border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2">
            <p className="text-xs text-gray-400 px-3 py-2">Buscas recentes:</p>
            {searchHistory.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Validation Message */}
      {searchTerm.length > 0 && searchTerm.length < 3 && (
        <p className="text-xs text-gray-400 mt-2 ml-1">
          Digite pelo menos 3 caracteres para buscar
        </p>
      )}
    </div>
  );
};
