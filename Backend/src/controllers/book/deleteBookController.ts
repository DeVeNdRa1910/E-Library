import { Request, Response, NextFunction } from "express";
import bookModel from "../../models/bookModel";
import createHttpError from "http-errors";

export async function deleteBook(req: Request, res: Response, next: NextFunction){
  
  const bookId = req.params.bookId;

  try {
    const deleteBookResp = await bookModel.findByIdAndDelete({_id: bookId});
    res.status(200).json({
      data: deleteBookResp,
      message: "Your book deleted successfully",
      error: false,
      success: true
    })
  } catch (error) {
    return next(createHttpError(501,"Failed to delete book"));
  }
}