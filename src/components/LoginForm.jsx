import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../services/api';
import './Login.css';

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
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setError('Error durante el inicio de sesión');
    }
  };

  return (
    <section className="signin-container">
      <h1 className="text-white text-6xl font-bold mb-8">Ingresar</h1>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="block text-lg font-medium leading-6 text-gray-900">
          <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="block text-lg font-medium leading-6 text-gray-900">
          <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-900">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        <div className="flex justify-center mb-4">
          <button id="loginSubmit" className="continue" type="submit">
            Iniciar Sesión
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-3 text-blue-500 hover:text-blue-600"
            onClick={() => { navigate('/register') }}
          >
            Don't have an account? Register
          </button>
        </div>
      </form>
    </section>
  );
};
