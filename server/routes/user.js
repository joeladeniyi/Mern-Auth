import express  from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { User } from '../models/User.js'

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
     
     try {
        const user = await User.findOne({email})
         if(!user){
        res.json({message: "user does not exist"})
                   }
         var transporter = nodemailer.createTransport({
            service : 'gmail',
            auth: {
                user : 'joeladeniyi40@gmail.com',
                pass : ''
            }
         })
         var mailOptions = {
            from : 'joeladeniyi40@gmail.com',
            to : email,
            subject : 'Reset Password',
            text : `${process.env.ORIGIN}/resetpassword/${token}`
         }
         transporter.sendMail(mailOptions, (error,info)=>{
            if(error){
            return res.json({message : 'error sending email'})
            }else{
                console.log("Email Sent," + info.response)
            }
         })
     } catch (error) {
        console.log(error)
     }
     
})

router.post('/reset-password/:token',async (req,res) => {
    const {token} = req.params
    const {password} = req.body

    try {
        const decoded =  await jwt.verify(token, process.env.KEY)
        const id = decoded.id
        const hashpassword = await bcrypt.hash(password,10)
        await User.findByIdAndUpdate({_id :id},{password:hashpassword})
        return res.json({status : true}, {message:'updated password'})
    } catch (error) {
        console.log(error)
    }
})

export default router 