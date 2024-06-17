// Import necessary libraries
import { UUID } from "crypto";

// Define the Product type
export type Product = {
    _id: UUID; // Unique identifier for the product
    id: number; // Numeric ID of the product
    product_name: string; // Name of the product
    data_category: string; // Category of the product data
    record_count: number; // Number of records for the product
    fields: string[]; // Array of fields for the product
};
