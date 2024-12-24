import express from "express"
import { createReview, deleteReview, getReview } from "../../controllers/user/review/reviewController.js"
import isAuthenticated from "../../middleware/isAuthenticated.js"
import restrictTo from "../../middleware/restrictTo.js"

const router=express.Router()

router.route('/review/:id').post(isAuthenticated,restrictTo("customer"),createReview).delete(isAuthenticated,deleteReview)
router.route('/review').get(isAuthenticated,getReview)

export default router