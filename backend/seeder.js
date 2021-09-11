
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import users from "./data/users.js";
import products from "./data/products.js";

dotenv.config()

connectDB();

const importData = async () => {
    try {
        User.deleteMany()
        Product.deleteMany()
        Order.deleteMany()

       const createUser =  await User.insertMany(users)
       const adminUser = createUser[0]._id
       const productWithUser = products.map(product =>{
           return{
               ...product, user: adminUser
           }
       } 
       )
        await Product.insertMany(productWithUser)

        console.log("Data imported")
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}


const destroyeData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log("Destroyed tha data")
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
        
    }
}

if(process.argv[2] === "-d"){
    destroyeData()
}else{
    importData()
}