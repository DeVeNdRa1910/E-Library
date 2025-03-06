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
exports.deleteBook = deleteBook;
const bookModel_1 = __importDefault(require("../../models/bookModel"));
const http_errors_1 = __importDefault(require("http-errors"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
function deleteBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const bookId = req.params.bookId;
        const book = yield bookModel_1.default.findOne({ _id: bookId });
        if (!book) {
            return next((0, http_errors_1.default)(404, "Book not found"));
        }
        //authentication of updater
        const _req = req;
        if (_req.userId !== (book === null || book === void 0 ? void 0 : book.author.toString())) {
            return next((0, http_errors_1.default)(403, "You can not DELETE this books."));
        }
        // delete from cloudinary
        // public Id of coverImage on cloudinary -> book-covers/fov5qjtnrxv8bz5kgw4g
        // coverImage url from book.url ->
        //https://res.cloudinary.com/df5udpm1p/image/upload/v1724767529/book-covers/fov5qjtnrxv8bz5kgw4g.jpg
        const coverImageFileSplit = book.coverImage.split("/");
        // now we have array of string of coverImage url saprated by '/' so we need last two element of that array
        //cloudinary main respective folder me jakar dekho publicId me kya-kya hai
        const publicIdOfCoverIMage = coverImageFileSplit.at(-2) +
            "/" +
            ((_a = coverImageFileSplit.at(-1)) === null || _a === void 0 ? void 0 : _a.split(".").at(-2));
        //similarly foe bookpdf
        //https://res.cloudinary.com/df5udpm1p/raw/upload/v1724767532/book-pdfs/lxubysi79txgbmsxz7v5.pdf
        const bookPdfsFileSplit = book.file.split("/");
        const publicIdOfBookPdf = bookPdfsFileSplit.at(-2) + "/" + bookPdfsFileSplit.at(-1);
        try {
            //deleting cover Image
            yield cloudinary_1.default.uploader.destroy(publicIdOfCoverIMage);
            //deleting book-pdf
            yield cloudinary_1.default.uploader.destroy(publicIdOfBookPdf, {
                resource_type: "raw",
            });
        }
        catch (error) {
            return next((0, http_errors_1.default)(502, "Error while deleting cover Image or book PDF from cloudinary"));
        }
        try {
            const deleteBookResp = yield bookModel_1.default.findByIdAndDelete({ _id: bookId });
            res.status(204).json({
                data: deleteBookResp,
                message: "Your book deleted successfully",
                error: false,
                success: true,
            });
        }
        catch (error) {
            return next((0, http_errors_1.default)(501, "Failed to delete book"));
        }
    });
}
