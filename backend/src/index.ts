/*
This file sets up an Express server with routes for authentication and products, along with middleware for CORS and JSON parsing.
*/

// Import necessary libraries
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import productRoutes from "./routes/products";
import authRoutes from "./routes/users";

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app: Express = express();
const port = process.env.PORT || 3000;

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Define routes for authentication and products
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
    res.send("Default Title: Data Catalog Web App");
});

// Start the server
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});