import { Request, Response, Router } from 'express';
import * as ProductsController from "../controllers/products";

const router = Router();

router.get("/products", ProductsController.getProducts);
router.get("/products/:_id", ProductsController.getProductById);
router.post("/products", ProductsController.createProduct);
router.put("/products/:_id", ProductsController.updateProduct);
router.delete("/products/:_id", ProductsController.deleteProduct);

export default router;
