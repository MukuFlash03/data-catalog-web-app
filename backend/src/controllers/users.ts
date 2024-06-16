import pool from "../db/db_setup";
import { Request, Response, Router } from 'express';
import { User } from "../models/users";
import {
    fetchUsers,
    findUserByCredentials,
    isUserExists,
    insertUser,
} from "../db/users";
import bcrypt from 'bcryptjs';
import { generateAccessToken } from "../util/auth";

const router = Router();

export const createUser = router.post("/signup", async (request: Request, response: Response) => {
    const userFields = {
        email: request.body.email,
        password: request.body.password,
    }
    try {
        // Check if user with the same email already exists
        const userExists = await isUserExists(userFields.email);
        if (userExists) {
            response
                .status(400)
                .json({ message: 'User with the same email already exists.' });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userFields.password, salt);
            // If user doesn't exist, insert the new user
            const user = await insertUser({ email: userFields.email, password: hashedPassword });
            response
                .status(201)
                .json({ message: "User created successfully.", email: user.email });
        }
    } catch (error) {
        console.error("Error creating user: ", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
});

// Authenticate a User
export const authenticateUser = router.post("/login", async (request: Request, response: Response) => {
    const userFields = {
        email: request.body.email,
        password: request.body.password,
    }
    try {
        const user = await findUserByCredentials({ email: userFields.email });
        if (!user) {
            response
                .status(400)
                .json({ message: "User does not exist. Please sign up first." });
        } else {
            const isPasswordMatch = await bcrypt.compare(userFields.password, user.password);
            const token = generateAccessToken(userFields.email);
            console.log("Token from generateAccessToken: ", token);

            if (isPasswordMatch) {
                response
                    .status(200)
                    .json({
                        message: "User logged in successfully.",
                        email: user.email,
                        token: token,
                    });
            } else {
                response
                    .status(401)
                    .json({ message: "Invalid email or password." });
            }
        }
    } catch (error) {
        console.error("Error authenticating user: ", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
});


