import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    productDescription : {
        type : String,
        required : true
    },
    productStockQty : {
        type : Number,
        required : true
    },
    productPrice : {
        type : Number,
        required : true
    },
    productStatus : {
        type : String,
        enum : ["available","unavailable"]
    }
},{
    timestamps : true
})

const Product = mongoose.model("Product",productSchema)

export default Product