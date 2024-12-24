import express from "express"
import { addProduct, deleteProduct, fetchAllProducts, fetchSingleProduct, updateProduct } from "../../../controllers/admin/product/productController.js"
import isAuthenticated from "../../../middleware/isAuthenticated.js"
import restrictTo from "../../../middleware/restrictTo.js"
import { upload } from "../../../utils/cloudinary.js"
const router=express.Router()

router.route('/product').post(isAuthenticated,restrictTo("admin"),upload,addProduct).get(fetchAllProducts)
router.route("/product/:id").get(fetchSingleProduct).patch(isAuthenticated,restrictTo("admin"),upload,updateProduct).delete(isAuthenticated,restrictTo("admin"),deleteProduct)

export default router