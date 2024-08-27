import { Request, Response, NextFunction } from "express";
import bookModel from "../../models/bookModel";
import createHttpError from "http-errors";

export async function getAllBooks(req: Request, res: Response, next: NextFunction){
  try {
    const allBooks = await bookModel.find().populate("author", "name");
    res.status(200).json({
      data: allBooks,
      message: "Fetched all books successfully",
      error: false,
      success: true
    })
  } catch (error) {
    return next(createHttpError(501,"Failed to fetch all books"));
  }
}