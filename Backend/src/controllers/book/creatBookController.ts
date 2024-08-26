import path from "node:path";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../../config/cloudinary";
import createHttpError from "http-errors";
import bookModel from "../../models/bookModel";

export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction
) {

  // const {} = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log("files: ", files);

  const coverImageMimeType = files.coverImage[0].mimetype.split('/').at(-1);
  const fileName = files.coverImage[0].filename;
  const filePath = path.resolve(__dirname, '../../../public/data/uploads', fileName);

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      timeout: 60000,
      filename_override: fileName,
      folder: 'book-covers',
      format: coverImageMimeType,
    });

    // Upload success
    console.log("Upload Result:", uploadResult);

    


    return res.json({ message: "Upload successful", uploadResult });


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