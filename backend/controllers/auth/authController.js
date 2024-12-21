import User from '../../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const { email, username, password, phonenumber } = req.body

    if (!email || !username || !password || !phonenumber) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Remove all spaces from userName, email, and password
    const cleanedUserName = username.replace(/\s+/g, '')
    const cleanedEmail = email.replace(/\s+/g, '')
    const cleanedPassword = password.replace(/\s+/g, '')
    const cleanedPhonenumber = phonenumber.replace(/\s+/g, '')

    if (cleanedPhonenumber.length > 10 || cleanedPhonenumber.length < 10) {
      return res.status(400).json({ message: 'phonenumber must me 10 digits' })
    }

    const checkUser = await User.findOne({ email: cleanedEmail })
    if (checkUser) {
      return res.status(400).json({ message: 'email already exist' })
    }

    const hashPassword = await bcrypt.hash(cleanedPassword, 10)
    const newUser = await User.create({
      email: cleanedEmail,
      username: cleanedUserName,
      password: hashPassword,
      phonenumber: cleanedPhonenumber,
    })
    res
      .status(201)
      .json({ message: 'user registered successfully', data: newUser })
  } catch (error) {
    console.log('error in register controller', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}


export const login =async(req,res)=>{
  try {
    const {email,password}=req.body
    if(!email||!password){
      return res.status(400).json({message:"Please provide email and password"})
    }
    const cleanedEmail = email.replace(/\s+/g, '')
    const cleanedPassword = password.replace(/\s+/g, '')

   const checkUser=await User.findOne({email:cleanedEmail})
   if(!checkUser){
    return res.status(400).json({message:"Invalid email"})
   }

   const checkPassword=await bcrypt.compare(cleanedPassword,checkUser.password)
   if(!checkPassword){
    return res.status(400).json({message:"Invalid password"})
   }

   const token=jwt.sign({id:checkUser._id},process.env.JWT_SECRET,{expiresIn:"1d"})

   return res.status(200).cookie('token',token,{httpOnly:true,sameSite:"strict",maxAge:1 * 24 * 60 * 60 * 1000}).json({
    message:"Loggedin successfully",
    token:token
})
    
  } catch (error) {
    console.log('error in login controller', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}


export const logout=async(_,res)=>{
  try {
    return res.cookie('token','',{maxAge:0}).status(200).json({
      message:"Logged out successfully"
  })
  } catch (error) {
    console.log('error in logout controller', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}