import express from 'express'
const router = express.Router()

        /**Import functions from other files */
import {loginUser, registerUser, logoutUser} from '../Controllers/authUser.js'

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/logout', logoutUser)

export default router