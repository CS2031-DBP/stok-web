import React from 'react';
import { LoginForm } from '../components/LoginForm';
import '../styles/Login.css';
import image from '../images/bodega-back.jpg';

const Login = () => {
  return (
    <main className='login-container'>
      <div className='login-form'>
        <LoginForm />
      </div>
      <div className='login-side'>
        <img src={image} alt="Side image" className="side-image" />
      </div>
    </main>
  );
};

export default Login;