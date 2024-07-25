import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    // We are destructuring the email and the password from the req.body
    const { email, password } = req.body
    try {
        // We check in our database if we have an email that match the req.body.email, the one provided by the user
        const emailVerification = await User.findOne({ email })
        if (emailVerification) {
            return res.status(404).json({ error: 'Email already taken' })
        }

        // Series of characters, made to add complexity to the password
        const salt = await bcrypt.genSaltSync(10)
        // We hash the password provided by the user and we add to that the salt
        const hashedPassword = await bcrypt.hashSync(password, salt)

        // We create our user, with the email and the password that has been hashed
        const user = await new User({
            email,
            password: hashedPassword,
           
        })
        await user.save()
        return res.status(201).json({ message: 'User registred successfully' })
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' })
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' })
        }
        
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
        await User.findByIdAndUpdate(user._id, {token})
        res.json({ token : token, message : `Welcome ${user.email}` })
    }

    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const logoutUser = async (req, res) => {
    const {userId} = req.params
    try{
        const loggedOutUser = await User.findByIdAndUpdate(userId, {token : null}, {new : true})
        if(!loggedOutUser){
            return res.status(404).json({error : 'User not found'})
        }
        return res.status(203).json(`User has been logged out`)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}


export { registerUser, loginUser, logoutUser }