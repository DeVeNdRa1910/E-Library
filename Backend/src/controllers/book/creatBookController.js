"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = createBook;
const node_path_1 = __importDefault(require("node:path"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const bookModel_1 = __importDefault(require("../../models/bookModel"));
const node_fs_1 = __importDefault(require("node:fs"));
const http_errors_1 = __importDefault(require("http-errors"));
// import createHttpError from "http-errors";
function createBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, genre, description } = req.body;
        const files = req.files;
        if (!files.coverImage || !files.bookFiles) {
            return next((0, http_errors_1.default)(400, "Missing cover image or book file"));
        }
        console.log("files: ", files);
        const coverImageMimeType = files.coverImage[0].mimetype.split('/').at(-1);
        const fileName = files.coverImage[0].filename;
        const filePath = node_path_1.default.resolve(__dirname, '../../../public/data/uploads', fileName);
        try {
            const coverImageUploadResult = yield cloudinary_1.default.uploader.upload(filePath, {
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
            const bookFilePath = node_path_1.default.resolve(__dirname, '../../../public/data/uploads', bookFileName);
            //bookFileType generally pdf hi hoga lekin image png, jpg, jpeg.....
            const bookFileUploadResult = yield cloudinary_1.default.uploader.upload(bookFilePath, {
                resource_type: 'raw',
                filename_override: bookFileName,
                folder: 'book-pdfs',
                format: 'pdf'
            });
            //console.log(coverImageUploadResult, bookFileUploadResult); 
            const _req = req;
            const newBook = new bookModel_1.default({
                title,
                genre,
                description,
                author: _req.userId,
                coverImage: coverImageUploadResult.secure_url,
                file: bookFileUploadResult.secure_url
            });
            const bookUploadResp = yield newBook.save();
            //Delete temp files
            try {
                yield node_fs_1.default.promises.unlink(filePath);
                yield node_fs_1.default.promises.unlink(bookFilePath);
            }
            catch (error) {
                return next((0, http_errors_1.default)(500, "Failed to delete temporary files"));
            }
            return res.status(201).json({
                id: newBook._id,
                message: "Book Uploaded Successfully",
                bookUploadResp
            });
        }
        catch (error) {
            console.error("Upload Error:", error);
            // Return only the message and any other useful info, avoiding circular structure
            return next(error);
        }
    });
}
