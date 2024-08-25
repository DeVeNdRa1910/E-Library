import express from "express";

//user
import { createUser } from "../controllers/user/userSignUpController";
import { loginUser } from "../controllers/user/userSignInController";

const router = express.Router();

//routes

//users
router.post("/users/register", createUser);
router.post("/users/login", loginUser);

export default router;
