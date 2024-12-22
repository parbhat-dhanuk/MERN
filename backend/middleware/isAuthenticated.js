import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const isAuthenticated=async(req,res,next)=>{

 try {
    const token=req.cookies.token
    if(!token){
      return res.status(401).json({message:"Unauthorized - No Token Provided"})
    }
  
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
  
  if(!decoded){
      return res.status(401).json({message:"Unauthorized - Invalid token"})
  }
  
  const user=await User.findById(decoded.id)
  
  
  if(!user){
      return res.status(401).json({message:"user not found"})
  }
  
  req.user=user
  next()
 } catch (error) {
    console.log("error in isAuthenticated",error.message)
    res.status(500).json({error:"Internal server error"})
 }

}


export default isAuthenticated