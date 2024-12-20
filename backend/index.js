import express from "express"
import { config } from "dotenv"
import connectDB from "./database/connection.js"
config()
const app=express()
const PORT=process.env.PORT


app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running in port:${PORT}`)
})