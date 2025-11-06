import { authenticatedClient } from '@/core/lib/api';
import type { Product, ProductDetail, ProductListParams, ProductListResponse } from '../types';

/**
 * @service productService
 * @summary Product management service for authenticated endpoints
 * @domain product
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/product/...
 *
 * Authentication token is automatically added by interceptor.
 */
export const productService = {
  /**
   * @endpoint GET /api/v1/internal/product
   * @summary Fetches paginated list of products
   */
  async list(params?: ProductListParams): Promise<ProductListResponse> {
    const response = await authenticatedClient.get('/product', { params });
    return {
      products: response.data.data,
      currentPage: response.data.metadata.page,
      pageSize: response.data.metadata.pageSize,
      totalProducts: response.data.metadata.total,
      totalPages: Math.ceil(response.data.metadata.total / response.data.metadata.pageSize),
      hasNext: response.data.metadata.hasNext,
      hasPrevious: response.data.metadata.hasPrevious,
    };
  },

  /**
   * @endpoint GET /api/v1/internal/product/:id
   * @summary Fetches single product by ID
   */
  async getById(id: number): Promise<ProductDetail> {
    const response = await authenticatedClient.get(`/product/${id}`);
    return response.data.data;
  },
};
