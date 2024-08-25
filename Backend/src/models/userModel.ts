import mongoose from 'mongoose'
import { User as UserTypes } from '../helper/types';


const userSchema = new mongoose.Schema<UserTypes>({
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  }
},{timestamps: true})

export default mongoose.model<UserTypes>("User", userSchema);