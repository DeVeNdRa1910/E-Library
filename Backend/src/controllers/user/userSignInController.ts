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

    const user = await userModel.findOne({ email });

    if (!user) {
      return next(createHttpError(401, "Email does not exist"));
    }

    const isPasswordSame = await bcrypt.compare(password, user.password);

    if (!isPasswordSame) {
      return next(createHttpError(401, "Wrong credentials"));
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };
  } catch (error: any) {
    const errorObj = {
      message: error.message || error,
      error: true,
      success: false,
    };

    return next(createHttpError(500, errorObj));
  }
}
