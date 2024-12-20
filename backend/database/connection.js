import mongoose from "mongoose";
import { config } from "dotenv";
config()

const connectDB=async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("mongoDB connected")
  } catch (error) {
    console.log(error)
  }
}

export default connectDB