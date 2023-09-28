import express, { Router } from 'express'
const router = express(Router)

import { registerUser, loginUser, logoutUser, updateUserProfile, getUserProfile } from '../Controllers/authUsers.js'
import { authentication } from '../middleware/authentication.js'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.route('/profile').get(authentication, getUserProfile).patch(authentication, updateUserProfile)


export default router