"use strict";
/*
File contains user-related controllers including user creation and authentication.
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.createUser = void 0;
const express_1 = require("express");
const users_1 = require("../db/users");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Create a new router instance
const router = (0, express_1.Router)();
exports.createUser = router.post("/signup", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userFields = {
        email: request.body.email,
        password: request.body.password,
    };
    try {
        // Check if user with the same email already exists
        const userExists = yield (0, users_1.isUserExists)(userFields.email);
        if (userExists) {
            response
                .status(400)
                .json({ message: 'User with the same email already exists.' });
        }
        else {
            // Generate a salt for password hashing
            const salt = yield bcryptjs_1.default.genSalt(10);
            // Hash the user's password using the generated salt
            const hashedPassword = yield bcryptjs_1.default.hash(userFields.password, salt);
            // If user doesn't exist, insert the new user
            const user = yield (0, users_1.insertUser)({ email: userFields.email, password: hashedPassword });
            response
                .status(201)
                .json({ message: "User created successfully.", email: user.email });
        }
    }
    catch (error) {
        console.error("Error creating user: ", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}));
// Authenticate a User
exports.authenticateUser = router.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userFields = {
        email: request.body.email,
        password: request.body.password,
    };
    try {
        const user = yield (0, users_1.findUserByCredentials)({ email: userFields.email });
        if (!user) {
            response
                .status(400)
                .json({ message: "User does not exist. Please sign up first." });
        }
        else {
            const isPasswordMatch = yield bcryptjs_1.default.compare(userFields.password, user.password);
            if (isPasswordMatch) {
                response
                    .status(200)
                    .json({
                    message: "User logged in successfully.",
                    email: user.email,
                });
            }
            else {
                response
                    .status(401)
                    .json({ message: "Invalid email or password." });
            }
        }
    }
    catch (error) {
        console.error("Error authenticating user: ", error);
        response
            .status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}));
