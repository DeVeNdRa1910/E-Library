import path from "node:path";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../../config/cloudinary";
import bookModel from "../../models/bookModel";
import fs from 'node:fs';
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
    
    console.log(coverImageUploadResult, bookFileUploadResult); 

    const newBook = new bookModel({
      title,
      genre,
      author: "66cb4af5aa20554134e34adc",
      coverImage: coverImageUploadResult.secure_url,
      file: bookFileUploadResult.secure_url
    })

    const bookUploadResp = await newBook.save();

    //Delete temp files
    try {
      await fs.promises.unlink(filePath)
      await fs.promises.unlink(bookFilePath)
    } catch (error) {
      res.status(401).json({
        message: "Not able to delete temprory file"
      })
    }

    return res.status(201).json({ 
      id: newBook._id,
      message: "Book Upload Successful",
      bookUploadResp
    });

  } catch (error: any) {
    console.error("Upload Error:", error);

    // Return only the message and any other useful info, avoiding circular structure
    return res.status(502).json({
      message: error.error.message || "Unknown error occurred while uploading",
      success: false,
    });
  }

  res.json({message: "Sorry cant do anything"})
}