import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { productList, productGet } from '@/services/product';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants';

/**
 * @api {get} /api/v1/internal/product List Products
 * @apiName ListProducts
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves paginated list of Monster Energy products
 *
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=16] Products per page
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object[]} data.products Array of products
 * @apiSuccess {Number} data.products.idProduct Product identifier
 * @apiSuccess {String} data.products.name Product name
 * @apiSuccess {String} data.products.imageUrl Product image URL
 * @apiSuccess {String} data.products.shortDescription Brief description
 * @apiSuccess {Number} data.products.price Product price
 * @apiSuccess {Number} data.products.averageRating Average rating (0-5)
 * @apiSuccess {Number} data.products.reviewCount Total reviews
 * @apiSuccess {Boolean} data.products.available Availability flag
 * @apiSuccess {String} data.products.nutritionalSummary JSON with nutritional summary
 * @apiSuccess {Object} metadata Pagination metadata
 * @apiSuccess {Number} metadata.page Current page
 * @apiSuccess {Number} metadata.pageSize Products per page
 * @apiSuccess {Number} metadata.total Total products
 *
 * @apiError {String} ValidationError Invalid parameters
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 16;

    const result = await productList(page, pageSize);

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
    if (error.message === 'pageMustBePositive' || error.message === 'pageSizeMustBePositive') {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(error.message, 'VALIDATION_ERROR'));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /api/v1/internal/product/:id Get Product
 * @apiName GetProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves complete details of a specific product
 *
 * @apiParam {Number} id Product identifier
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object} data Product details
 * @apiSuccess {Number} data.idProduct Product identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {String} data.imageUrl Product image URL
 * @apiSuccess {String} data.shortDescription Brief description
 * @apiSuccess {String} data.fullDescription Complete description
 * @apiSuccess {Number} data.price Product price
 * @apiSuccess {String} data.volume Product volume
 * @apiSuccess {String} data.category Product category
 * @apiSuccess {Boolean} data.available Availability flag
 * @apiSuccess {Number} data.averageRating Average rating
 * @apiSuccess {Number} data.reviewCount Total reviews
 * @apiSuccess {String} data.ratingDistribution JSON with rating distribution
 * @apiSuccess {Object} data.nutritionalInfo Complete nutritional information
 *
 * @apiError {String} NotFound Product not found
 * @apiError {String} ValidationError Invalid product ID
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const idProduct = parseInt(req.params.id);

    if (isNaN(idProduct)) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('idProductRequired', 'VALIDATION_ERROR'));
      return;
    }

    const product = await productGet(idProduct);

    res.json(successResponse(product));
  } catch (error: any) {
    if (error.message === 'productDoesntExist') {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(error.message, 'NOT_FOUND'));
    } else if (error.message === 'idProductRequired') {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(error.message, 'VALIDATION_ERROR'));
    } else {
      next(error);
    }
  }
}
