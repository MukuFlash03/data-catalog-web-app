"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const products_1 = __importDefault(require("./routes/products"));
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// const corsOptions = {
//     // origin: 'http://localhost:3000',
//     origin: 'https://data-catalog-web-1wctfyc01-mukuflash03s-projects.vercel.app',
//     optionsSuccessStatus: 200, // Some legacy browsers choke on 204
// };
// app.use(cors(corsOptions));
app.use((0, cors_1.default)());
// Middleware to parse JSON requests
app.use(express_1.default.json());
app.use("/api/auth", users_1.default);
app.use("/api/products", products_1.default);
app.get("/", (req, res) => {
    res.send("Default Title: Data Catalog Web App");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
