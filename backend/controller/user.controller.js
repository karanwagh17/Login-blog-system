const userModel = require("../model/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "plese fill up all fields" });
  }
  if (req.body.role) {
    return res.status(401).json({ message: "You can't access role" });
  }
  //
  try {
    const isExistuser = await userModel.findOne({ email });
    if (isExistuser) {
      return res.status(401).json({ massage: "account is already created" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(401).json({ massage: err });
      }
      const UserData = await userModel.create({ name, email, password: hash });
      // console.log(UserData)
      const { password, ...rest } = UserData._doc;
      return res
        .status(200)
        .json({ message: "user created successfully", rest });
    });
  } catch (error) {
    return res.status(401).json({ message: "hello" });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "fill all the blanks" });
  }
  try {
    const isExistuser = await userModel.findOne({ email });
    if (!isExistuser) {
      res.status(400).json({ message: "plese create your accont first" });
    }
    await bcrypt.compare(password, isExistuser.password, (err, result) => {
      if (err) {
        res.status(400).json({ message: "bcrypt error" });
      }
      if (!result) {
        return res.status(400).json({ message: "enter correct password" });
      }
      const { password, ...rest } = isExistuser._doc;
      jwt.sign({ user: rest }, process.env.privateKey, (err, token) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        if (!token) {
          return res.status(400).json({ message: "token is not create" });
        }
        console.log(token)
        res
          .cookie("varificationToken", token)
          .status(200)
          .json({ message: "user login successfully", user: rest });
      });
    });
  } catch (error) {}
};
module.exports = { signup, signin };
