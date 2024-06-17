"use strict";
/*
Routes for managing products including getting all products, getting a product by ID, creating a new product, updating a product, and deleting a product.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const express_1 = require("express");
const products_1 = require("../db/products");
// Define a new router instance
const router = (0, express_1.Router)();
// Get all Products
exports.getProducts = router.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (request.query.query === undefined || typeof request.query.query === 'string') {
            const searchQuery = (_a = request.query.query) !== null && _a !== void 0 ? _a : '';
            let products;
            if (searchQuery) {
                // If a search query is provided, fetch filtered products
                products = yield (0, products_1.fetchFilteredProducts)(searchQuery);
            }
            else {
                // If no search query is provided, fetch all products
                products = yield (0, products_1.fetchProducts)();
            }
            response
                .status(200)
                .json(products);
        }
    }
    catch (error) {
        console.error("Error getting products:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}));
// Get Product by ID
exports.getProductById = router.get("/:_id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = request.params._id;
    try {
        const products = yield (0, products_1.fetchProductById)(_id);
        response
            .status(200)
            .json(products);
    }
    catch (error) {
        console.error("Error getting product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}));
// Create a Product
exports.createProduct = router.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const productFields = {
        id: request.body.id,
        product_name: request.body.product_name,
        data_category: request.body.data_category,
        record_count: request.body.record_count,
        fields: request.body.fields,
    };
    try {
        const product = yield (0, products_1.insertProduct)(productFields);
        response
            .status(201)
            .json({ message: "Product added successfully", product });
    }
    catch (error) {
        console.error("Error creating product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}));
// Update a Product
exports.updateProduct = router.put("/:_id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const productFields = {
        id: request.body.id,
        product_name: request.body.product_name,
        data_category: request.body.data_category,
        record_count: request.body.record_count,
        fields: request.body.fields,
    };
    const _id = request.params._id;
    try {
        const product = yield (0, products_1.modifyProduct)(productFields, _id);
        response
            .status(201)
            .json({ message: "Product updated successfully", product });
    }
    catch (error) {
        console.error("Error updating product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}));
// Delete a Product
exports.deleteProduct = router.delete("/:_id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = request.params._id;
    try {
        const product = yield (0, products_1.removeProduct)(_id);
        response
            .status(201)
            .json({ message: "Product deleted successfully", product });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}));
