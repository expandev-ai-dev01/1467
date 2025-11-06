import { Request, Response, NextFunction } from 'express';
import { productListByPriceRange, getPriceLimits } from '@/services/product';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants';

/**
 * @api {get} /api/v1/internal/product/price-limits Get Price Limits
 * @apiName GetPriceLimits
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves minimum and maximum price limits from the catalog
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Price limits
 * @apiSuccess {Number} data.minPrice Minimum price in catalog
 * @apiSuccess {Number} data.maxPrice Maximum price in catalog
 *
 * @apiError {String} ServerError Internal server error
 */
export async function getPriceLimitsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const limits = await getPriceLimits();
    res.json(successResponse(limits));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {get} /api/v1/internal/product/filter-by-price Filter Products by Price
 * @apiName FilterProductsByPrice
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Filters products by price range with pagination
 *
 * @apiParam {Number} minPrice Minimum price
 * @apiParam {Number} maxPrice Maximum price
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=16] Products per page
 * @apiParam {String} [searchText] Optional text filter to combine with price filter
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object[]} data.products Array of filtered products
 * @apiSuccess {Object} metadata Pagination metadata
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} ServerError Internal server error
 */
export async function filterByPriceHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const minPrice = parseFloat(req.query.minPrice as string);
    const maxPrice = parseFloat(req.query.maxPrice as string);
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 16;
    const searchText = (req.query.searchText as string) || '';

    /**
     * @validation Validate required parameters
     */
    if (isNaN(minPrice) || isNaN(maxPrice)) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('minPriceAndMaxPriceRequired', 'VALIDATION_ERROR'));
      return;
    }

    /**
     * @validation Validate price range consistency
     */
    if (minPrice > maxPrice) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('minPriceCannotBeGreaterThanMaxPrice', 'VALIDATION_ERROR'));
      return;
    }

    /**
     * @validation Validate decimal precision
     */
    if (!Number.isFinite(minPrice) || !Number.isFinite(maxPrice)) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('invalidPriceFormat', 'VALIDATION_ERROR'));
      return;
    }

    const result = await productListByPriceRange(minPrice, maxPrice, page, pageSize, searchText);

    res.json(
      successResponse(result.products, {
        page: result.currentPage,
        pageSize: result.pageSize,
        total: result.totalProducts,
        hasNext: result.currentPage < result.totalPages,
        hasPrevious: result.currentPage > 1,
      })
    );
  } catch (error: any) {
    if (
      error.message === 'minPriceBelowCatalogLimit' ||
      error.message === 'maxPriceAboveCatalogLimit' ||
      error.message === 'pageMustBePositive' ||
      error.message === 'pageSizeMustBePositive'
    ) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(error.message, 'VALIDATION_ERROR'));
    } else {
      next(error);
    }
  }
}
