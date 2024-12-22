import express from "express"
import { addProduct } from "../../controllers/product/productController.js"
import isAuthenticated from "../../middleware/isAuthenticated.js"
import restrictTo from "../../middleware/restrictTo.js"
const router=express.Router()

router.route('/product').post(isAuthenticated,restrictTo("admin"),addProduct)

export default router