import { Request, Response, NextFunction } from "express";
import bookModel from "../../models/bookModel";
import createHttpError from "http-errors";

export async function getBook(req: Request, res: Response, next: NextFunction){
  

  const bookId = req.params.bookId;

  try {
    
    const book = await bookModel.findOne({_id: bookId}).populate("author","name");

    if(!book) {
      return next(createHttpError(404,"Book not found"));
    }

    res.status(200).json({
      data: book,
      message: "Your book fetched book successfully",
      error: false,
      success: true
    })
  } catch (error) {
    return next(createHttpError(501,"Failed to fetch book"));
  }
}