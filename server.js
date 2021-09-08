
import express from "express";
import products from "./backend/data/products.js";
import dotenv from "dotenv";
import path from "path";
const app = express();


dotenv.config()



app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'images')));


app.get("/api/products", (req, res) => {
    res.json(products);
})

app.get("/api/products/:id", (req,res) => {
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {console.log(`server is running in ${process.env.NODE_ENV} on port ${PORT}`)});