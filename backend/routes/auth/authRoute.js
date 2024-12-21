import express from "express"
import { forgotPassword, login, logout, register, resetPassword, verifyOTP } from "../../controllers/auth/authController.js"
const router=express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/forgetPassword').post(forgotPassword)
router.route('/verifyOTP').post(verifyOTP)
router.route('/resetPassword').post(resetPassword)

export default router