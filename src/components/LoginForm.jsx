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
          <div className="mb-8">
            <label htmlFor="email" className="block text-lg text-left text-gray-900 mb-2">
              Email
            </label>
            <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-3 px-6 mb-4 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-lg text-left text-gray-900 mb-2">
              Contraseña
            </label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-6 mb-4 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          {error && (
              <div className="text-red-500 text-center mb-4">
                {error}
              </div>
          )}
          <div className="flex justify-center">
            <button id="loginSubmit" className="continue" type="submit">
              Iniciar Sesión
            </button>
          </div>
          <div className="flex justify-center">
            <button id="loginSubmit" className="continue" onClick={() => navigate('/register') }>
              Register
            </button>
          </div>
        </form>
      </section>
  );
};
