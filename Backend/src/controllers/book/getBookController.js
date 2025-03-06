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
exports.getBook = getBook;
const bookModel_1 = __importDefault(require("../../models/bookModel"));
const http_errors_1 = __importDefault(require("http-errors"));
function getBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = req.params.bookId;
        try {
            const book = yield bookModel_1.default.findOne({ _id: bookId }).populate("author", "name");
            if (!book) {
                return next((0, http_errors_1.default)(404, "Book not found"));
            }
            res.status(200).json({
                data: book,
                message: "Your book fetched book successfully",
                error: false,
                success: true
            });
        }
        catch (error) {
            return next((0, http_errors_1.default)(501, "Failed to fetch book"));
        }
    });
}
