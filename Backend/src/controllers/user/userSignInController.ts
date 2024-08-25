import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/config";

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = createHttpError(400, "Both fields are mendatory");
      return next(error);
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return next(createHttpError(404, "User not found..."));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return next(createHttpError(400, "Wrong credentials"));
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const accessToken = jwt.sign(tokenData, config.jwtSecretKey as string, {'expiresIn': '1d'})

    res.status(201).json({
      data: user,
      accessToken: accessToken,
      message: "User logged in successfully",
      error: false,
      success: true,
    });

  } catch (error: any) {
    const errorObj = {
      message: error.message || error,
      error: true,
      success: false,
    };

    return next(createHttpError(500, errorObj));
  }
}
