import { Router } from "express";
import { createProduct, deleteProduct, getProductByID, listProducts, updateProduct } from "./productsController";
import { validateData } from "../../middleware/validationMiddleware";
import { createdProductSchema,updateProductSchema } from "../../db/productsSchema";

// const createProductSchema = z.object({
//     name: z.string(),
//     price: z.number({message: "Price should be a number"}),
// })


const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductByID);
router.post('/',validateData(createdProductSchema), createProduct);
router.put('/:id',validateData(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct)

export default router;