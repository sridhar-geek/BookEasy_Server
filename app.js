import express from 'express'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const app = express();

    /**Imports from another files */
import { connectToDB } from './Connection/db.js';
import userRoutes from './Routes/authUser.js'
import notFound from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'
    /**used to access data from req.body */
app.use(express.json())
app.use(express.urlencoded( {extended: true} ))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
        /**Middleware */
app.use('/api/user', userRoutes)
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 4000; 

    /* starter function to start the server only when mongodb connected */
const start =async() => {
    try {
        await connectToDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> console.log(`Server is lisening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()