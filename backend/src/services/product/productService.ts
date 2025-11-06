import { ProductListResponse, ProductDetail, PriceLimits } from './productTypes';

/**
 * @summary
 * In-memory storage for Monster Energy products
 * This simulates database storage without actual persistence
 */
const products: any[] = [
  {
    idProduct: 1,
    name: 'Monster Energy Original',
    imageUrl: 'https://example.com/images/monster-original.jpg',
    shortDescription: 'The original Monster Energy drink',
    fullDescription:
      'Monster Energy is a carbonated energy drink that contains caffeine, taurine, B vitamins, and other ingredients. The original flavor delivers a smooth, easy-drinking experience.',
    price: 8.99,
    volume: '473ml',
    category: 'Original',
    available: true,
    salesCount: 1250,
  },
  {
    idProduct: 2,
    name: 'Monster Energy Ultra',
    imageUrl: 'https://example.com/images/monster-ultra.jpg',
    shortDescription: 'Zero sugar, full Monster flavor',
    fullDescription:
      'Monster Ultra is a lighter tasting, zero sugar energy drink with full Monster Energy flavor. Perfect for those who want energy without the calories.',
    price: 9.49,
    volume: '473ml',
    category: 'Ultra',
    available: true,
    salesCount: 980,
  },
  {
    idProduct: 3,
    name: 'Monster Energy Juice',
    imageUrl: 'https://example.com/images/monster-juice.jpg',
    shortDescription: 'Energy + Juice blend',
    fullDescription:
      'Monster Juice combines the energy of Monster with real fruit juice for a refreshing taste. Contains 100% daily value of Vitamin C.',
    price: 10.99,
    volume: '473ml',
    category: 'Juice',
    available: true,
    salesCount: 750,
  },
  {
    idProduct: 4,
    name: 'Monster Energy Assault',
    imageUrl: 'https://example.com/images/monster-assault.jpg',
    shortDescription: 'Intense cherry lime flavor',
    fullDescription:
      'Monster Assault delivers an intense cherry lime flavor with the full Monster Energy blend. Perfect for those who want a bold taste.',
    price: 8.99,
    volume: '473ml',
    category: 'Original',
    available: true,
    salesCount: 620,
  },
  {
    idProduct: 5,
    name: 'Monster Energy Pipeline Punch',
    imageUrl: 'https://example.com/images/monster-pipeline.jpg',
    shortDescription: 'Tropical punch flavor',
    fullDescription:
      'Monster Pipeline Punch is a tropical punch flavored energy drink with passion fruit, orange, and guava. A taste of the islands in every can.',
    price: 9.99,
    volume: '473ml',
    category: 'Juice',
    available: true,
    salesCount: 890,
  },
];

const nutritionalInfo: any[] = [
  {
    idProduct: 1,
    servingSize: '473ml',
    calories: 210,
    sugars: 54.0,
    caffeine: 160.0,
    taurine: 2000.0,
    sodium: 370.0,
    vitamins: '{"B2": "3.6mg", "B3": "43mg", "B6": "4.2mg", "B12": "13mcg"}',
    ingredients:
      'Carbonated Water, Sucrose, Glucose, Citric Acid, Natural Flavors, Taurine, Sodium Citrate, Color Added, Panax Ginseng Root Extract, L-Carnitine L-Tartrate, Caffeine, Sorbic Acid, Benzoic Acid, Niacinamide, Sodium Chloride, Glucuronolactone, Inositol, Guarana Seed Extract, Pyridoxine Hydrochloride, Sucralose, Riboflavin, Maltodextrin, Cyanocobalamin',
    allergens: null,
  },
  {
    idProduct: 2,
    servingSize: '473ml',
    calories: 10,
    sugars: 0.0,
    caffeine: 140.0,
    taurine: 2000.0,
    sodium: 370.0,
    vitamins: '{"B2": "3.6mg", "B3": "43mg", "B6": "4.2mg", "B12": "13mcg"}',
    ingredients:
      'Carbonated Water, Citric Acid, Erythritol, Taurine, Sodium Citrate, Natural Flavors, Panax Ginseng Root Extract, L-Carnitine L-Tartrate, Caffeine, Sorbic Acid, Benzoic Acid, Niacinamide, Sucralose, Sodium Chloride, Glucuronolactone, Inositol, Guarana Seed Extract, Pyridoxine Hydrochloride, Riboflavin, Maltodextrin, Cyanocobalamin',
    allergens: null,
  },
  {
    idProduct: 3,
    servingSize: '473ml',
    calories: 180,
    sugars: 42.0,
    caffeine: 160.0,
    taurine: 2000.0,
    sodium: 370.0,
    vitamins: '{"C": "100% DV", "B2": "3.6mg", "B3": "43mg", "B6": "4.2mg", "B12": "13mcg"}',
    ingredients:
      'Carbonated Water, Concentrated Juices (Apple, Orange, Tangerine, White Grape), Sucrose, Glucose, Citric Acid, Taurine, Natural Flavors, Sodium Citrate, Panax Ginseng Root Extract, L-Carnitine L-Tartrate, Caffeine, Sorbic Acid, Benzoic Acid, Niacinamide, Ascorbic Acid, Sodium Chloride, Glucuronolactone, Inositol, Guarana Seed Extract, Pyridoxine Hydrochloride, Riboflavin, Maltodextrin, Cyanocobalamin',
    allergens: null,
  },
  {
    idProduct: 4,
    servingSize: '473ml',
    calories: 200,
    sugars: 52.0,
    caffeine: 160.0,
    taurine: 2000.0,
    sodium: 370.0,
    vitamins: '{"B2": "3.6mg", "B3": "43mg", "B6": "4.2mg", "B12": "13mcg"}',
    ingredients:
      'Carbonated Water, Sucrose, Glucose, Citric Acid, Natural Flavors, Taurine, Sodium Citrate, Color Added, Panax Ginseng Root Extract, L-Carnitine L-Tartarte, Caffeine, Sorbic Acid, Benzoic Acid, Niacinamide, Sodium Chloride, Glucuronolactone, Inositol, Guarana Seed Extract, Pyridoxine Hydrochloride, Sucralose, Riboflavin, Maltodextrin, Cyanocobalamin',
    allergens: null,
  },
  {
    idProduct: 5,
    servingSize: '473ml',
    calories: 190,
    sugars: 46.0,
    caffeine: 160.0,
    taurine: 2000.0,
    sodium: 370.0,
    vitamins: '{"C": "100% DV", "B2": "3.6mg", "B3": "43mg", "B6": "4.2mg", "B12": "13mcg"}',
    ingredients:
      'Carbonated Water, Concentrated Juices (Passion Fruit, Orange, Guava), Sucrose, Glucose, Citric Acid, Taurine, Natural Flavors, Sodium Citrate, Panax Ginseng Root Extract, L-Carnitine L-Tartrate, Caffeine, Sorbic Acid, Benzoic Acid, Niacinamide, Ascorbic Acid, Sodium Chloride, Glucuronolactone, Inositol, Guarana Seed Extract, Pyridoxine Hydrochloride, Riboflavin, Maltodextrin, Cyanocobalamin',
    allergens: null,
  },
];

const reviews: any[] = [
  { idProduct: 1, rating: 4.5 },
  { idProduct: 1, rating: 5.0 },
  { idProduct: 1, rating: 4.0 },
  { idProduct: 1, rating: 4.5 },
  { idProduct: 1, rating: 5.0 },
  { idProduct: 2, rating: 4.8 },
  { idProduct: 2, rating: 4.5 },
  { idProduct: 2, rating: 5.0 },
  { idProduct: 2, rating: 4.7 },
  { idProduct: 3, rating: 4.2 },
  { idProduct: 3, rating: 4.0 },
  { idProduct: 3, rating: 4.5 },
  { idProduct: 4, rating: 4.3 },
  { idProduct: 4, rating: 4.0 },
  { idProduct: 5, rating: 4.6 },
  { idProduct: 5, rating: 4.8 },
  { idProduct: 5, rating: 4.5 },
];

/**
 * @summary
 * Retrieves paginated list of products with ratings and nutritional summary
 *
 * @function productList
 * @module product
 *
 * @param {number} page - Page number (default: 1)
 * @param {number} pageSize - Products per page (default: 16)
 *
 * @returns {Promise<ProductListResponse>} Paginated product list
 *
 * @throws {Error} When page or pageSize is invalid
 */
export async function productList(
  page: number = 1,
  pageSize: number = 16
): Promise<ProductListResponse> {
  if (page < 1) {
    throw new Error('pageMustBePositive');
  }

  if (pageSize < 1) {
    throw new Error('pageSizeMustBePositive');
  }

  const sortedProducts = [...products].sort((a, b) => b.salesCount - a.salesCount);

  const offset = (page - 1) * pageSize;
  const paginatedProducts = sortedProducts.slice(offset, offset + pageSize);

  const productList = paginatedProducts.map((product) => {
    const productReviews = reviews.filter((r) => r.idProduct === product.idProduct);
    const averageRating =
      productReviews.length > 0
        ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
        : 0.0;

    const nutrition = nutritionalInfo.find((n) => n.idProduct === product.idProduct);
    const nutritionalSummary = nutrition
      ? JSON.stringify({
          calorias: `${nutrition.calories} kcal`,
          acucares: `${nutrition.sugars}g`,
          cafeina: `${nutrition.caffeine}mg`,
        })
      : '{}';

    return {
      idProduct: product.idProduct,
      name: product.name,
      imageUrl: product.imageUrl,
      shortDescription: product.shortDescription,
      price: product.price,
      averageRating: Math.round(averageRating * 10) / 10,
      reviewCount: productReviews.length,
      available: product.available,
      nutritionalSummary,
    };
  });

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  return {
    products: productList,
    totalProducts,
    currentPage: page,
    pageSize,
    totalPages,
  };
}

/**
 * @summary
 * Retrieves complete details of a specific product
 *
 * @function productGet
 * @module product
 *
 * @param {number} idProduct - Product identifier
 *
 * @returns {Promise<ProductDetail>} Complete product information
 *
 * @throws {Error} When product doesn't exist
 */
export async function productGet(idProduct: number): Promise<ProductDetail> {
  if (!idProduct) {
    throw new Error('idProductRequired');
  }

  const product = products.find((p) => p.idProduct === idProduct);

  if (!product) {
    throw new Error('productDoesntExist');
  }

  const productReviews = reviews.filter((r) => r.idProduct === idProduct);
  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
      : 0.0;

  const ratingDistribution = {
    fiveStars: productReviews.filter((r) => r.rating >= 4.5).length,
    fourStars: productReviews.filter((r) => r.rating >= 3.5 && r.rating < 4.5).length,
    threeStars: productReviews.filter((r) => r.rating >= 2.5 && r.rating < 3.5).length,
    twoStars: productReviews.filter((r) => r.rating >= 1.5 && r.rating < 2.5).length,
    oneStar: productReviews.filter((r) => r.rating < 1.5).length,
  };

  const nutrition = nutritionalInfo.find((n) => n.idProduct === idProduct);

  if (!nutrition) {
    throw new Error('nutritionalInfoNotFound');
  }

  return {
    idProduct: product.idProduct,
    name: product.name,
    imageUrl: product.imageUrl,
    shortDescription: product.shortDescription,
    fullDescription: product.fullDescription,
    price: product.price,
    volume: product.volume,
    category: product.category,
    available: product.available,
    averageRating: Math.round(averageRating * 10) / 10,
    reviewCount: productReviews.length,
    ratingDistribution: JSON.stringify(ratingDistribution),
    nutritionalInfo: {
      idNutritionalInfo: 0,
      idProduct: nutrition.idProduct,
      servingSize: nutrition.servingSize,
      calories: nutrition.calories,
      sugars: nutrition.sugars,
      caffeine: nutrition.caffeine,
      taurine: nutrition.taurine,
      sodium: nutrition.sodium,
      vitamins: nutrition.vitamins,
      ingredients: nutrition.ingredients,
      allergens: nutrition.allergens,
    },
  };
}

/**
 * @summary
 * Retrieves minimum and maximum price limits from the catalog
 *
 * @function getPriceLimits
 * @module product
 *
 * @returns {Promise<PriceLimits>} Price limits
 */
export async function getPriceLimits(): Promise<PriceLimits> {
  const prices = products.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return {
    minPrice: Math.round(minPrice * 100) / 100,
    maxPrice: Math.round(maxPrice * 100) / 100,
  };
}

/**
 * @summary
 * Retrieves paginated list of products filtered by price range
 *
 * @function productListByPriceRange
 * @module product
 *
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @param {number} page - Page number (default: 1)
 * @param {number} pageSize - Products per page (default: 16)
 * @param {string} searchText - Optional text filter to combine with price filter
 *
 * @returns {Promise<ProductListResponse>} Paginated filtered product list
 *
 * @throws {Error} When parameters are invalid
 */
export async function productListByPriceRange(
  minPrice: number,
  maxPrice: number,
  page: number = 1,
  pageSize: number = 16,
  searchText: string = ''
): Promise<ProductListResponse> {
  /**
   * @validation Validate pagination parameters
   */
  if (page < 1) {
    throw new Error('pageMustBePositive');
  }

  if (pageSize < 1) {
    throw new Error('pageSizeMustBePositive');
  }

  /**
   * @rule {be-database-requirement} Get catalog limits for validation
   */
  const limits = await getPriceLimits();

  /**
   * @validation Validate price range against catalog limits
   */
  if (minPrice < limits.minPrice) {
    throw new Error('minPriceBelowCatalogLimit');
  }

  if (maxPrice > limits.maxPrice) {
    throw new Error('maxPriceAboveCatalogLimit');
  }

  /**
   * @rule {be-database-requirement} Filter products by price range
   */
  let filteredProducts = products.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  /**
   * @rule {be-database-requirement} Apply text filter if provided
   */
  if (searchText && searchText.trim() !== '') {
    const searchLower = searchText.toLowerCase().trim();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.shortDescription.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
    );
  }

  /**
   * @rule {be-database-requirement} Sort by sales count
   */
  const sortedProducts = [...filteredProducts].sort((a, b) => b.salesCount - a.salesCount);

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  /**
   * @rule {be-database-requirement} Apply pagination
   */
  const offset = (page - 1) * pageSize;
  const paginatedProducts = sortedProducts.slice(offset, offset + pageSize);

  /**
   * @rule {be-database-requirement} Build response with ratings and nutritional summary
   */
  const productList = paginatedProducts.map((product) => {
    const productReviews = reviews.filter((r) => r.idProduct === product.idProduct);
    const averageRating =
      productReviews.length > 0
        ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
        : 0.0;

    const nutrition = nutritionalInfo.find((n) => n.idProduct === product.idProduct);
    const nutritionalSummary = nutrition
      ? JSON.stringify({
          calorias: `${nutrition.calories} kcal`,
          acucares: `${nutrition.sugars}g`,
          cafeina: `${nutrition.caffeine}mg`,
        })
      : '{}';

    return {
      idProduct: product.idProduct,
      name: product.name,
      imageUrl: product.imageUrl,
      shortDescription: product.shortDescription,
      price: product.price,
      averageRating: Math.round(averageRating * 10) / 10,
      reviewCount: productReviews.length,
      available: product.available,
      nutritionalSummary,
    };
  });

  return {
    products: productList,
    totalProducts,
    currentPage: page,
    pageSize,
    totalPages,
  };
}
