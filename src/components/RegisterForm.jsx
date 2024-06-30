import React from 'react';
import { fetchRegister } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
    <section className="mx-16 mt-10 p-14 bg-gray-200 shadow-lg rounded-lg">
      <h1 className="text-center text-4xl font-bold leading-7 text-gray-900 m-9 my-12">Registro en Stok</h1>
      <form onSubmit={handleRegister}>
        <div className="sm:col-span-4 my-5">
          <label htmlFor="firstName" className="block text-lg font-medium leading-6 text-gray-900">
            Nombre
          </label>
          <div className="mt-2">
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
          <div className="mt-2">
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
          <div className="mt-2">
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
          <div className="mt-2">
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
          <div className="mt-2 flex items-center">
            <input
              id="owner"
              name="isOwner"
              type="radio"
              value="owner"
              checked={isOwner === true}
              onChange={() => setIsOwner(true)}
              className="mr-2"
            />
            <label htmlFor="owner" className="text-gray-900">
              Sí
            </label>
          </div>
          <div className="mt-2 flex items-center">
            <input
              id="employee"
              name="isOwner"
              type="radio"
              value="employee"
              checked={isOwner === false}
              onChange={() => setIsOwner(false)}
              className="mr-2"
            />
            <label htmlFor="employee" className="text-gray-900">
              No
            </label>
          </div>
        </div>
        <div className="sm:col-span-4 my-5">
          <label htmlFor="phoneNumber" className="block text-lg font-medium leading-6 text-gray-900">
            Teléfono
          </label>
          <div className="mt-2">
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
        <div className="flex justify-center">
          <button
            id="registerSubmit"
            className="bg-sky-400 text-white font-bold mx-6 py-2 px-4 my-1 rounded-full cursor-pointer"
            type="submit"
          >
            Registrar
          </button>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;