import Product from '../../../models/productModel.js'
import { cloudinary } from '../../../utils/cloudinary.js'


//add a new product
export const addProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productStatus,
      productStockQty,
    } = req.body
    
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productStatus ||
      !productStockQty
    ) {
      return res.status(400).json({ message: 'Please provide all fields' })
    }

    const file = req.file
    if (!file) {
      return res.status(400).json({ message: 'please provide image' })
    }
    const cleanedProductName = productName.replace(/\s+/g, '')
    const cleanedProductDescription = productDescription.replace(/\s+/g, '')
    const cleanedProductStatus = productStatus.replace(/\s+/g, '')

    let imageUrl
    let imagePublicId
    if (file) {
      // Upload image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: 'Digital-momo',
        transformation: [
          { width: 300, height: 300, crop: 'fill' }, // Example crop
        ],
      })
      imageUrl = uploadResult.secure_url
      imagePublicId = uploadResult.public_id
    }

    const newProduct = await Product.create({
      productName: cleanedProductName,
      productDescription: cleanedProductDescription,
      productPrice,
      productStatus: cleanedProductStatus,
      productStockQty,
      imageUrl,
      imagePublicId
    })
    res
      .status(201)
      .json({ message: 'Product Created Successfully', data: newProduct })
  } catch (error) {
    console.log('error in addProduct controller', error.message)
    res.status(500).json({ message: 'Internal server error' })
  }
}


  //fetch all products

  export const fetchAllProducts = async (req, res) => {
    try {
      const products = await Product.find()
      if(products.length===0){
        return res.status(400).json({message:"No products are available"})
      }
      res.status(200).json({data:products})
    } catch (error) {
      console.log("error in fetchAllProduct controller",error.message);
      res.status(500).json({message: "Internal server error"})
    }
  }



  //fetch single product

  export const fetchSingleProduct = async (req, res) => {
    try {
        const {id}=req.params
      const products = await Product.findById(id)
      res.status(200).json({data:products})
    } catch (error) {
      console.log("error in fetchSingleProduct controller",error.message);
      res.status(500).json({message: "Internal server error"})
    }
  }
  
//update a product
export const updateProduct = async (req, res) => {
    try {
      const { id } = req.params
     
      const {
        productName,
        productDescription,
        productPrice,
        productStatus,
        productStockQty,
      } = req.body

      if (
        !productName ||
        !productDescription ||
        !productPrice ||
        !productStatus ||
        !productStockQty
      ) {
        return res.status(400).json({ message: 'Please provide all fields' })
      }
  
     
      let product = await Product.findById(id);
      if (!product){
        return res.status(404).json({message:"Product not found"})
      }
    
      const cleanedProductName = productName.replace(/\s+/g, '')
      const cleanedProductDescription = productDescription.replace(/\s+/g, '')
      const cleanedProductStatus = productStatus.replace(/\s+/g, '')

      
      let imageUrl = product.imageUrl
      let imagePublicId = product.imagePublicId
      const file=req.file
      if (file) {
        // Delete old image from Cloudinary if it exists
        if (product.imagePublicId) {
          await cloudinary.uploader.destroy(product.imagePublicId);
        }
  
        // Upload new image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: 'Digital-momo',
          transformation: [
            { width: 300, height: 300, crop: "fill"}, // Example crop
          ]
        })
  
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      }
     
      const updatedProduct=await Product.findByIdAndUpdate(id,{
        productName: cleanedProductName,
        productDescription: cleanedProductDescription,
        productPrice,
        productStatus: cleanedProductStatus,
        productStockQty,
        imageUrl,
        imagePublicId
      },{new:true})
  
      res.status(200).json({
        message:"product updated successfully",
        data:updatedProduct
      })
      
    } catch (error) {
      console.log("error in updateProduct controller",error.message);
      res.status(500).json({message: "Internal server error"})
    }
  }



  //deleteProduct
export const deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const product = await Product.findById(id);
        if(!product){
            return res.status(400).json({message:"product not available"})
        }
  
        // Delete image from Cloudinary
      const publicId = product.imagePublicId; // Assuming your product model has `imagePublicId`
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
        // Delete product from database
        await Product.findByIdAndDelete(id)
        res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        console.log("Error in deleteBlog controller",error.message)
        res.status(500).json({error:`Internal server error`})
    }
  }