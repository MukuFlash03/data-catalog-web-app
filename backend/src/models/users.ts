// Import necessary libraries
import { UUID } from "crypto";

// Define the User type
export type User = {
    _id: UUID, // Unique identifier for the user
    email: string, // Email of the user
    password: string, // Password of the user
};
