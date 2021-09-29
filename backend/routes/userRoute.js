import express from "express";
import { check, validationResult } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../middleware/auth.js";
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
      const token = jwt.sign(payload, process.env.jwt_secret, {
        expiresIn: 3600
      });
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

// update user profile

// @route      Put "api/user/:id"
// @desc       Update user prifile
// @acc        Private

route.put("/:id",Auth, [
  check("name", "plase enter your").not().isEmpty(),
  check("email", "Please enter the email").not().isEmpty().isEmail(),
  check("password", "please enter the password").isLength({min: 6}).not().isEmpty()
], async (req, res) => {
     const errors = validationResult(req)
     if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
     }

     const id = req.params.id
     const {name, email, password} = req.body
     try {
        const user = await User.findById(id);
        // hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)
        // update query
        user.name = name
        user.email = email
        user.password = hashPass
        const getupdateuser = await user.save()
        
        // send the response
        
        return res.json({
          name: getupdateuser.name,
          email: getupdateuser.email
        })
        
        
     } catch (error) {
        console.error(error)
     }
})
export default route;
