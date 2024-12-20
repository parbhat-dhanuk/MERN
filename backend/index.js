import express from "express"
import { config } from "dotenv"
import connectDB from "./database/connection.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth/authRoute.js"
config()
const app=express()
const PORT=process.env.PORT

app.use(express.json())  // to parse the json file
app.use(cookieParser())  // to verify the token from cookie


//Routes
app.use("/api/auth",authRouter)

//cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true                         
  }))

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running in port:${PORT}`)
})