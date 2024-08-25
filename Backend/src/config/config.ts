import { config as conf } from "dotenv";

conf()

const config = {
  port: process.env.PORT,
  databaseurl: process.env.MONGODB_URI
};

// now this object is read only in other file
export default Object.freeze(config);