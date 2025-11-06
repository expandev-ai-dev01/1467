import { Router } from 'express';
import * as productController from '@/api/v1/internal/product/controller';
import * as priceFilterController from '@/api/v1/internal/product/priceFilter/controller';

const router = Router();

router.get('/product', productController.listHandler);
router.get('/product/price-limits', priceFilterController.getPriceLimitsHandler);
router.get('/product/filter-by-price', priceFilterController.filterByPriceHandler);
router.get('/product/:id', productController.getHandler);

export default router;
