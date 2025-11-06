/**
 * @interface ProductEntity
 * @description Represents a Monster Energy product in the system
 *
 * @property {number} idProduct - Unique product identifier
 * @property {string} name - Product name
 * @property {string} imageUrl - Product image URL
 * @property {string} shortDescription - Brief product description
 * @property {string} fullDescription - Complete product description
 * @property {number} price - Product price in BRL
 * @property {string} volume - Product volume
 * @property {string} category - Product category
 * @property {boolean} available - Product availability flag
 * @property {number} salesCount - Total sales count
 * @property {Date} dateCreated - Creation timestamp
 * @property {Date} dateModified - Last modification timestamp
 */
export interface ProductEntity {
  idProduct: number;
  name: string;
  imageUrl: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  volume: string;
  category: string;
  available: boolean;
  salesCount: number;
  dateCreated: Date;
  dateModified: Date;
}

/**
 * @interface NutritionalInfo
 * @description Nutritional information for a product
 *
 * @property {number} idNutritionalInfo - Unique identifier
 * @property {number} idProduct - Associated product identifier
 * @property {string} servingSize - Serving size
 * @property {number} calories - Calories per serving
 * @property {number} sugars - Sugars in grams
 * @property {number} caffeine - Caffeine in milligrams
 * @property {number} taurine - Taurine in milligrams
 * @property {number} sodium - Sodium in milligrams
 * @property {string | null} vitamins - JSON string with vitamin information
 * @property {string} ingredients - Complete ingredient list
 * @property {string | null} allergens - Allergen information
 */
export interface NutritionalInfo {
  idNutritionalInfo: number;
  idProduct: number;
  servingSize: string;
  calories: number;
  sugars: number;
  caffeine: number;
  taurine: number;
  sodium: number;
  vitamins: string | null;
  ingredients: string;
  allergens: string | null;
}

/**
 * @interface ProductListItem
 * @description Product information for listing display
 *
 * @property {number} idProduct - Product identifier
 * @property {string} name - Product name
 * @property {string} imageUrl - Product image URL
 * @property {string} shortDescription - Brief description
 * @property {number} price - Product price
 * @property {number} averageRating - Average rating (0-5)
 * @property {number} reviewCount - Total number of reviews
 * @property {boolean} available - Availability flag
 * @property {string} nutritionalSummary - JSON with calories, sugars, caffeine
 */
export interface ProductListItem {
  idProduct: number;
  name: string;
  imageUrl: string;
  shortDescription: string;
  price: number;
  averageRating: number;
  reviewCount: number;
  available: boolean;
  nutritionalSummary: string;
}

/**
 * @interface ProductListResponse
 * @description Paginated product list response
 *
 * @property {ProductListItem[]} products - Array of products
 * @property {number} totalProducts - Total number of products
 * @property {number} currentPage - Current page number
 * @property {number} pageSize - Products per page
 * @property {number} totalPages - Total number of pages
 */
export interface ProductListResponse {
  products: ProductListItem[];
  totalProducts: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

/**
 * @interface ProductDetail
 * @description Complete product information
 *
 * @property {number} idProduct - Product identifier
 * @property {string} name - Product name
 * @property {string} imageUrl - Product image URL
 * @property {string} shortDescription - Brief description
 * @property {string} fullDescription - Complete description
 * @property {number} price - Product price
 * @property {string} volume - Product volume
 * @property {string} category - Product category
 * @property {boolean} available - Availability flag
 * @property {number} averageRating - Average rating
 * @property {number} reviewCount - Total reviews
 * @property {string} ratingDistribution - JSON with rating distribution
 * @property {NutritionalInfo} nutritionalInfo - Complete nutritional information
 */
export interface ProductDetail {
  idProduct: number;
  name: string;
  imageUrl: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  volume: string;
  category: string;
  available: boolean;
  averageRating: number;
  reviewCount: number;
  ratingDistribution: string;
  nutritionalInfo: NutritionalInfo;
}
