import jwt from "jsonwebtoken";
import { errorHandler } from "../lib/error.js";
import userModel from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      next(errorHandler(400, "Unauthorized - No token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(errorHandler(401, "Unauthorized - Invalid token"));
    }

    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return next(errorHandler(400, "User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
