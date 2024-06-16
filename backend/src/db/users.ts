import { UUID } from "crypto";
import pool from "./db_setup";
import { User } from "../models/users";

export async function fetchUsers() {
    console.log('Fetching users data...');
    try {
        const data = await pool.query(`
            SELECT * 
            FROM users
            `
        );
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user data.');
    }
}

export async function findUserByCredentials({
    email,
}: {
    email: string,
}) {
    console.log('Fetching user by email');
    try {
        const data = await pool.query(`
            SELECT * 
            FROM users
            WHERE email = $1 
            `,
            [email]
        );
        return data.rows.length > 0 ? data.rows[0] : null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to find user by email.');
    }
}

export async function isUserExists(
    email: string,
) {
    try {
        const data = await pool.query(`
            SELECT COUNT(*) AS count
            FROM users
            WHERE email = $1
            `,
            [email]
        );
        return data.rows[0].count > 0;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('User already exists.');
    }
}

export async function insertUser(
    userFields: Partial<User>
) {
    console.log('Inserting new user...');
    const { email, password } = userFields;
    try {
        const data = await pool.query(`
            INSERT INTO users (email, password)
            VALUES ($1, $2)
            RETURNING *
            `,
            [email, password]
        );
        return data.rows.length > 0 ? data.rows[0] : null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to insert user.');
    }
}
