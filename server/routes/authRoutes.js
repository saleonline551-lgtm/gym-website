const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


/* ================= REGISTER ================= */

router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      mobile,
      password
    } = req.body;

    // CHECK EMAIL

    const emailExists = await User.findOne({
      email
    });

    if (emailExists) {

      return res.status(400).json({
        message: "Email already exists",
      });

    }

    // CHECK MOBILE

    const mobileExists = await User.findOne({
      mobile
    });

    if (mobileExists) {

      return res.status(400).json({
        message: "Mobile number already exists",
      });

    }

    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // CREATE USER

    const user = await User.create({

      name,
      email,
      mobile,
      password: hashedPassword,

    });

    res.status(201).json({

      message: "User Registered Successfully",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {

  try {

    const {
      emailOrMobile,
      password
    } = req.body;

    // FIND USER BY EMAIL OR MOBILE

    const user = await User.findOne({

      $or: [
        { email: emailOrMobile },
        { mobile: emailOrMobile }
      ]

    });

    if (!user) {

      return res.status(400).json({
        message: "Invalid Email or Mobile Number",
      });

    }

    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });

    }

    // TOKEN

    const token = jwt.sign(

      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    res.status(200).json({

      message: "Login Success",

      token,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;