import express from "express"
import { deleteUser, getUser } from "../../../controllers/admin/user/userController.js"
import isAuthenticated from "../../../middleware/isAuthenticated.js"
import restrictTo from "../../../middleware/restrictTo.js"
const router=express.Router()
router.route('/users').get(isAuthenticated,restrictTo("admin"),getUser)
router.route('/users/:id').delete(isAuthenticated,restrictTo("admin"),deleteUser)

export default router