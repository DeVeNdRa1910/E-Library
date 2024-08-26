import express from "express";
import config from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes/index.routes";
import cors from "cors";

const app = express();

app.use(express.json())  // post(or get) all data from DB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: config.frontend,
  credentials: true
})) // allow all browser to use this resource , you have to put frontend URL


// increase server timeout time
app.use((req, res, next) => {
  res.setTimeout(120000, () => { // 120 seconds
    res.status(408).send('Request Timeout');
  });
  next();
});

//Route
app.use('/api', router)

//globle error handler
app.use(globalErrorHandler);


export default app;