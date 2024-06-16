import { Router } from 'express';
import * as ProductsController from "../controllers/products";

const router = Router();

router.get("/", ProductsController.getProducts);
router.get("/:_id", ProductsController.getProductById);
router.post("/", ProductsController.createProduct);
router.put("/:_id", ProductsController.updateProduct);
router.delete("/:_id", ProductsController.deleteProduct);

export default router;
