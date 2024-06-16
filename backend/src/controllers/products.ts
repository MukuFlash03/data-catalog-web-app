import pool from "../db/db_setup";
import { Request, Response, Router } from 'express';
import { Product } from "../models/products";
import {
    fetchProducts,
    fetchFilteredProducts,
    fetchProductById,
    insertProduct,
    modifyProduct,
    removeProduct,
} from "../db/products";

const router = Router();

// Get all Products
export const getProducts = router.get("/", async (request: Request, response: Response) => {
    try {
        if (request.query.query === undefined || typeof request.query.query === 'string') {
            const searchQuery = request.query.query ?? '';
            let products;
            if (searchQuery) {
                // If a search query is provided, fetch filtered products
                products = await fetchFilteredProducts(searchQuery);
            } else {
                // If no search query is provided, fetch all products
                products = await fetchProducts();
            }
            response
                .status(200)
                .json(products);
        }
    } catch (error) {
        console.error("Error getting products:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
});


// Get Product by ID
export const getProductById = router.get("/:_id", async (request: Request, response: Response) => {
    const _id = request.params._id;
    try {
        const products = await fetchProductById(_id);
        response
            .status(200)
            .json(products);
    } catch (error) {
        console.error("Error getting product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
});

// Create a Product
export const createProduct = router.post("/", async (request: Request, response: Response) => {
    const productFields = {
        id: request.body.id,
        product_name: request.body.product_name,
        data_category: request.body.data_category,
        record_count: request.body.record_count,
        fields: request.body.fields,
    }
    try {
        const product = await insertProduct(productFields);
        response
            .status(201)
            .json({ message: "Product added successfully", product });
    } catch (error) {
        console.error("Error creating product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
});

// Update a Product
export const updateProduct = router.put("/:_id", async (request: Request, response: Response) => {
    const productFields = {
        id: request.body.id,
        product_name: request.body.product_name,
        data_category: request.body.data_category,
        record_count: request.body.record_count,
        fields: request.body.fields,
    }
    const _id = request.params._id;
    try {
        const product = await modifyProduct(productFields, _id);
        response
            .status(201)
            .json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error updating product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
});

// Delete a Product
export const deleteProduct = router.delete("/:_id", async (request: Request, response: Response) => {
    const _id = request.params._id;
    try {
        const product = await removeProduct(_id);
        response
            .status(201)
            .json({ message: "Product deleted successfully", product });
    } catch (error) {
        console.error("Error deleting product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
});
