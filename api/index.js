import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'
import authRouter from './routes/authRoute.js'
import categoryRouter from './routes/categoryRoute.js'
import productRouter from './routes/productRoute.js'
import userRouter from './routes/userRoute.js'
import orderRouter from './routes/orderRoute.js'

export const app = express()


const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI



const corsOptions = {
    exposedHeaders: ['Content-Range'],
  };



app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors(corsOptions))


app.use('/api',authRouter,categoryRouter,productRouter, userRouter, orderRouter)

//shows on localhost
app.get('/',  (req, res) => {
    res.send('Welcome to my e-commerce API')
})


//mongoose connect with MongoDB
mongoose.connect(MONGO_URI)
    .then(() => app.listen(PORT , () => console.log(`Server is running on port ${PORT} 🟢`)))
    .catch(err => console.error(`${err} 🔴`))

module.exports = app;