import { config as conf } from "dotenv";

conf()

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
export default Object.freeze(config);