import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import productRoutes from "./routes/products";
import authRoutes from "./routes/users";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Default Title: Data Catalog Web App");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});