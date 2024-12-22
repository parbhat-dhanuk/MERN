import bcrypt from "bcryptjs"
import User from "../models/userModel.js"

const adminSeeder=async()=>{
 const adminExist=await User.findOne({email:process.env.ADMIN_EMAIL})
 
 if(!adminExist){
       await User.create({
        email:process.env.ADMIN_EMAIL,
        username:process.env.ADMIN_USERNAME,
        password:bcrypt.hashSync(process.env.ADMIN_PASSWORD,10),
        phonenumber:process.env.ADMIN_PHONENUMBER,
        role:process.env.ADMIN_ROLE
      })
      console.log("Admin credentials seeded successfully")
 }
}

export default adminSeeder