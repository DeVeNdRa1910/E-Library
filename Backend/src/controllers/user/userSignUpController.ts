import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/config";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      const error = createHttpError(400, "All fields are mendatory");
      return next(error);
    }

    const existingUserByEmail = await userModel.findOne({ email });

    if (existingUserByEmail) {
      const error = createHttpError(400, "User already exist with this email.");
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name: name,
      email: email,
      role: role,
      password: hashedPassword,
    });

    const tokenData = {
      _id: newUser._id,
      email: newUser.email,
    };

    const accessToken = jwt.sign(tokenData, config.jwtSecretKey as string, {
      expiresIn: "2h",
    });

    const userCreatResponse = await newUser.save();

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

    res.status(201).json({
      data: userCreatResponse,
      accessToken: accessToken,
      message: "User created",
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
