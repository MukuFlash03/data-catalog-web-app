/*
This file sets up a PostgreSQL connection pool using environment variables loaded from a .env file.
*/

// Import necessary libraries
import { Pool } from 'pg';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a new Pool instance for PostgreSQL connection
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOSTNAME,
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
    database: process.env.POSTGRES_DB,
    ssl: {
        rejectUnauthorized: false
    }
})

// Export the pool for use in other modules
export default pool;