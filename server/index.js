import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { UserRouter } from './routes/user'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors(
    {
        origin:["http://localhost:5173"],
        credentials :true
    }
))
app.use(cookieParser())
app.use('/auth', UserRouter)
app.listen(process.env.PORT, () => {
    console.log("server is running")
})