import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../services/api'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetchLogin(email, password);
      localStorage.setItem('token', response.token);
      console.log(response.token);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <h1 className='text-4xl m-4'>Login</h1>

    <form onSubmit={ handleSubmit }>
      <label htmlFor="email">Email</label>
      <input onChange={(e) => {setEmail(e.target.value)}} type="email" id="email" />

      <label htmlFor="password">Password</label>
      <input onChange={(e) => {setPassword(e.target.value)}} type="password" id="password" />

      <button>Submit</button>
    </form>
    </>
  )
}

export default Login