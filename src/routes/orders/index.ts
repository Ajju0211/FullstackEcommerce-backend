import { Router } from 'express';
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
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


router.get('/', verifyToken, listOrders);
router.get('/:id', verifyToken, getOrder);
router.put('/:id', verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;