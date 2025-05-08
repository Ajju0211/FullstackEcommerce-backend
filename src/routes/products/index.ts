import { Router } from "express";
import { createProduct, deleteProduct, getProductByID, listProducts, updateProduct } from "./productsController.js";
import { validateData } from "../../middleware/validationMiddleware.js";
import { createdProductSchema,updateProductSchema } from "../../db/productsSchema.js";
import { verifyToken,verifySeller } from "../../middleware/authMiddleware.js";
// const createProductSchema = z.object({
//     name: z.string(),
//     price: z.number({message: "Price should be a number"}),
// })


const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductByID);
router.post('/',verifyToken,verifySeller,validateData(createdProductSchema), createProduct);
router.put('/:id',verifyToken,validateData(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct)

export default router;