import { Request, Response, NextFunction } from "express";
import bookModel from "../../models/bookModel";
import createHttpError from "http-errors";
import { AuthRequest } from "../../middlewares/authenticate";
import cloudinary from "../../config/cloudinary";

export async function deleteBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bookId = req.params.bookId;

  const book = await bookModel.findOne({ _id: bookId });

  if (!book) {
    return next(createHttpError(404, "Book not found"));
  }

  //authentication of updater
  const _req = req as AuthRequest;
  if (_req.userId !== book?.author.toString()) {
    return next(createHttpError(403, "You can not DELETE this books."));
  }

  // delete from cloudinary
  // public Id of coverImage on cloudinary -> book-covers/fov5qjtnrxv8bz5kgw4g
  // coverImage url from book.url ->
  //https://res.cloudinary.com/df5udpm1p/image/upload/v1724767529/book-covers/fov5qjtnrxv8bz5kgw4g.jpg

  const coverImageFileSplit = book.coverImage.split("/");
  // now we have array of string of coverImage url saprated by '/' so we need last two element of that array
  //cloudinary main respective folder me jakar dekho publicId me kya-kya hai
  const publicIdOfCoverIMage =
    coverImageFileSplit.at(-2) +
    "/" +
    coverImageFileSplit.at(-1)?.split(".").at(-2);

  //similarly foe bookpdf
  //https://res.cloudinary.com/df5udpm1p/raw/upload/v1724767532/book-pdfs/lxubysi79txgbmsxz7v5.pdf
  const bookPdfsFileSplit = book.file.split("/");
  const publicIdOfBookPdf =
    bookPdfsFileSplit.at(-2) + "/" + bookPdfsFileSplit.at(-1);

  try {
    //deleting cover Image
    await cloudinary.uploader.destroy(publicIdOfCoverIMage);

    //deleting book-pdf
    await cloudinary.uploader.destroy(publicIdOfBookPdf, {
      resource_type: "raw",
    });
  } catch (error) {
    return next(
      createHttpError(
        502,
        "Error while deleting cover Image or book PDF from cloudinary"
      )
    );
  }

  try {
    const deleteBookResp = await bookModel.findByIdAndDelete({ _id: bookId });
    res.status(204).json({
      data: deleteBookResp,
      message: "Your book deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return next(createHttpError(501, "Failed to delete book"));
  }
}
