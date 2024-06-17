// This file contains functions to fetch products data from the database.

// Import necessary libraries
import pool from "./db_setup";
import { Product } from "../models/products";

// Function to fetch all products from the database
export async function fetchProducts() {
    console.log('Fetching products data...');
    try {
        const data = await pool.query(`
            SELECT * 
            FROM data_entries
        `
        );
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data.');
    }
}

// Function to fetch filtered products based on a query
export async function fetchFilteredProducts(
    query: string,
) {
    console.log('Fetching filtered products data...');
    try {
        const data = await pool.query(`
            SELECT * 
            FROM data_entries
            WHERE
                CAST(data_entries.id AS TEXT) ILIKE $1 OR
                data_entries.product_name ILIKE $1 OR
                data_entries.data_category ILIKE $1 OR
                CAST(data_entries.record_count AS TEXT) ILIKE $1 OR
                array_to_string(data_entries.fields, ',') ILIKE $1
            ORDER BY data_entries.id
            `,
            [`%${query}%`]
        );
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch filtered products.');
    }
}

// Function to fetch a product by its ID
export async function fetchProductById(
    _id: string,
) {
    console.log('Fetching product by ID...');
    try {
        const data = await pool.query(`
        SELECT * 
        FROM data_entries 
        WHERE _id = $1
        `,
            [_id]
        );
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data.');
    }
}

// Function to insert a new product into the database
export async function insertProduct(
    productFields: Partial<Product>
) {
    console.log('Inserting new product...');
    const { id, product_name, data_category, record_count, fields } = productFields;
    try {
        const data = await pool.query(`
            INSERT INTO data_entries (id, product_name, data_category, record_count, fields) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [id, product_name, data_category, record_count, fields]
        );
        return data.rows.length > 0 ? data.rows[0] : null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data.');
    }
}

// Function to update an existing product in the database
export async function modifyProduct(
    productFields: Partial<Product>,
    _id: string,
) {
    console.log('Updating product...');
    const { id, product_name, data_category, record_count, fields } = productFields;
    try {
        const data = await pool.query(`
            UPDATE data_entries 
            SET id = $1, product_name = $2, data_category = $3, record_count = $4, fields = $5 
            WHERE _id = $6
            `,
            [id, product_name, data_category, record_count, fields, _id]
        );
        return data.rows.length > 0 ? data.rows[0] : null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data.');
    }
}

// Function to delete a product from the database
export async function removeProduct(
    _id: string
) {
    console.log('Deleting product...');
    try {
        const data = await pool.query(`
            DELETE FROM data_entries 
            WHERE _id = $1
            `,
            [_id]
        );
        return data.rows.length > 0 ? data.rows[0] : null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data.');
    }
}