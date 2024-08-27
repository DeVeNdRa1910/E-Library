import path from "node:path";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../../config/cloudinary";
import bookModel from "../../models/bookModel";
import fs from "node:fs";
import { AuthRequest } from "../../middlewares/authenticate";
import createHttpError from "http-errors";

export async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, genre } = req.body;
  const bookId = req.params.bookId;

  const book = await bookModel.findOne({ _id: bookId });

  if (!book) {
    return next(createHttpError(404, "Book not Found."));
  }

  //authentication of updater
  const _req = req as AuthRequest;
  if (_req.userId !== book.author.toString()) {
    return next(createHttpError(403, "You can not update others books."));
  }

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  let updatedCoverImage = "";
  if (files.coverImage) {
    //user upload new cover image
    const fileName = files.coverImage[0].filename;
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads/" + fileName
    );

    updatedCoverImage = fileName;

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      timeout: 60000,
      filename_override: fileName,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    updatedCoverImage = uploadResult.secure_url;

    //Delete temp files
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      return next(createHttpError(500, "Failed to delete temporary file"));
    }
  }

  let updatedBookFile = "";
  if (files.bookFiles) {
    const bookFileName = files.bookFiles[0].filename;
    const bookFileMimeType = files.bookFiles[0].mimetype;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads/" + bookFileName
    );

    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      }
    );

    updatedBookFile = bookFileUploadResult.secure_url;

    try {
      await fs.promises.unlink(bookFilePath);
    } catch (error) {
      return next(createHttpError(500, "Failed to delete temporary file"));
    }
  }

  try {
    const bookUpdateResp = await bookModel.findOneAndUpdate(
      {
        _id: bookId,
      },
      {
        title,
        genre,
        coverImage: updatedCoverImage ? updatedCoverImage : book.coverImage,
        file: updatedBookFile ? updatedBookFile : book.file,
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      data: bookUpdateResp,
      message: "Book Updated Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return next(createHttpError(500, "Failed to update the book"));
  }
}
