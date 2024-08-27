import express from "express";

//user
import { createUser } from "../controllers/user/userSignUpController";
import { loginUser } from "../controllers/user/userSignInController";
//Books
import upload from "../middlewares/multerHandler";
import { createBook } from "../controllers/book/creatBookController";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

//routes

//Users
router.post("/users/register", createUser);
router.post("/users/login", loginUser);


//Books
router.post("/books/create", authenticate , upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "bookFiles", maxCount: 1 },
]), createBook);

export default router;
