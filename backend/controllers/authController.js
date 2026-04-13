import cloudinary from "../lib/cloudinary.js";
import { errorHandler } from "../lib/error.js";
import { generateToken } from "../lib/token.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  try {
    if (
      !fullName ||
      !email ||
      !password ||
      fullName === "" ||
      email === "" ||
      password === ""
    ) {
      return next(errorHandler(400, "All fields are required"));
    }

    if (password.length < 6) {
      return next(errorHandler(400, "Password must be 6 characters"));
    }

    // check if email is valid regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(errorHandler(400, "Invalid email format"));
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return next(errorHandler(400, "Email already exists"));
    }

    //salt and hash password
    const salt = await bcrypt.genSalt(10);
    const haspassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      fullName,
      email,
      password: haspassword,
    });

    if (newUser) {
      const saveUser = await newUser.save();
      generateToken(saveUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        password: newUser.password,
        profilePic: newUser.profilePic,
      });
    } else {
      next(errorHandler(400, "Invalid user data"));
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fields are required"));
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const passwordCurrect = await bcrypt.compare(password, user.password);

    if (!passwordCurrect) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfile = async (req, res, next) => {
  try {
    const { profilePic } = req.body;

    if (!profilePic) {
      return next(errorHandler(400, "Profile pic is required"));
    }

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const uploadUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(uploadUser);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
