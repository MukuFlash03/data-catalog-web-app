"use strict";
// This file contains functions to fetch products data from the database.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProduct = exports.modifyProduct = exports.insertProduct = exports.fetchProductById = exports.fetchFilteredProducts = exports.fetchProducts = void 0;
// Import necessary libraries
const db_setup_1 = __importDefault(require("./db_setup"));
// Function to fetch all products from the database
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Fetching products data...');
        try {
            const data = yield db_setup_1.default.query(`
            SELECT * 
            FROM data_entries
        `);
            return data.rows;
        }
        catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch product data.');
        }
    });
}
exports.fetchProducts = fetchProducts;
// Function to fetch filtered products based on a query
function fetchFilteredProducts(query) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Fetching filtered products data...');
        try {
            const data = yield db_setup_1.default.query(`
            SELECT * 
            FROM data_entries
            WHERE
                CAST(data_entries.id AS TEXT) ILIKE $1 OR
                data_entries.product_name ILIKE $1 OR
                data_entries.data_category ILIKE $1 OR
                CAST(data_entries.record_count AS TEXT) ILIKE $1 OR
                array_to_string(data_entries.fields, ',') ILIKE $1
            ORDER BY data_entries.id
            `, [`%${query}%`]);
            return data.rows;
        }
        catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch filtered products.');
        }
    });
}
exports.fetchFilteredProducts = fetchFilteredProducts;
// Function to fetch a product by its ID
function fetchProductById(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Fetching product by ID...');
        try {
            const data = yield db_setup_1.default.query(`
        SELECT * 
        FROM data_entries 
        WHERE _id = $1
        `, [_id]);
            return data.rows;
        }
        catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch product data.');
        }
    });
}
exports.fetchProductById = fetchProductById;
// Function to insert a new product into the database
function insertProduct(productFields) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Inserting new product...');
        const { id, product_name, data_category, record_count, fields } = productFields;
        try {
            const data = yield db_setup_1.default.query(`
            INSERT INTO data_entries (id, product_name, data_category, record_count, fields) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `, [id, product_name, data_category, record_count, fields]);
            return data.rows.length > 0 ? data.rows[0] : null;
        }
        catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch product data.');
        }
    });
}
exports.insertProduct = insertProduct;
// Function to update an existing product in the database
function modifyProduct(productFields, _id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Updating product...');
        const { id, product_name, data_category, record_count, fields } = productFields;
        try {
            const data = yield db_setup_1.default.query(`
            UPDATE data_entries 
            SET id = $1, product_name = $2, data_category = $3, record_count = $4, fields = $5 
            WHERE _id = $6
            `, [id, product_name, data_category, record_count, fields, _id]);
            return data.rows.length > 0 ? data.rows[0] : null;
        }
        catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch product data.');
        }
    });
}
exports.modifyProduct = modifyProduct;
// Function to delete a product from the database
function removeProduct(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Deleting product...');
        try {
            const data = yield db_setup_1.default.query(`
            DELETE FROM data_entries 
            WHERE _id = $1
            `, [_id]);
            return data.rows.length > 0 ? data.rows[0] : null;
        }
        catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch product data.');
        }
    });
}
exports.removeProduct = removeProduct;
