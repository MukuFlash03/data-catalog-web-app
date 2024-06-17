import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import productRoutes from "./routes/products";
import authRoutes from "./routes/users";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    // origin: 'http://localhost:3000',
    origin: 'https://data-catalog-web-1wctfyc01-mukuflash03s-projects.vercel.app',
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Default Title: Data Catalog Web App");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});