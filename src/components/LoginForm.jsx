import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../services/api'

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetchLogin(username, password);
      localStorage.setItem('token', response.token);
      console.log(response.token);
      navigate('/profile');
    } catch (error) {
      console.log(error);
      setError('Error durante el inicio de sesión');
    }
  }

  return (
    <section className="mx-16 mt-10 p-14 bg-gray-200 shadow-lg rounded-lg">
      <h1 className="text-center text-4xl font-bold leading-7 text-gray-900 m-9 my-12">Ingresar a Stok</h1>
      <form onSubmit={handleSubmit}>
        <div className="sm:col-span-4 my-5">
          <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => {setUsername(e.target.value)}}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-4 my-5">
          <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-900">
            Contraseña
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => {setPassword(e.target.value)}}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        <div className="flex justify-center">
          <button id="loginSubmit" className='bg-sky-400 text-white font-bold mx-6 py-2 px-4 my-1 rounded-full cursor-pointer' type="submit">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </section>
  )
}