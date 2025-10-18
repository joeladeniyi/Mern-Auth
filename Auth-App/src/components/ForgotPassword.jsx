import React from 'react'
import '../App.css'
import { useState } from 'react'
import axios, { Axios } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const ForgotPassword = () => {
     const [email, setEmail]=useState('')

       const navigate = useNavigate()
      //  Axios.defaults.withCredentials = true
    const handlesubmit = (e) =>{
        e.preventDefault()
        axios.post('https://localhost:3000/auth/forgot-password', {
            
            email,
        
        })
        .then(response =>{
            
            if(response.data.status){
                navigate('/home')}})
                
        .catch(error=>console.log(error))
        
    }
  return (
    <div className='sign-up-container'>
       <form className='sign-up-form' onSubmit={handlesubmit}>
                  <h2>Forgot Password </h2>
                  
                   <label htmlFor='email'> Email:</label>
                  <input type='email' placeholder='enter email' onChange={(e)=>setEmail(e.target.value)} className=''/>
                  
                  
                  <button type='submit'>Submit</button>
                   <p>Don't Have an Account? <Link to='/'>Register</Link></p> 
                </form>
    </div>
  )
}

export default ForgotPassword
