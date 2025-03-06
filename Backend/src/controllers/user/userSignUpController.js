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
exports.createUser = createUser;
const http_errors_1 = __importDefault(require("http-errors"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, role } = req.body;
            if (!name || !email || !password || !role) {
                const error = (0, http_errors_1.default)(400, "All fields are mendatory");
                return next(error);
            }
            const existingUserByEmail = yield userModel_1.default.findOne({ email });
            if (existingUserByEmail) {
                const error = (0, http_errors_1.default)(400, "User already exist with this email.");
                return next(error);
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield userModel_1.default.create({
                name: name,
                email: email,
                role: role,
                password: hashedPassword,
            });
            const tokenData = {
                _id: newUser._id,
                email: newUser.email,
            };
            const accessToken = jsonwebtoken_1.default.sign(tokenData, config_1.default.jwtSecretKey, {
                expiresIn: "2h",
            });
            const userCreatResponse = yield newUser.save();
            //store token in cookie storage on client side
            // Set the cookie with the token (HTTP-only, secure, sameSite)
            res.cookie("token", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                path: '/'
            })
                .status(200)
                .json({
                message: "User Logged in successfully",
                data: accessToken,
                success: true,
                error: false,
            });
            res.status(201).json({
                data: userCreatResponse,
                accessToken: accessToken,
                message: "User created",
                error: false,
                success: true,
            });
        }
        catch (error) {
            const errorObj = {
                message: error.message || error,
                error: true,
                success: false,
            };
            return next((0, http_errors_1.default)(500, errorObj));
        }
    });
}
