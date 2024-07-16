// Register.js
import React from 'react';
import { RegisterForm } from '../components/RegisterForm';
import '../styles/Login.css'; // Usa el mismo archivo CSS que el de Login
import image from '../images/bodega-back.jpg';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <main className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-grow">
        <div className="w-1/2">
          <img src={image} alt="Side image" className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2 flex items-center justify-center bg-gray-100">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
};

export default Register;