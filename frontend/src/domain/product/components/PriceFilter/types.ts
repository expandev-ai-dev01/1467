/**
 * @interface PriceFilterProps
 * @summary Props for PriceFilter component
 */
export interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  catalogMinPrice: number;
  catalogMaxPrice: number;
  isFilterActive: boolean;
  onPriceChange: (min: number, max: number) => void;
  onClearFilter: () => void;
  className?: string;
}
