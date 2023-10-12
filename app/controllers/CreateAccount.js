const express = require("express");
const app = express();

const CreateUser = require("../models/CreateUser");

const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(cookieParser());

// GENERATE ACCESS TOKEN

const handleAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      admin: user.admin,
      username: user.username,
    },
    // process.env.JWT_ACCESS_KEY,
    "chaoemnha",

    { expiresIn: "1h" }
  );
};

const handleRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      admin: user.admin,
      username: user.username,
    },
    // process.env.JWT_ACCESS_KEY,
    "chaoemnha",

    { expiresIn: "365d" }
  );
};

const login = (req, res) => {
  res.render("createAccount/login", { username: req.myUsername });
};

const register = (req, res, next) => {
  res.render("createAccount/register", { username: req.myUsername });
};

const registerUser = async (req, res, next) => {
  try {
    // Check if password and confirm_password match
    if (req.body.confirm_password !== req.body.password) {
      return res.render("createAccount/registerpassword", {
        username: req.myUsername,
      });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const newUser = new CreateUser({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      confirm_password: hashedPassword, // You can store the hashed password in confirm_password as well
    });

    // Save the new user to the database
    await newUser.save();

    res.redirect("/createAccount/login"); // Redirect after successful registration
  } catch (error) {
    return res.render("createAccount/registererr", {
      username: req.myUsername,
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await CreateUser.findOne({ email: req.body.email });

    if (!user) {
      return res.render("createAccount/loginemail", {
        username: req.myUsername,
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.render("createAccount/loginpassword", {
        username: req.myUsername,
      });
    }

    if (user && validPassword) {
      const accessToken = handleAccessToken(user);

      const refreshToken = handleRefreshToken(user);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        // secure: true, khi đưa lên git thì true,
        // sameSite: "strict"  ,
      });

      res.redirect("/");
      // res.json(req.headers);
    }
  } catch (error) {
    return res.status(500).json({ error: "Lỗi rồi em trai" });
  }
};

const logOut = (req, res) => {
  res.clearCookie("accessToken");
  res.redirect("/createAccount/login");
};

module.exports = {
  login,
  register,
  registerUser,
  loginUser,
  // show,
  logOut,
};
