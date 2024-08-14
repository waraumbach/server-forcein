import {Router} from 'express'
import { getAllUsers, getUserByToken, updateUser, getUserByID, deleteUser, updateUserAddressByToken } from '../controllers/userController.js'


const userRouter = Router()

userRouter.get('/users', getAllUsers)

userRouter.get('/users/:userId', getUserByID)

userRouter.put('/users/:userId', updateUser)

userRouter.put('/users/address/edit', updateUserAddressByToken)

userRouter.post('/user/token', getUserByToken)

userRouter.delete('/users/:userId', deleteUser)

export default userRouter