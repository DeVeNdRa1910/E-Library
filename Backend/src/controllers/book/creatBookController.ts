import path from "node:path";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../../config/cloudinary";
import bookModel from "../../models/bookModel";
import fs from 'node:fs';
import { AuthRequest } from "../../middlewares/authenticate";
import createHttpError from "http-errors";
// import createHttpError from "http-errors";

export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const {title, genre} = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log("files: ", files);

  const coverImageMimeType = files.coverImage[0].mimetype.split('/').at(-1);
  const fileName = files.coverImage[0].filename;
  const filePath = path.resolve(__dirname, '../../../public/data/uploads', fileName);

  try {
    const coverImageUploadResult = await cloudinary.uploader.upload(filePath, {
      timeout: 60000,
      filename_override: fileName,
      folder: 'book-covers',
      format: coverImageMimeType,
    });

    // Upload success
    //console.log("Upload Result:", uploadResult);
    //bookFiles
    
    const bookFileName = files.bookFiles[0].filename;
    const bookFileMimeType = files.bookFiles[0].mimetype.split('/').at(-1);
    const bookFilePath = path.resolve(__dirname, '../../../public/data/uploads', bookFileName);

    //bookFileType generally pdf hi hoga lekin image png, jpg, jpeg.....
    const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath,{
      resource_type: 'raw',
      filename_override: bookFileName,
      folder: 'book-pdfs',
      format: 'pdf'
    })
    
    //console.log(coverImageUploadResult, bookFileUploadResult); 

    const _req = req as AuthRequest;

    const newBook = new bookModel({
      title,
      genre,
      author: _req.userId,
      coverImage: coverImageUploadResult.secure_url,
      file: bookFileUploadResult.secure_url
    })

    const bookUploadResp = await newBook.save();

    //Delete temp files
    try {
      await fs.promises.unlink(filePath);
      await fs.promises.unlink(bookFilePath);
    } catch (error) {
      return next(createHttpError(500, "Failed to delete temporary files"));
    }

    return res.status(201).json({ 
      id: newBook._id,
      message: "Book Upload Successful",
      bookUploadResp
    });

  } catch (error: any) {
    console.error("Upload Error:", error);

    // Return only the message and any other useful info, avoiding circular structure
    return next(error);
  }

}