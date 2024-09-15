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

    console.log(email, password);

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

    const accessToken = jwt.sign(tokenData, config.jwtSecretKey as string, {
      expiresIn: "6hr",
    });

    //store token in cookie storage on client side
    // Set the cookie with the token (HTTP-only, secure, sameSite)

    res.cookie("token", accessToken, {
        httpOnly: true,
        secure:  process.env.NODE_ENV === "production",
        sameSite: "none",
        path: '/'
      })
      .status(200)
      .json({
        message: "User Logged in successfully",
        data: accessToken,
        success: true,
        error: false,
      }
    );

  } catch (error: any) {
    const errorObj = {
      message: error.message || error,
      error: true,
      success: false,
    };

    return next(createHttpError(500, errorObj));
  }
}
