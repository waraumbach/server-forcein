

import {Router} from 'express'
import { registerUser, loginUser, logoutUser, registerAdminUser } from '../controllers/authController.js'

const authRouter = Router()


authRouter.post('/register', registerUser) // Register a new user

authRouter.post('/register/admin', registerAdminUser) // Register a new user

authRouter.post('/login', loginUser)

authRouter.get('/logout/:userId', logoutUser)


export default authRouter