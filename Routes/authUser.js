import express from 'express'
const router = express.Router()

        /**Import functions from other files */
import {loginUser, registerUser, logoutUser, socialLogin} from '../Controllers/authUser.js'

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/logout', logoutUser)
router.post('/socialLogin', socialLogin)

export default router