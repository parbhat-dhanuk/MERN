import express from "express"

import isAuthenticated from "../../middleware/isAuthenticated.js"
import restrictTo from "../../middleware/restrictTo.js"
import { createReview, deleteReview, getReview } from "../../controllers/customer/review/reviewController.js"

const router=express.Router()

router.route('/review/:id').post(isAuthenticated,restrictTo("customer"),createReview).delete(isAuthenticated,deleteReview)
router.route('/review').get(isAuthenticated,getReview)

export default router