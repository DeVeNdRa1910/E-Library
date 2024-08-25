import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";


export async function createBook(req: Request, res: Response, next: NextFunction){
  try {
    
  } catch (error: any) {
    const errorObj = {
      message: error.message || error,
      error: true,
      success: false,
    };

    return next(createHttpError(500, errorObj));
  }
}