import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User_Register
export const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    //getting existing user from db
    const existingUser = await userModel.findOne({ email: email });

    //Checking_the_email_exist_in_db_and_throwing_error
    if (existingUser) {
      res
        .status(409)
        .json({ status: "failure", message: "Email alreday exist" });
    }

    //Creating_new_user
    if (email && password && username && !existingUser) {
      //Hasing_password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new userModel({
        email: email,
        password: hashedPassword,
        username: username,
      });
      await newUser.save();
      const saved_user = userModel.findOne({ email: email });
      //Generating JWT
      const token = jwt.sign(
        { userId: saved_user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      res
        .status(201)
        .json({ status: "success", message: newUser, token: token });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//User_Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "failure", message: "user not found " });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "failure", message: "incorrect password" });
    }

    if (existingUser.email === email && isMatch) {
      //Generate_JWT
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        status: "success",
        message: "user found successfully ",
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Change_Passwprd_of_User
export const changeUserPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await userModel.findByIdAndUpdate(req.user._id, {
        $set: { password: hashedPassword },
      });
      res.status(200).json({ status: "Success", message: "Password changed " });
    }
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

//Logged User
export const loggedUser = (req, res) => {
  res.send({ user: req.user });
};
