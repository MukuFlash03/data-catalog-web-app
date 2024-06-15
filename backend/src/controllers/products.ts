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
} from "../db/db_queries";

const router = Router();

// Get all Products
export const getProducts = router.get("/products", async (request: Request, response: Response) => {
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
export const getProductById = router.get("/products/:_id", async (request: Request, response: Response) => {
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
export const createProduct = router.post("/products", async (request: Request, response: Response) => {
    const productFields = {
        id: request.body.id,
        product_name: request.body.product_name,
        data_category: request.body.data_category,
        record_count: request.body.record_count,
        fields: request.body.fields,
    }
    try {
        const results = await insertProduct(productFields);
        response
            .status(201)
            .send(`User added with ID: ${results.rows[0]._id}`)
    } catch (error) {
        console.error("Error getting product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
});

// Update a Product
export const updateProduct = router.put("/products/:_id", async (request: Request, response: Response) => {
    const productFields = {
        id: request.body.id,
        product_name: request.body.product_name,
        data_category: request.body.data_category,
        record_count: request.body.record_count,
        fields: request.body.fields,
    }
    const _id = request.params._id;
    try {
        const results = await modifyProduct(productFields, _id);
        response
            .status(201)
            .send(`User modified with ID: ${_id}`)
    } catch (error) {
        console.error("Error getting product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
});

// Delete a Product
export const deleteProduct = router.delete("/products/:_id", async (request: Request, response: Response) => {
    const _id = request.params._id;
    try {
        const results = await removeProduct(_id);
        response
            .status(201)
            .send(`User deleted with ID: ${_id}`)
    } catch (error) {
        console.error("Error getting product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
});
