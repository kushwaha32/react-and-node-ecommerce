import express from "express";
import { check, validationResult } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const route = express.Router();

// @ route    Post /api/user
// @desc      Register a user
// @access    Public

route.post(
  "/",
  [
    check("name", "please enter the name").not().isEmpty(),
    check("email", "Please enter email").not().isEmpty().isEmail(),
    check("password", "Please enter the password")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    
    const { name, email, password } = req.body;
    try {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        return res.status(400).json({ msg: "User already exist" });
      }

      const user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      
      const payload = {
          user: {
              _id: user._id
          }
      }
      const token = jwt.sign(payload, process.env.jwt_secret);
       res.json({
           _id: user._id,
           name: user.name,
           email: user.email,
           isAdmin: user.isAdmin,
           token: token

       })

    } catch (error) {}
  }
);

export default route;
