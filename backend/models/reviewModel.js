import mongoose, { Schema } from "mongoose"
const reviewSchema=new mongoose.Schema({
   
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
     },
     productId : {
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : true
     },
     rating : {
        type : Number,
        default : 3
     },
     message : {
        type : String,
     }
})

const Review=mongoose.model("Review",reviewSchema)
export default Review