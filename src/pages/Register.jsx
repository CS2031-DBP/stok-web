import React from 'react';
import './Home.css';

const Register = () => {
  return (
      <div className="container">
        <div className="card">
          <h1>Sign Up</h1>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" name="phone"/>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email"/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"/>
          </div>
          <button>Send Code</button>
          <div className="role-buttons">
            <button>Owner</button>
            <button>Employee</button>
          </div>
        </div>
      </div>
  );
};

export default Register;
