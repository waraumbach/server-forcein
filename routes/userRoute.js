import {Router} from 'express'
import { getAllUsers, getUserByToken, updateUser, getUserByID, deleteUser } from '../controllers/userController.js'


const userRouter = Router()

userRouter.get('/users', getAllUsers)

userRouter.get('/users/:userId', getUserByID)

userRouter.put('/users/:userId', updateUser)

userRouter.post('/user/token', getUserByToken)

userRouter.delete('/users/:userId', deleteUser)

export default userRouter