import React from 'react'
import './Home.css';

const Login = () => {
  return (
      <div className="container">
        <div className="card">
          <h1>Sign In</h1>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username"/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"/>
          </div>
          <button>Continue</button>
        </div>
      </div>
  );
};

export default Login;
