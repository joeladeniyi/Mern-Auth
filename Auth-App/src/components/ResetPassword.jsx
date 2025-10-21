import React from 'react'
import '../App.css'
import { useState } from 'react'
import axios, { Axios } from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
const ResetPassword = () => {
     const [password, setPassword]=useState('')
     const {token} = useParams()

       const navigate = useNavigate()
      axios.defaults.withCredentials = true
    const handlesubmit = (e) =>{
        e.preventDefault()
        axios.post('https://localhost:3000/auth/reset-password'+token, {
            
            password,
        
        })
        .then(response =>{
            
            if(response.data.status){
                navigate('/login')}
              console.log(response.data)
              })
                
        .catch(error=>console.log(error))
        
    }
  return (
    <div className='sign-up-container'>
       <form className='sign-up-form' onSubmit={handlesubmit}>
                  <h2>Reset Password </h2>
                  
                   <label htmlFor='email'> Password:</label>
                  <input type='password' placeholder='******' onChange={(e)=>setPassword(e.target.value)} className=''/>
                  
                  
                  <button type='submit'>Submit</button>
                   <p>Don't Have an Account? <Link to='/'>Register</Link></p> 
                </form>
    </div>
  )
}

export default ResetPassword
