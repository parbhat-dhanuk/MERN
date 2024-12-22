import Product from "../../models/productModel.js"

export const addProduct=async(req,res)=>{
    try {
        const {productName,productDescription,productPrice,productStatus,productStockQty} = req.body
        if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty){
            return res.status(400).json({message : "Please provide all fields"})
        }
        const cleanedProductName = productName.replace(/\s+/g, '')
        const cleanedProductDescription=productDescription.replace(/\s+/g, '')
        const cleanedProductStatus=productStatus.replace(/\s+/g, '')
        

        const newProduct =  await Product.create({
            productName:cleanedProductName ,
            productDescription:cleanedProductDescription ,
            productPrice,
            productStatus:cleanedProductStatus,
            productStockQty,
        })
        res.status(201).json({ message : "Product Created Successfully", data : newProduct })
    } catch (error) {
        console.log("error in addProduct controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}