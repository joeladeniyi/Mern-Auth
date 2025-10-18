import express  from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'

const router = express.Router()

router.post('/signup', async(req, res)=>{
    const {username, email, password} = req.body
    const user = await User.findOne({email})
    if(user){
        return res.json({message : "user already exist"})
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const newuser = new User({
        username,
        email,
        password : hashedpassword
        
    })
    await newuser.save()
        return res.json({status:true, message : "record registered"})

})

router.post('/login', async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        res.json({message: 'user not registered'})
    }
    const validpassword = await bcrypt.compare(password,user.password)
    if(!validpassword){
        res.json({message: "user not registered"})
    }
    const token = jwt.sign({username:user.username}, process.env.KEY, {expiresIn : '1h'})
    res.cookie("token", token, {httpOnly:true, maxAge:360000})
    return res.json({status:true, message:"login successfully"})
})
router.post('/forgot-password', async(req,res)=>{
    const {email} = req.body
     const user = await User.findOne({email})
     if(!user){
        res.json({message: "user does not exist"})
     }
     try {
        
     } catch (error) {
        
     }
     
})

export {router as UserRouter}