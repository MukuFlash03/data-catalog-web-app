"use strict";
/*
This file sets up an Express server with routes for authentication and products, along with middleware for CORS and JSON parsing.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary libraries
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const products_1 = __importDefault(require("./routes/products"));
const users_1 = __importDefault(require("./routes/users"));
// Load environment variables from .env file
dotenv_1.default.config();
// Create an instance of Express
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Enable Cross-Origin Resource Sharing
app.use((0, cors_1.default)());
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Define routes for authentication and products
app.use("/api/auth", users_1.default);
app.use("/api/products", products_1.default);
// Default route
app.get("/", (req, res) => {
    res.send("Default Title: Data Catalog Web App");
});
// Start the server
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
