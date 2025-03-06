"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const config = {
    port: process.env.PORT,
    databaseurl: process.env.MONGODB_URI,
    env: process.env.NODE_ENV,
    frontend_one: process.env.FRONTEND_URL_ONE,
    frontend_two: process.env.FRONTEND_URL_TWO,
    jwtSecretKey: process.env.JWT_SECRET_TOKEN_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudApiKey: process.env.CLOUDINARY_API_KEY,
    cloudApiSecret: process.env.CLOUDINARY_API_SECRET
};
// now this object is read only in other file
exports.default = Object.freeze(config);
