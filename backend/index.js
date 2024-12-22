import express from "express"
import { config } from "dotenv"
import connectDB from "./database/connection.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth/authRoute.js"
import adminSeeder from "./seeder/adminSeeder.js"
import productRoute from "./routes/admin/productRoute.js"
config()
const app=express()
const PORT=process.env.PORT

app.use(express.json())  // to parse the json file
app.use(cookieParser())  // to verify the token from cookie


//Routes
app.use("/api",authRouter)
app.use("/api",productRoute)

//cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true                         
  }))

app.listen(PORT,()=>{
    connectDB()
    adminSeeder()
    console.log(`Server is running in port:${PORT}`)
})