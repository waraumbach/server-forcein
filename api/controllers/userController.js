import User from "../models/userModel.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        const usersCount = await User.countDocuments()
        res.set('Content-Range', `users 0-${users.length}/${usersCount}`)
        return res.status(200).json(users)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const getUserByID = async (req, res) => {
    const { userId } = req.params
    try {
        const userById = await User.findById(userId).select('-password -isAdmin')
        if (!userById) {
            return res.status(400).json({ error: 'No user found' })
        }
        return res.status(200).json(userById)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const getUserByToken = async (req, res) => {
    const { token } = req.body
    try {
        const userByToken = await User.findOne({ token }).select('-password -isAdmin')
        if (!userByToken) {
            return res.status(400).json({ error: 'No user found' })
        }
        return res.status(200).json(userByToken)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const updateUser = async (req, res) => {
    const { userId } = req.params
    const { address } = req.body
    const { email } = req.body
    
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { email, address }, { new: true })
        if (!updatedUser) {
            return res.status(400).json({ error: 'Please update' })
        }
        return res.status(200).json(updatedUser)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const updateUserAddressByToken = async (req, res) => {
    const { token, address } = req.body
    
    try {
        const updatedUser = await User.findOneAndUpdate({ token }, { address }, { new: true })
        if (!updatedUser) {
            return res.status(400).json({ error: 'Please update' })
        }
        return res.status(200).json(updatedUser)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const deleteUser = async (req, res) => {
    const {userId} = req.params
    try{
        const deletedUser = await User.findByIdAndDelete(userId)
        if(deletedUser){
            return res.status(203).json({message : 'User has been deleted'})
        }

    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

export { getAllUsers, getUserByToken, updateUser, getUserByID, deleteUser, updateUserAddressByToken } 