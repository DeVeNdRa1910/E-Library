"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//user
const userSignUpController_1 = require("../controllers/user/userSignUpController");
const userSignInController_1 = require("../controllers/user/userSignInController");
//Books
const multerHandler_1 = __importDefault(require("../middlewares/multerHandler"));
const creatBookController_1 = require("../controllers/book/creatBookController");
const authenticate_1 = require("../middlewares/authenticate");
const updateBookController_1 = require("../controllers/book/updateBookController");
const getAllbooksController_1 = require("../controllers/book/getAllbooksController");
const getBookController_1 = require("../controllers/book/getBookController");
const deleteBookController_1 = require("../controllers/book/deleteBookController");
const router = express_1.default.Router();
//routes
//Users
router.post("/users/register", userSignUpController_1.createUser);
router.post("/users/login", userSignInController_1.loginUser);
//Books
router.post("/books/create", authenticate_1.authenticate, multerHandler_1.default.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "bookFiles", maxCount: 1 },
]), creatBookController_1.createBook);
router.patch("/books/update/:bookId", authenticate_1.authenticate, multerHandler_1.default.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "bookFiles", maxCount: 1 },
]), updateBookController_1.updateBook);
router.get("/books/get-all-books/", getAllbooksController_1.getAllBooks);
router.get("/books/get-book/:bookId", getBookController_1.getBook);
router.delete("/books/delete/:bookId", authenticate_1.authenticate, deleteBookController_1.deleteBook);
exports.default = router;
