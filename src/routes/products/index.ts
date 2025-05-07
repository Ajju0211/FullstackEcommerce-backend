import { Router } from "express";
import { createProduct, deleteProduct, getProductByID, listProducts, updateProduct } from "./productsController";


const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductByID);
router.post('/', createProduct);
router.put('/:Id', updateProduct);
router.delete('/:id', deleteProduct)

export default router;