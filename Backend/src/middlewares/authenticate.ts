import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import config from "../config/config";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return next(createHttpError(401, "Authorization token is required."));
    }

    const parsedToken = token.split(" ")[1];

    try {
      const decoded = jwt.verify(
        parsedToken,
        config.jwtSecretKey as string
      );

      console.log("Decoded Token: ", decoded); 
    
    } catch (error) {
      return next(createHttpError(401, "Token Expired."))  
    }

    next()

  } catch (error) {
    res.status(401).json({
      message: "Authorization is failed.",
      error: true,
      success: false
    })
  }
}
