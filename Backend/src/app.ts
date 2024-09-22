import express from "express";
import config from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes/index.routes";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json())  // post(or get) all data from DB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
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