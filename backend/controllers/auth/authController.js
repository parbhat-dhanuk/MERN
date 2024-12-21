import User from '../../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import sendEmail from '../../utils/email.js'

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



// forgot password
export const forgotPassword = async (req,res)=>{
try {
  const {email} = req.body;
  if(!email){
      return res.status(400).json({message : "Please provide email"})
  }
  const cleanedEmail = email.replace(/\s+/g, '')
  // check if that email is registered or not
  const userExist = await User.findOne({email :cleanedEmail})
  
  if(!userExist){
      return res.status(404).json({ message : "Email is not registered"})
  }

    //  Send OTP to that email
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    userExist.otp=OTP
    await userExist.save()
   sendEmail({
    email:cleanedEmail,
    subject:"password reset",
    message:`OTP code is:${OTP} Don't share to anyone`
   })
   return res.status(200).json({ message:"OTP sent successfully"})
} catch (error) {
  console.log('error in forgetpassword controller', error.message)
    res.status(500).json({ error: 'Internal server error' })
}
}


//Verify OTP

export const verifyOTP= async(req,res)=>{
  try {
    const {email,otp}=req.body
    if(!email||!otp){
        return res.status(401).json({message:"Please provide email or OTP"})
    }

    const cleanedEmail = email.replace(/\s+/g, '')
    const cleanedOTP = otp.replace(/\s+/g, '')
    //Check if that OTP email exist or not
    const userExist=await User.findOne({email:cleanedEmail})
if(!userExist){
    return res.status(401).json({ message:"Email doesn't exist" })
}
if(userExist.otp!==cleanedOTP){
return res.status(401).json({message:"Invalid OTP"})
}
//dispost the OTP so cannot be used next time
userExist.otp=undefined
userExist.otpVerified=true
await userExist.save()
return res.status(200).json({message:"OTP matched"})
  } catch (error) {
    console.log('error in verifyOTP controller', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}


//reset password

export const resetPassword=async(req,res)=>{
  try {
      const {email,newPassword,confirmPassword}=req.body
      if(!email||!newPassword||!confirmPassword){
          return res.status(401).json({message:"please provide email,newPassword,confirmPassword"})
      }
      const cleanedEmail = email.replace(/\s+/g, '')
      const cleanedNewPassword = newPassword.replace(/\s+/g, '')
      const cleanedConfirmPassword = confirmPassword.replace(/\s+/g, '')
      if(cleanedNewPassword!==cleanedConfirmPassword){
          return res.status(401).json({message:"newPassword & confirmPasword doesn't match"})
      }
      const userExist=await User.findOne({email:cleanedEmail})
      if(!userExist){
          return res.status(401).json({
              message:"User Email is not registered"
          })
      }
      if(userExist.otpVerified!==true){
          return res.status(403).json({
              message:"You cannot perform this action"
          })
      }
      userExist.password=await bcrypt.hash(cleanedNewPassword,10)
      userExist.otpVerified=false
      await userExist.save()
      return res.status(200).json({
          message:"Password changed successfully"
      })
  } catch (error) {
    console.log('error in resetpassword controller', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}