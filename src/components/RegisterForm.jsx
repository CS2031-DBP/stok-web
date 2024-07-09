import React from 'react';
import { fetchRegister } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './register.css';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchRegister(firstName, lastName, email, password, isOwner, phoneNumber);
      localStorage.setItem('token', response.token);
      navigate('/login');
      console.log(response.token);
    } catch (error) {
      console.log(error);
      setError('Error durante el registro');
    }
  };

  return (
    <section className="signup-container">
      <h1>Registro</h1>
      <form onSubmit={handleRegister}>
        <div className="sm:col-span-4 my-5">
          <label htmlFor="firstName" className="block text-lg font-medium leading-6 text-gray-900">
            Nombre
          </label>
          <div className="signin-form">
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-4 my-5">
          <label htmlFor="lastName" className="block text-lg font-medium leading-6 text-gray-900">
            Apellido
          </label>
          <div className="signin-form">
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-4 my-5">
          <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="signin-form">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-4 my-5">
          <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-900">
            Contraseña
          </label>
          <div className="signin-form">
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-4 my-5">
          <label className="block text-lg font-medium leading-6 text-gray-900">¿Eres propietario?</label>
          <div className="mt-2 items-center">
            <button
              id="owner"
              className={`mr-5 py-2 px-4 font-medium rounded ${isOwner === true ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
              onClick={() => setIsOwner(true)}
            >
              Sí
            </button>
            <button
              id="employee"
              className={`ml-5 py-2 px-4 font-medium rounded ${isOwner === false ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
              onClick={() => setIsOwner(false)}
            >
              No
            </button>
          </div>
        </div>
        <div className="sm:col-span-4 my-5">
          <label htmlFor="phoneNumber" className="block text-lg font-medium leading-6 text-gray-900">
            Teléfono
          </label>
          <div className="signin-form">
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          <button
            id="registerSubmit"
            className="continue-button-h"
            type="submit"
          >
            Registrar
          </button>
          <button
            className="mt-4 text-blue-500 hover:text-blue-600"
            onClick={() => { navigate('/login') }}
          >
            Already registered? Log in here.
          </button>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;