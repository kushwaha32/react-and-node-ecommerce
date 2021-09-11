
import express from "express";
import Product from "../models/productModel.js";

const route = express.Router();

// @route     GET  api/product
// @desc      Get all products
// @access    Public

route.get('/', async( req, res) => {
      try {
          const products = await Product.find({});
          res.json(products)
      } catch (error) {
          console.error(error.message)
          res.status(500).send("internal server Error")
      }
      
})

// @route      Get api/product/:id
// @desc       Fetch a single by id
// access      Public

route.get("/:id", async( req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
    } catch (error) {
        res.status(500).send("internal server error")
    }
})

export default route