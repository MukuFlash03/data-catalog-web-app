/*
Routes for managing products including getting all products, getting a product by ID, creating a new product, updating a product, and deleting a product.
*/

// Import neceessary libraries
import { Router } from 'express';
import * as ProductsController from "../controllers/products";

// Create a new router instance
const router = Router();

// Get all products
router.get("/", ProductsController.getProducts);
// Get product by ID
router.get("/:_id", ProductsController.getProductById);
// Create a new product
router.post("/", ProductsController.createProduct);
// Update a product
router.put("/:_id", ProductsController.updateProduct);
// Delete a product
router.delete("/:_id", ProductsController.deleteProduct);
// Export the router for use in other modules
export default router;
