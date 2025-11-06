import { Router } from 'express';
import * as productController from '@/api/v1/internal/product/controller';

const router = Router();

router.get('/product', productController.listHandler);
router.get('/product/:id', productController.getHandler);

export default router;
