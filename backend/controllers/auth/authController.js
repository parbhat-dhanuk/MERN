import User from '../../models/userModel.js'
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
  try {
    const { email, username, password, phonenumber } = req.body

    if (!email || !username || !password || !phonenumber) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Remove all spaces from userName, email, and password
    const cleanedUserName = username.replace(/\s+/g, '')
    const cleanedEmail = email.replace(/\s+/g, '')
    const cleanedPassword = password.replace(/\s+/g, '')
    const cleanedPhonenumber = phonenumber.replace(/\s+/g, '')

    if (cleanedPhonenumber.length > 10 || cleanedPhonenumber.length < 10) {
      return res.status(400).json({ message: 'phonenumber must me 10 digits' })
    }

    const checkUser = await User.findOne({ email: cleanedEmail })
    if (checkUser) {
      return res.status(400).json({ message: 'email already exist' })
    }

    const hashPassword = await bcrypt.hash(cleanedPassword, 10)
    const newUser = await User.create({
      email: cleanedEmail,
      username: cleanedUserName,
      password: hashPassword,
      phonenumber: cleanedPhonenumber,
    })
    res
      .status(201)
      .json({ message: 'user registered successfully', data: newUser })
  } catch (error) {
    console.log('error in register controller', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
