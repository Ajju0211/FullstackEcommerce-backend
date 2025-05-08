import { Router } from 'express';
import {
    createOrder,
  
} from './ordersControllers';
import { validateData } from '../../middleware/validationMiddleware.js';
import { insertOrderWithItemsSchema, updateOrderSchema } from '../../db/orderSchema.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = Router();

router.post(
  '/',
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);

router.get('/', verifyToken, );
router.get('/:id', verifyToken, );
router.put('/:id', verifyToken, validateData(updateOrderSchema), );

export default router;