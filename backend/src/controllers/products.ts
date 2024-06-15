import pool from "../db_setup";
import { Request, Response, Router } from 'express';
import { Product } from "../models/products";

const router = Router();

// Get all Products
export const getProducts = router.get("/products", async (request: Request, response: Response) => {
    try {
        const results = await pool.query('SELECT * FROM data_entries');
        response
            .status(200)
            .json(results.rows);
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
        const results = await pool.query(`
            SELECT * 
            FROM data_entries 
            WHERE _id = $1
            `,
            [_id]
        );
        response
            .status(200)
            .json(results.rows);
    } catch (error) {
        console.error("Error getting product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
});

// Create a Product
export const createProduct = router.post("/products", async (request: Request, response: Response) => {
    const { id, product_name, data_category, record_count, fields } = request.body;

    try {
        const results = await pool.query(`
            INSERT INTO data_entries (id, product_name, data_category, record_count, fields) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [id, product_name, data_category, record_count, fields]
        );

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
    const { id, product_name, data_category, record_count, fields } = request.body;
    const parsedRecordCount = parseInt(record_count);
    const _id = request.params._id;

    try {
        const results = await pool.query(`
            UPDATE data_entries 
            SET id = $1, product_name = $2, data_category = $3, record_count = $4, fields = $5 
            WHERE _id = $6
            `,
            [id, product_name, data_category, record_count, fields, _id]
        );

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
        const results = await pool.query(`
            DELETE FROM data_entries 
            WHERE _id = $1
            `,
            [_id]
        );

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
