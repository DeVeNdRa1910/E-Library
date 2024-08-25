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
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
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
      password: hashedPassword,
    });

    const tokenData = {
      _id: newUser._id,
      email: newUser.email,
    };

    const token = jwt.sign(tokenData, config.jwtSecretKey as string, {
      expiresIn: "2h",
    });

    const userCreatResponse = await newUser.save();

    res.status(201).json({
      data: userCreatResponse,
      accessToken: token,
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
