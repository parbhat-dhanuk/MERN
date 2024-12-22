import express from "express"
import { addProduct, deleteProduct, fetchAllProducts, fetchSingleProduct, updateProduct } from "../../controllers/product/productController.js"
import isAuthenticated from "../../middleware/isAuthenticated.js"
import restrictTo from "../../middleware/restrictTo.js"
const router=express.Router()

router.route('/product').post(isAuthenticated,restrictTo("admin"),addProduct).get(fetchAllProducts)
router.route("/product/:id").get(fetchSingleProduct).patch(isAuthenticated,restrictTo,updateProduct).delete(isAuthenticated,restrictTo,deleteProduct)

export default router