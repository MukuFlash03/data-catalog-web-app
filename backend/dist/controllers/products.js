"use strict";
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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const db_setup_1 = __importDefault(require("../db_setup"));
const express_1 = require("express");
const router = (0, express_1.Router)();
// Get all Products
exports.getProducts = router.get("/products", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_setup_1.default.query('SELECT * FROM data_entries');
        response
            .status(200)
            .json(results.rows);
    }
    catch (error) {
        console.error("Error getting products:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}));
// Get Product by ID
exports.getProductById = router.get("/products/:_id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = request.params._id;
    try {
        const results = yield db_setup_1.default.query(`
            SELECT * 
            FROM data_entries 
            WHERE _id = $1
            `, [_id]);
        response
            .status(200)
            .json(results.rows);
    }
    catch (error) {
        console.error("Error getting product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}));
// Create a Product
exports.createProduct = router.post("/products", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, product_name, data_category, record_count, fields } = request.body;
    try {
        const results = yield db_setup_1.default.query(`
            INSERT INTO data_entries (id, product_name, data_category, record_count, fields) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `, [id, product_name, data_category, record_count, fields]);
        response
            .status(201)
            .send(`User added with ID: ${results.rows[0]._id}`);
    }
    catch (error) {
        console.error("Error getting product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}));
// Update a Product
exports.updateProduct = router.put("/products/:_id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, product_name, data_category, record_count, fields } = request.body;
    const parsedRecordCount = parseInt(record_count);
    const _id = request.params._id;
    try {
        const results = yield db_setup_1.default.query(`
            UPDATE data_entries 
            SET id = $1, product_name = $2, data_category = $3, record_count = $4, fields = $5 
            WHERE _id = $6
            `, [id, product_name, data_category, record_count, fields, _id]);
        response
            .status(201)
            .send(`User modified with ID: ${_id}`);
    }
    catch (error) {
        console.error("Error getting product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}));
// Delete a Product
exports.deleteProduct = router.delete("/products/:_id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = request.params._id;
    try {
        const results = yield db_setup_1.default.query(`
            DELETE FROM data_entries 
            WHERE _id = $1
            `, [_id]);
        response
            .status(201)
            .send(`User deleted with ID: ${_id}`);
    }
    catch (error) {
        console.error("Error getting product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}));
