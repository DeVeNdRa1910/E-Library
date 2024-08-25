import mongoose from "mongoose";
import config from "./config";

async function connectDB(){
  try {
    
    mongoose.connection.on('connected',()=>{
      console.log("Data Base Connected Successfully"); 
    })
    
    // if some error occure after connection
    mongoose.connection.on('error',(err)=>{
      console.log("Error to Connect Data Base", err); 
    })
    
    await mongoose.connect(config.databaseurl!)
    
  } catch (error) {
    //  This error will occure on first time connection
    console.log("Failed to Connect Data Base", error); 
    process.exit(1)
  }
}

export default connectDB;