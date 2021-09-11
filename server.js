import express from "express";
import products from "./backend/data/products.js";
import dotenv from "dotenv";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import connectDB from "./backend/config/db.js";
import productRoutes from "./backend/routes/productRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// connect to mongodb

dotenv.config();
connectDB();

app.use(express.json({ extended: false }));

app.use(express.static(path.join(__dirname, "images")));

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running in ${process.env.NODE_ENV} on port ${PORT}`);
});
