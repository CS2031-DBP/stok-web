import React from 'react';
import { LoginForm } from '../components/LoginForm';
import '../styles/Login.css';
import image from '../images/bodega-back.jpg';
import NavBar from '../components/NavBar';

const Login = () => {
  return (
    <main className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-grow">
        <div className="w-1/2 flex items-center justify-center bg-gray-100">
          <LoginForm />
        </div>
        <div className="w-1/2">
          <img src={image} alt="Side image" className="w-full h-full object-cover" />
        </div>
      </div>
    </main>
  );
};

export default Login;