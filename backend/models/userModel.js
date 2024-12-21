import mongoose from "mongoose"
const userSchema  =  new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    phonenumber : {
        type : String,
        required : true,
        minlength:10, 
    },
    username : {
        type : String,
        required  : true
    },
    password : {
        type : String,
        required :true,
        minlength : 4,
        // select : false
    },
    role : {
        type : String,
        enum : ["customer","admin"],
        default : "customer",
    }
},{timestamps : true})

const User = mongoose.model("User",userSchema)
export default User