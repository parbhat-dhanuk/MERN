import User from "../../../models/userModel.js"

//get User
export const getUser=async (req,res)=>{
  try {
    const {id}=req.user
    const users=await User.find({_id:{$ne:id}}).select('-otp -otpVerified -password -createdAt -updatedAt -__v')
    if(users.length===0){
     return res.status(400).json({message:"No user"})
    }
    
    res.status(200).json({message:"users fetched successfully",data:users})
  } catch (error) {
    console.log("error in getuser controller",error.message)
    res.status(500).json({message:"Internal server error"})
  }
}

//delete user

export const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params
        await User.findByIdAndDelete(id)
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        console.log("error in delete controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}