import express from "express";
import { check, validationResult } from "express-validator";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const route = express.Router();

// Route        Post api/user/auth
// desc         login a user
// access       public

route.post(
  "/",
  [
    check("email", "please enter a valid email").isEmail(),
    check("password", "please enter password min 6").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const findUser = await User.findOne({ email });

      if (!findUser) {
        return res.status(400).json({ err: "please enter a valid credentials" });
      }

      const isMatch = await findUser.matchPassword(password);
      if (!isMatch) {
       return res.status(400).json({ err: "please enter a valid credentials" });
      }

      const payload = {
        user: {
          _id: findUser._id,
        },
      };
      const token = jwt.sign(payload, process.env.jwt_secret, {
        expiresIn: 3600,
      });
      res.json({
        _id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        isAdmin: findUser.isAdmin,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ error: "internal server error" });
    }
  }
);

export default route;
