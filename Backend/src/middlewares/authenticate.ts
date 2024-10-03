import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import userModel from "../models/userModel";

export interface AuthRequest extends Request {
  userId: string;
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return next(createHttpError(401, "Authorization token is required."));
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return next(createHttpError(400, "Invalid authorization format."));
    }

    const parsedToken = token.split(" ")[1];

    try {
      const decoded = jwt.verify(parsedToken, config.jwtSecretKey as string) as JwtPayload;
      const user = await userModel.findById(decoded.id)
      if(user && user.role==="user"){
        return res.status(401).json({
          message: "Only ADMIN can create book.",
          error: true,
          success: false,
        });
      }

      console.log("Decoded Token: ", decoded);
      const _req = req as AuthRequest;
      _req.userId = decoded.id as string;
      next();
    } catch (error) {
      return next(createHttpError(401, "Token Expired."));
    }
  } catch (error) {
    res.status(401).json({
      message: "Authorization is failed.",
      error: true,
      success: false,
    });
  }
}
