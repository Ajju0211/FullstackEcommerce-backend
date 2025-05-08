import { Router } from "express";
import { createProduct, deleteProduct, getProductByID, listProducts, updateProduct } from "./productsController";
import { validateData } from "../../middleware/validationMiddleware";
import { createdProductSchema,updateProductSchema } from "../../db/productsSchema";
import { verifyToken,verifySeller } from "../../middleware/authMiddleware";
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