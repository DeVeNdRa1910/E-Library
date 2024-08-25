import express from "express";


const app = express();

//Route
app.get('/',(req, res, next)=>{
  res.json({message: "Hello Jannhvi Panday"})
})

export default app