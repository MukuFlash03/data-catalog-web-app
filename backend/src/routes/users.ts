/*
Routes for user authentication and creation
*/

// Import necessary libraries
import { Router } from 'express';
import * as UsersController from "../controllers/users";

// Create a new router instance
const router = Router();

// Route to create a new user
router.post("/signup", UsersController.createUser);
// Route to authenticate a user
router.post("/login", UsersController.authenticateUser);

export default router;
