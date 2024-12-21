import express from "express"
import { register } from "../../controllers/auth/authController.js"
const router=express.Router()

router.route('/register').post(register)

export default router