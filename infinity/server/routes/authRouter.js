const Users = require("../model/users.js");
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../model/token.js");
require("dotenv").config();
const authRouter = Router();

// Sign up
authRouter.post("/signup", async (req, res) => {
  const { userName, passWord, userType } = req.body;
  const hashPassword = await bcrypt.hash(passWord, 10);
  const newuser = await new Users({
    userName,
    passWord: hashPassword,
    userType,
  });
  newuser.save();
  try {
    if (newuser) {
      return res.status(201).json({ msg: "User created", newuser });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  const { userName, passWord, userType } = req.body;
  const user = await Users.findOne({  userType: userType });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  try {
    const matchUser = await bcrypt.compare(passWord, user.passWord);
    if (matchUser) {
      const accessToken = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
        expiresIn: "20m",
      });
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      return res.status(200).json({
          msg: "Login successfully",
          accessToken: accessToken,
          refreshToken: refreshToken,
          userName: user.userName,
        });
    }
    else{
        return res.status(400).json({msg: "password does not match"})
    }
  } catch (error) {
    return res.status(500).json({msg: "Server error"})
  }
});

module.exports = authRouter;
