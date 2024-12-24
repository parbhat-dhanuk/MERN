import Product from "../../../models/productModel.js"
import Review from "../../../models/reviewModel.js"


//create Review
export const createReview = async(req,res)=>{
 try {
    const userId=req.user.id
    const productId=req.params.id
    const{message,rating}=req.body
    if(!message||!rating){
      return res.status(400).json({message:"required message and review"})
    }
  
    const productExist=await Product.findById(productId)
    if(!productExist){
      return res.status(400).json({message:"product doesn't exist"})
    }

    const cleanedmessage = message.replace(/\s+/g, '')
  
    await Review.create({
      userId,
      productId,
      message:cleanedmessage,
      rating
    })
    res.status(201).json({message:"Review added successfully"})
 } catch (error) {
    console.log("error in review controller",error.message)
    res.status(500).json({message:"Interna server error"})
 }
}





//getReview

export const getReview=async(req,res)=>{
    try {
        const reviews=await Review.find()
        if(reviews.length===0){
            return res.status(404).json({message:"No review "})
        }
        res.status(200).json({message:"review fetched successfully",data:reviews})
    } catch (error) {
        console.log("error in review controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

//delete Reviews

export const deleteReview=async(req,res)=>{
    try {
        const userId=req.user.id
        
        const reviewId=req.params.id
        const review=await Review.findById(reviewId)
        if(!review){
            return res.status(404).json({message:"review not found"})
        }
        const ownerOfReview=review.userId
         
        if(ownerOfReview.toString() !== userId.toString()){
            
            // console.log(typeof(ownerOfReview))
            return res.status(400).json({message:"you are not author of review"})
        }
      
         await Review.findByIdAndDelete(reviewId)
       
        res.status(200).json({message:"review deleted successfully"})

    

    } catch (error) {
        console.log("error in deleteReview controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}