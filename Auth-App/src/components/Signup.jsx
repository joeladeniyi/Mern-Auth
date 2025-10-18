import React from 'react'
import '../App.css'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
function Signup  ()  {
    const [username, setUsername]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassord]=useState('')
       const navigate = useNavigate()
    const handlesubmit = (e) =>{
        e.preventDefault()
        axios.post('https://localhost:3000/auth/signup', {
            username,
            email,
            password
        })
        .then(response =>{
            
            if(response.data.status){
                navigate('/login')}})
                
        .catch(error=>console.log(error))
        
    }
  return (
    <div className='sign-up-container'>
        
          <form className='sign-up-form' onSubmit={handlesubmit}>
            <h2>Signup Page </h2>
            <label htmlFor='username'> Username:</label>
            <input type='text' placeholder='username' onChange={(e)=>setUsername(e.target.value)} className=''/>
             <label htmlFor='email'> Email:</label>
            <input type='email' placeholder='enter email' onChange={(e)=>setEmail(e.target.value)} className=''/>
              <label htmlFor='password'> Password:</label>
            <input type='password' placeholder='******' onChange={(e)=>setPassord(e.target.value)} className=''/>
            <button type='submit'>Signup</button>
            <p>Already Have an Account? <Link to='/login'>Login</Link></p> 
          </form>
    </div>
  )
}

export default Signup
