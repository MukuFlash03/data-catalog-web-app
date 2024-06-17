"use strict";
/*
File contains database functions related to users including fetching users, finding users by credentials, and checking user existence.
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
exports.insertUser = exports.isUserExists = exports.findUserByCredentials = exports.fetchUsers = void 0;
// Import necessary libraries
const db_setup_1 = __importDefault(require("./db_setup"));
// Function to fetch all users from the database
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Fetching users data...');
        try {
            const data = yield db_setup_1.default.query(`
            SELECT * 
            FROM users
            `);
            return data.rows;
        }
        catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch user data.');
        }
    });
}
exports.fetchUsers = fetchUsers;
// Function to find a user by their credentials
function findUserByCredentials(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, }) {
        console.log('Fetching user by email');
        try {
            const data = yield db_setup_1.default.query(`
            SELECT * 
            FROM users
            WHERE email = $1 
            `, [email]);
            return data.rows.length > 0 ? data.rows[0] : null;
        }
        catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to find user by email.');
        }
    });
}
exports.findUserByCredentials = findUserByCredentials;
// Function to check if a user already exists
function isUserExists(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield db_setup_1.default.query(`
            SELECT COUNT(*) AS count
            FROM users
            WHERE email = $1
            `, [email]);
            return data.rows[0].count > 0;
        }
        catch (error) {
            console.error('Database Error:', error);
            throw new Error('User already exists.');
        }
    });
}
exports.isUserExists = isUserExists;
// Function to insert a new user into the database
function insertUser(userFields) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Inserting new user...');
        const { email, password } = userFields;
        try {
            const data = yield db_setup_1.default.query(`
            INSERT INTO users (email, password)
            VALUES ($1, $2)
            RETURNING *
            `, [email, password]);
            return data.rows.length > 0 ? data.rows[0] : null;
        }
        catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to insert user.');
        }
    });
}
exports.insertUser = insertUser;
