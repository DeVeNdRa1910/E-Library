import express from "express";

//user
import { createUser } from "../controllers/user/userSignUpController";
import { loginUser } from "../controllers/user/userSignInController";
//Books
import upload from "../middlewares/multerHandler";
import { createBook } from "../controllers/book/creatBookController";
import { authenticate } from "../middlewares/authenticate";
import { updateBook } from "../controllers/book/updateBookController";
import { getAllBooks } from "../controllers/book/getAllbooksController";
import { getBook } from "../controllers/book/getBookController";
import { deleteBook } from "../controllers/book/deleteBookController";

const router = express.Router();

//routes

//Users
router.post("/users/register", createUser);
router.post("/users/login", loginUser);

//Books
router.post(
  "/books/create",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "bookFiles", maxCount: 1 },
  ]),
  createBook
);

router.patch(
  "/books/update/:bookId",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "bookFiles", maxCount: 1 },
  ]),
  updateBook
);

router.get(
  "/books/get-all-books/",
  getAllBooks
)

router.get(
  "/books/get-book/:bookId",
  getBook
)

router.delete(
  "/books/delete/:bookId",
  authenticate,
  deleteBook
)

export default router;
