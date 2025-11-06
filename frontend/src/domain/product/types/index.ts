/**
 * @module ProductTypes
 * @summary Type definitions for product domain
 * @domain product
 * @type type-definitions
 * @category product-management
 */

export interface Product {
  idProduct: number;
  name: string;
  imageUrl: string;
  shortDescription: string;
  price: number;
  averageRating: number;
  reviewCount: number;
  available: boolean;
  nutritionalSummary: NutritionalSummary;
  category?: string;
}

export interface ProductDetail extends Product {
  fullDescription: string;
  volume: string;
  category: string;
  ratingDistribution: RatingDistribution;
  nutritionalInfo: NutritionalInfo;
}

export interface NutritionalSummary {
  calories: string;
  sugars: string;
  caffeine: string;
}

export interface NutritionalInfo {
  servingSize: string;
  calories: number;
  sugars: number;
  caffeine: number;
  taurine: number;
  sodium: number;
  vitamins?: Record<string, string>;
  ingredients: string[];
  allergens?: string[];
}

export interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface ProductListParams {
  page?: number;
  pageSize?: number;
}

export interface ProductListResponse {
  products: Product[];
  currentPage: number;
  pageSize: number;
  totalProducts: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
