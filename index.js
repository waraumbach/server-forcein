import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'
export const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI



const corsOptions = {
    exposedHeaders: ['Content-Range'],
  };

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors(corsOptions))


app.get('/', (req, res) => {
    res.send('Welcome to my e-commerce API')
})


mongoose.connect(MONGO_URI)
    .then(() => app.listen(PORT , () => console.log(`Server is running on port ${PORT} 🟢`)))
    .catch(err => console.error(`${err} 🔴`))