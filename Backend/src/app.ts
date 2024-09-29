import express from "express";
import config from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes/index.routes";
import cors from "cors";
import cookieParser from 'cookie-parser';
// extract app from express()
const app = express();


const allowedOrigins = [
  process.env.FRONTEND_URL_ONE,
  process.env.FRONTEND_URL_TWO     // Frontend URL 2
];

app.use(express.json())  // post(or get) all data from DB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: function (origin, callback) {
    // Check if the origin is in the allowedOrigins array or if it's undefined (for non-browser requests)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
})) // allow all browser to use this resource , you have to put frontend URL
//store cooki on client side
app.use(cookieParser());


// increase server timeout time


//Route
app.use('/api', router)

//globle error handler
app.use(globalErrorHandler);


export default app;