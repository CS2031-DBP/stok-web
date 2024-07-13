import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../services/api';
import '../styles/Login.css';
import logo from '../images/stoklogo.png';

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
      <div className="box">
        <h2 className="text-7xl">ST★K</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input
              type="email"
              name="email"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyUp={(e) => e.target.setAttribute('value', e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => e.target.setAttribute('value', e.target.value)}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
            <label>Password</label>
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}
          <input type="submit" name="sign-in" value="Sign In" />
        </form>
        <div className="flex justify-center mt-4">
          <button
            className="text-white"
            onClick={() => { navigate('/register') }}
          >
            Don't have an account? Register
          </button>
        </div>
      </div>
    </section>
  );
};